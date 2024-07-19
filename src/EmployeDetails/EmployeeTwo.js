import React, { useEffect, useRef, useState } from "react";
import axios from "axios";



 
export function EmployeeTwo() {

  const [employee, setEmployee] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
 
  useEffect(() => {
    const loadEmployeeData = async () => {
      try {
        // Fetch employee details along with calendar events
        const response = await axios.get(
          "http://localhost:8080/api/employees/2"
        );
        const data = response.data;
 
        // Set employee and calendar events data
        setEmployee(data);
        setCalendarEvents(data.calendarEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors as needed
      }
    };
 
    loadEmployeeData();
  }, []);
  
  if (!employee) {
    return <div>Loading...</div>;
  }
 
  return (
<div style ={{textAlign:"left",marginLeft:"20px",marginRight:"20px"}}>
<h5 style={{marginBottom:"5px"}}>{employee.name}</h5>
<h5>
        {employee.position} - {employee.department}
</h5>
 <div className="py-4">
<p style={{marginTop:"0"}}>Calendar Events</p>
<div style={{ maxHeight: "200px", overflowY: "scroll" }}>
<table className="table border shadow">
<thead>
<tr>
<th scope="col">ID</th>
<th scope="col">Date</th>
<th scope="col">Shift</th>
<th scope="col">Type</th>
</tr>
</thead>
<tbody>
            {calendarEvents.map((event, index) => (
<tr key={index}>
<th scope="row">{index + 1}</th>
<td>{event.date}</td>
<td>{event.title}</td>
<td>{event.type}</td>
</tr>
            ))}
</tbody>
</table>
</div>
</div>
</div>
  );
}
