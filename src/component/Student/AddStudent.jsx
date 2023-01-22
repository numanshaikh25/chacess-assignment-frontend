import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({ class_name, setSuccess, setError }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  const [gender, setGender] = React.useState(null);

  const [age, setAge] = React.useState("");
  const [address, setAddress] = React.useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setGender(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const data = {
      name: name,
      gender: gender,
      age: age,
      address: address,
      class_name: class_name,
    };
    console.log(data);
    // const data = { class_name, student: id, date: formatDate(date), present };
    axios
      .post(`http://127.0.0.1:8000/attendance-management/students/`, data)
      .then((res) => {
        setSuccess("Successfully added a student");
        setTimeout(() => {
          setSuccess("");
        }, 2500);
      })
      .catch((err) => {
        setError("Some field is missing");
        setTimeout(() => {
          setError("");
        }, 2500);
      });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} sx={{ textTransform: "capitalize", fontWeight: "600" }}>
        Add a Student
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ margin: "auto" }}
      >
        <BootstrapDialogTitle id="customized-dialog-title">Student Details</BootstrapDialogTitle>
        <DialogContent dividers sx={{ minWidth: "18rem" }}>
          <form onSubmit={submitHandler}>
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                type="text"
                label="Name"
                variant="outlined"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Age"
                variant="outlined"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                required
              />
              <br />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Gender"
                  required
                  value={gender}
                  onChange={handleChange}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </FormControl>
              <br />
              <TextField
                id="outlined-basic"
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
              />
            </FormControl>
            <br />
            <br />
            <div>
              <Button type="submit" autoFocus variant="contained">
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
