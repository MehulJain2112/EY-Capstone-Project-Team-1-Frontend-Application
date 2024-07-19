import axios from "axios";
import React, { useEffect, useState } from "react";

export default function OrganizationEvent() {
  const [events, setEvent] = useState([]);

  useEffect(() => {
    loadEvent();
  }, []);

  const loadEvent = async () => {
    const result = await axios.get("http://localhost:8080/api/events/organizational");
    setEvent(result.data);
  };
  return (
    <div className="container">
        <h4>Organizational Events</h4>
      <div className="py-4">
        <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
        <table class="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Date</th>
        
            </tr>
          </thead>
          <tbody>
            {events.map((emp, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{emp.title}</td>
                <td>{emp.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      </div>
    </div>
  );
}