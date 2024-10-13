// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

function App() {
  const [baseHours, setBaseHours] = useState(0);  // Default hours (00)
  const [baseMinutes, setBaseMinutes] = useState(0); // Default minutes (00)

  // Task data: Task Name, E, and F values from your dataset
  const tasks = [
    { task: "Doors Open", E: 0, F: 3 },
    { task: "Catering", E: 11, F: 15 },
    { task: "Cleaning", E: 7, F: 18 },
    { task: "Passengers Deplaned", E: 6, F: 19 },
    { task: "Engineering (Clearance)", E: 10, F: 20 },
    { task: "Cabin Crew Reported at Aircraft", E: -15, F: -15 },
    { task: "Security Checks", E: 6, F: 17 },
    { task: "Pilots Onboard", E: 0, F: 10 },
    { task: "Catering Handover", E: 0, F: 17 },
    { task: "Boarding Clearance", E: 0, F: 18 },
    { task: "Passengers Boarding", E: 15, F: 33 },
    { task: "GNS Notification to aircraft", E: 1, F: 28 },
    { task: "Engg. Paperwork completed", E: 0, F: 36 },
    { task: "All Paperwork completed", E: 0, F: 36 },
    { task: "Ground staff Offboard", E: 0, F: 36 },
    { task: "Doors Closed", E: 0, F: 37 },
    { task: "Chocks on", E: 0, F: 0 },
    { task: "Fuel Bowser Reporting", E: 0, F: 0 },
    { task: "Bag/Cargo Offload", E: 11, F: 13 },
    { task: "Fuelling", E: 21, F: 25 },
    { task: "Bag/Cargo Loading", E: 15, F: 28 },
    { task: "GNS Bag Offload", E: 7, F: 35 },
    { task: "Hold Closed", E: 0, F: 35 },
    { task: "Engineers Ready to Pushback", E: 0, F: 37 },
    { task: "Tow/Tractor Connected", E: 0, F: 37 },
    { task: "Chocks off", E: 0, F: 40 }
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

  // Helper function to calculate the difference between two time strings (HH:mm)
  const calculateTimeDifference = (start, end) => {
    const [startHours, startMinutes] = start.split(":").map(Number);
    const [endHours, endMinutes] = end.split(":").map(Number);

    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    const timeDifference = endTotalMinutes - startTotalMinutes;

    // Ensure positive time difference and return in minutes format
    return Math.abs(timeDifference);
  };

  // Function to calculate start and end times based on base time and task's E and F values
  const calculateTimes = (baseTime, E, F) => {
    const startTime = addMinutes(baseTime, F); // START (D-) calculation based on F
    const endTime = addMinutes(baseTime, E);   // END (D-) calculation based on E
    const timeTaken = calculateTimeDifference(startTime, endTime); // Ensure positive time difference
    return { startTime, endTime, timeTaken: `${timeTaken} mins` };
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
            <th>Time Taken</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            const { startTime, endTime, timeTaken } = calculateTimes(baseTime, task.E, task.F);
            return (
              <tr key={index}>
                <td>{task.task}</td>
                <td>{startTime}</td>
                <td>{endTime}</td>
                <td>{timeTaken}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
