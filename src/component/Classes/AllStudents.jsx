import React, { Component } from "react";
import PrimaryTable from "../../common/PrimaryTable";
import withRouter from "../withRouter";
import axios from "axios";
import { Button } from "@mui/material";
import AttendancePercentage from "../Student/AttendancePercentage";
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
            <Button variant="contained" sx={{ textTransform: "capitalize", fontWeight: "600" }} onClick={() => {}}>
              Mark
            </Button>
          )),
          (c["view_percentage"] = (
            // <Button variant="contained" sx={{ textTransform: "capitalize", fontWeight: "600" }} onClick={() => {}}>
            //   View
            // </Button>
            <AttendancePercentage />
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
        <PrimaryTable header={header} rows={this.state.students} />
      </div>
    );
  }
}

export default withRouter(AllStudents);
