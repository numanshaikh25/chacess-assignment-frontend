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

export default function CustomizedDialogs({ id, class_name, setSuccess, setError }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(null);
  const [present, setPresent] = React.useState(false);

  const handleChange = (event) => {
    console.log(event.target.value);
    setPresent(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  const markAttendance = (e) => {
    e.preventDefault();
    const data = { class_name, student: id, date: formatDate(date), present };
    axios
      .post(`http://127.0.0.1:8000/attendance-management/attendance/`, data)
      .then((res) => {
        setSuccess("Successfully marked attendance");
        setTimeout(() => {
          setSuccess("");
        }, 2500);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setTimeout(() => {
          setError("");
        }, 2500);
      });
    setOpen(false);
  };

  React.useEffect(() => {}, []);

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} sx={{ textTransform: "capitalize", fontWeight: "600" }}>
        Mark
      </Button>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title">Mark Attendance</BootstrapDialogTitle>
        <DialogContent dividers>
          <form onSubmit={markAttendance}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Select a date"
                value={date}
                required
                inputFormat="yyyy-MM-dd"
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <br />
            <br />
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label">Present</InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={present}
                required
                onChange={handleChange}
              >
                <MenuItem value={true}>Present</MenuItem>
                <MenuItem value={false}>Absent</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />
            <div>
              <Button autoFocus type="submit" variant="contained">
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
