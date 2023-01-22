import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          style={{ maxWidth: "100%" }}
          src="https://media.istockphoto.com/id/1326661966/vector/back-to-school-concept-group-of-multicultural-pupils-walking-to-school-happy-kids-with.jpg?s=612x612&w=0&k=20&c=JUy1BPU9oZvrM7fqiCVbstkozmL9hy9ZMX42q_QBMRU="
          alt="school"
        />
        <h1>Welcome To Shaala -</h1>
        <span>One Stop Solution for Attendance Management</span>
      </div>
    );
  }
}
