import React, { Component } from "react";
import PrimaryTable from "../../common/PrimaryTable";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

class Classes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
    };
  }
  goToClass = (id) => {
    this.props.navigate(`/classes/${id}`);
  };
  componentDidMount() {
    axios.get("http://127.0.0.1:8000/attendance-management/classes/").then((res) => {
      let data = res.data;
      data.forEach(
        (c) =>
          (c["action"] = (
            <Button
              variant="contained"
              sx={{ textTransform: "capitalize", fontWeight: "600" }}
              onClick={() => {
                this.goToClass(c.id);
              }}
            >
              View
            </Button>
          ))
      );
      this.setState({ classes: data });
      console.log(this.state.classes);
    });
  }
  render() {
    const header = ["Sr no.", "Class", "Number of Student", "Average Rating", "Action"];
    return (
      <div style={{ padding: "0 3rem" }}>
        <h1>All Classes</h1>
        <PrimaryTable header={header} rows={this.state.classes} />
      </div>
    );
  }
}

function WithNavigate() {
  let navigate = useNavigate();
  return <Classes navigate={navigate} />;
}

export default WithNavigate;
