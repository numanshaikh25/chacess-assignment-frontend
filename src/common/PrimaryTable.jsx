import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }
const rows = [
  { class: "1", num_students: 10, average_attendance: 75.0, action: <Button variant="contained">View</Button> },
  { class: "2", num_students: 10, average_attendance: 75.0, action: <Button variant="contained">View</Button> },
  { class: "3", num_students: 10, average_attendance: 75.0, action: <Button variant="contained">View</Button> },
  { class: "4", num_students: 10, average_attendance: 75.0, action: <Button variant="contained">View</Button> },
  { class: "4", num_students: 10, average_attendance: 75.0, action: <Button variant="contained">View</Button> },
  { class: "4", num_students: 10, average_attendance: 75.0, action: <Button variant="contained">View</Button> },
  { class: "4", num_students: 10, average_attendance: 75.0, action: <Button variant="contained">View</Button> },
  { class: "4", num_students: 10, average_attendance: 75.0, action: <Button variant="contained">View</Button> },
  { class: "4", num_students: 10, average_attendance: 75.0, action: <Button variant="contained">View</Button> },
  { class: "4", num_students: 10, average_attendance: 75.0, action: <Button variant="contained">View</Button> },
];

export default function PrimaryTable({ header, rows }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((head) => (
              <TableCell align="center" sx={{ fontWeight: "600" }}>
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.class} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="center">{index + 1}</TableCell>
              {Object.values(row).map((r, index) => index !== 0 && <TableCell align="center">{r}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
