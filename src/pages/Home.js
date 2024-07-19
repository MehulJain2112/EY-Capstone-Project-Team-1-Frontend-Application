import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../layout/NavBar";
import { TabView } from "../layout/TabView";
import OrganizationEvent from "./OrganizatonEvents";

export default function Home() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const result = await axios.get("http://localhost:8080/api/employees/all");
    setEmployees(result.data);
  };
  return (
    <>
      <NavBar />
      <>
        <div className="top-left-box">
          <h4>Employees</h4>
          <div className="py-4">
            <div style={{ maxHeight: "150px", overflowY: "scroll" }}>
              <table className="table border shadow">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Position</th>
                    <th scope="col">Department</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, index) => (
                    <tr key={index}>
                      <th scope="row" key={index}>
                        {index + 1}
                      </th>
                      <td>{emp.name}</td>
                      <td>{emp.position}</td>
                      <td>{emp.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="right-half-box">
          <TabView />
        </div>

        <div className="bottom-left-box">
          <OrganizationEvent />
        </div>
      </>
    </>
  );
}
