import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";


const localizer = momentLocalizer(moment);

const AttendenceCalendar = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); // State for selected employee ID
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null); // State for selected employee data

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get("api/employees/all");
        if (response.status !== 200) {
          throw new Error("Failed to fetch employee attendance data");
        }
        setEmployees(response.data);
        calculateStatistics(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  const calculateStatistics = (employees) => {
    let maxPresentCount = -1;
    let maxAbsentCount = -1;
    let mostPresentEmp = null;
    let mostAbsentEmp = null;

    employees.forEach((employee) => {
      let presentCount = 0;
      let absentCount = 0;

      employee.calendarEvents.forEach((event) => {
        if (event.title.includes("Morning Shift") || event.title.includes("Afternoon Shift")) {
          presentCount++;
        } else if (event.title.includes("Leave")) {
          absentCount++;
        }
      });

      if (presentCount > maxPresentCount) {
        maxPresentCount = presentCount;
        mostPresentEmp = employee.name;
      }

      if (absentCount > maxAbsentCount) {
        maxAbsentCount = absentCount;
        mostAbsentEmp = employee.name;
      }
    });

    // Set most present and most absent employees
    setSelectedEmployeeData({
      mostPresentEmployee: mostPresentEmp,
      mostAbsentEmployee: mostAbsentEmp,
    });
  };

  const eventStyleGetter = (event) => {
    let style = {
      backgroundColor: event.type.includes("Leave") ? "tomato" : "yellowgreen",
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };

    if (event.title.startsWith(selectedEmployeeData?.mostPresentEmployee)) {
      style.border = "3px solid green";
    } else if (
      event.title.startsWith(selectedEmployeeData?.mostAbsentEmployee)
    ) {
      style.border = "3px solid darkred";
    } else {
      style.border = "none";
    }

    return {
      style: style,
    };
  };

  const handleEmployeeChange = (e) => {
    const selectedEmpId = e.target.value;
    setSelectedEmployeeId(selectedEmpId);
    const selectedEmp = employees.find((emp) => emp.id === parseInt(selectedEmpId));
    setSelectedEmployeeData({
      mostPresentEmployee: selectedEmp?.name,
      mostAbsentEmployee: selectedEmp?.name,
    });
  };

  const events = selectedEmployeeId
    ? employees
        .filter((employee) => employee.id === parseInt(selectedEmployeeId))
        .flatMap((employee) =>
          employee?.calendarEvents?.map((event) => ({
            ...event,
            title: `${employee.name}: ${event.title}`,
            start: new Date(event.start),
            end: new Date(event.end),
          }))
        )
    : employees.flatMap((employee) =>
        employee?.calendarEvents?.map((event) => ({
          ...event,
          title: `${employee.name}: ${event.title}`,
          start: new Date(event.start),
          end: new Date(event.end),
        }))
      );

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ margin: "20px" }}>
      <label htmlFor="employees">Select Employee: </label>
      <select id="employees" onChange={handleEmployeeChange} value={selectedEmployeeId || ""}>
        <option value="">-- All Employees --</option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.name}
          </option>
        ))}
      </select>

      <div style={{ height: 800, marginTop: "20px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          eventPropGetter={eventStyleGetter}
          style={{ margin: "50px" }}
        />
      </div>
    </div>
  );
};

export default AttendenceCalendar;
