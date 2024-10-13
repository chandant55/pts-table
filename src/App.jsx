// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

function App() {
  const [baseHours, setBaseHours] = useState(5);  // Default hours (5 for 5:30)
  const [baseMinutes, setBaseMinutes] = useState(30); // Default minutes (30 for 5:30)

  // Task data with E and F values
  const tasks = [
    { task: "Doors Open", E: 3, F: 3 },
    { task: "Catering", E: 4, F: 15 },
    { task: "Cleaning", E: 11, F: 18 },
    { task: "Passengers Deplaned", E: 3, F: 8 },
    { task: "Engineering (Clearance)", E: 3, F: 12 },
    { task: "Cabin Crew Reported at Aircraft", E: -15, F: -15 },
    { task: "Security Checks", E: 11, F: 17 },
    { task: "Pilots Onboard", E: 10, F: 10 },
    { task: "Catering Handover", E: 17, F: 17 },
    { task: "Boarding Clearance", E: 18, F: 18 },
    { task: "Passengers Boarding", E: 18, F: 33 },
    { task: "GNS Notification to aircraft", E: 27, F: 28 },
    { task: "Engg. Paperwork completed", E: 36, F: 36 },
    { task: "All Paperwork completed", E: 36, F: 36 },
    { task: "Ground staff Offboard", E: 36, F: 36 },
    { task: "Doors Closed", E: 37, F: 37 },
    { task: "Chocks on", E: 0, F: 0 },
    { task: "Fuel Bowser Reporting", E: 0, F: 0 },
    { task: "Bag/Cargo Offload", E: 2, F: 11 },
    { task: "Fuelling", E: 4, F: 21 },
    { task: "Bag/Cargo Loading", E: 13, F: 15 },
    { task: "GNS Bag Offload", E: 28, F: 35 },
    { task: "Hold Closed", E: 35, F: 35 },
    { task: "Engineers Ready to Pushback", E: 37, F: 37 },
    { task: "Tow/Tractor Connected", E: 37, F: 37 },
    { task: "Chocks off", E: 40, F: 40 },
  ];

  // Helper function to add minutes to a time string (HH:mm)
  const addMinutes = (time, minsToAdd) => {
    const [hours, minutes] = time.split(":").map(Number);
    let totalMinutes = hours * 60 + minutes + minsToAdd;

    // Handle negative time (roll back to previous day)
    while (totalMinutes < 0) {
      totalMinutes += 24 * 60; // Add 24 hours worth of minutes
    }

    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`;
  };

  // Function to calculate start and end times based on base time and task's E and F values
  const calculateTimes = (baseTime, E, F) => {
    const startTime = addMinutes(baseTime, E); // START time calculation based on E
    const endTime = addMinutes(baseTime, F);   // END time calculation based on F
    return { startTime, endTime };
  };

  // Combine hours and minutes into HH:mm format
  const baseTime = `${String(baseHours).padStart(2, "0")}:${String(baseMinutes).padStart(2, "0")}`;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Precision Schedule Calculator</h1>
      
      {/* Input for base time */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Base Time (ATA): </label>
        <input
          type="number"
          value={baseHours}
          onChange={(e) => setBaseHours(Math.max(0, Math.min(23, parseInt(e.target.value))))}
          min="0"
          max="23"
          style={{ width: "50px", marginRight: "5px" }}
        />{" "}
        :
        <input
          type="number"
          value={baseMinutes}
          onChange={(e) => setBaseMinutes(Math.max(0, Math.min(59, parseInt(e.target.value))))}
          min="0"
          max="59"
          style={{ width: "50px", marginLeft: "5px" }}
        />
      </div>

      {/* Reset time button */}
      <div style={{ marginBottom: "20px" }}>
        <button
          style={{ padding: "8px 16px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}
          onClick={() => {
            setBaseHours(0);
            setBaseMinutes(0);
          }}
        >
          Reset Time to 00:00
        </button>
      </div>

      <table border={1} cellPadding="10" style={{ marginTop: "20px", width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Task</th>
            <th>START (D-)</th>
            <th>END (D-)</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            const { startTime, endTime } = calculateTimes(baseTime, task.E, task.F);
            return (
              <tr key={index}>
                <td>{task.task}</td>
                <td>{startTime}</td>
                <td>{endTime}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
