import React, { Component } from "react";
import PrimaryTable from "../../common/PrimaryTable";
import withRouter from "../withRouter";
import axios from "axios";
import { Button } from "@mui/material";
import AttendancePercentage from "../Student/AttendancePercentage";
import MarkAttendance from "../Student/MarkAttendance";
import AddStudent from "../Student/AddStudent";
import Alert from "@mui/material/Alert";
class AllStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
    };
  }
  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/attendance-management/classes/${this.props.params.id}/`).then((res) => {
      let data = res.data;
      data.forEach(
        (c) => (
          (c["mark_attendance"] = (
            // <Button variant="contained" sx={{ textTransform: "capitalize", fontWeight: "600" }} onClick={() => {}}>
            //   Mark
            // </Button>
            <MarkAttendance
              id={c.id}
              class_name={c.class_name}
              setSuccess={this.props.setSuccess}
              setError={this.props.setError}
            />
          )),
          (c["view_percentage"] = (
            // <Button variant="contained" sx={{ textTransform: "capitalize", fontWeight: "600" }} onClick={() => {}}>
            //   View
            // </Button>
            <AttendancePercentage id={c.id} />
          ))
        )
      );
      this.setState({ students: data });
      console.log(this.state.students);
    });
  }
  render() {
    console.log("Props:", this.props.params.id);
    const header = [
      "Sr no.",
      "Class Name",
      "Name of Student",
      "Age",
      "Gender",
      "Address",
      "Mark Attendance",
      "View Attendance Percentage",
    ];
    return (
      <div style={{ padding: "0 3rem" }}>
        <h1>All Students</h1>
        <div style={{ maxWidth: "30rem", zIndex: "100", textAlign: "center", margin: "auto" }}>
          {this.props.error && (
            <Alert variant="filled" severity="error">
              {this.props.error}
            </Alert>
          )}
          {this.props.success && (
            <Alert variant="filled" severity="success">
              {this.props.success}
            </Alert>
          )}
        </div>
        <div style={{ textAlign: "right" }}>
          <AddStudent
            class_name={this.props.params.id}
            setSuccess={this.props.setSuccess}
            setError={this.props.setError}
          />
        </div>
        <br />
        <PrimaryTable header={header} rows={this.state.students} />
      </div>
    );
  }
}

export default withRouter(AllStudents);
