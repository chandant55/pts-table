// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

function App() {
  const [baseTime, setBaseTime] = useState("00:00"); // Base time from user (in 24-hour format)

  // Task data: Task Name, E, and F values from your dataset
  const tasks = [
    { task: "Doors Open", E: 0, F: 3 },
    { task: "Catering", E: 11, F: 15 },
    { task: "Cleaning", E: 7, F: 18 },
    { task: "Passengers Deplaned", E: 6, F: 19 },
    { task: "Engineering (Clearance)", E: 10, F: 20 },
    { task: "Cabin Crew Reported at Aircraft", E: 12, F: 21 },
    { task: "Security Checks", E: 13, F: 22 },
    { task: "Pilots Onboard", E: 14, F: 23 },
    { task: "Catering Handover", E: 15, F: 24 },
    { task: "Boarding Clearance", E: 16, F: 25 },
    { task: "Passengers Boarding", E: 17, F: 26 },
    { task: "GNS Notification to aircraft", E: 18, F: 27 },
    { task: "Engg. Paperwork completed", E: 19, F: 28 },
    { task: "All Paperwork completed", E: 20, F: 29 },
    { task: "Ground staff Offboard", E: 21, F: 30 },
    { task: "Doors Closed", E: 22, F: 31 },
    { task: "Chocks on", E: 23, F: 32 },
    { task: "Fuel Bowser Reporting", E: 24, F: 33 },
    { task: "Bag/Cargo Offload", E: 25, F: 34 },
    { task: "Fuelling", E: 26, F: 35 },
    { task: "Bag/Cargo Loading", E: 27, F: 36 },
    { task: "GNS Bag Offload", E: 28, F: 37 },
    { task: "Hold Closed", E: 29, F: 38 },
    { task: "Engineers Ready to Pushback", E: 30, F: 39 },
    { task: "Tow/Tractor Connected", E: 31, F: 40 },
    { task: "Chocks off", E: 32, F: 41 }
  ];

  // Helper function to add minutes to a time string (HH:mm)
  const addMinutes = (time, minsToAdd) => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + minsToAdd;
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

  // Function to calculate start and end times based on base time and duration
  const calculateTimes = (baseTime, E, F) => {
    const startTime = addMinutes(baseTime, E); // START (D-) calculation
    const endTime = addMinutes(baseTime, F);   // END (D-) calculation
    const timeTaken = calculateTimeDifference(startTime, endTime); // Ensure positive time difference
    return { startTime, endTime, timeTaken: `${timeTaken} mins` };
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Precision Schedule Calculator</h1>
      
      {/* Input for base time */}
      <div>
        <label>Base Time (ATA): </label>
        <input 
          type="time" 
          value={baseTime} 
          onChange={(e) => setBaseTime(e.target.value)} 
        />
      </div>

      <table border={1} cellPadding="10" style={{ marginTop: "20px" }}>
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
