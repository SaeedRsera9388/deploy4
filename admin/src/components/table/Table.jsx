import "./Table.scss";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 6151684,
      program: "Business English B1",
      img: "https://e7.pngegg.com/pngimages/502/611/png-clipart-yellowbook-draw-small-yellow-book-angle-text-thumbnail.png",
      customer: "Carl Harden",
      date: "1 Feb",
      amount: 350,
      method: "Online Payment",
      status: "Approved",
    },
    {
      id: 6148684,
      program: "Business English B2",
      img: "https://e7.pngegg.com/pngimages/502/611/png-clipart-yellowbook-draw-small-yellow-book-angle-text-thumbnail.png",
      customer: "James Harden",
      date: "1 Dec",
      amount: 250,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 6156584,
      program: "Business English C1",
      img: "https://e7.pngegg.com/pngimages/502/611/png-clipart-yellowbook-draw-small-yellow-book-angle-text-thumbnail.png",
      customer: "Hardy Harden",
      date: "1 Jan",
      amount: 1550,
      method: "Cash Payment",
      status: "Review",
    },
    {
      id: 6159884,
      program: "Business English C2",
      img: "https://e7.pngegg.com/pngimages/502/611/png-clipart-yellowbook-draw-small-yellow-book-angle-text-thumbnail.png",
      customer: "Wade Harden",
      date: "1 March",
      amount: 650,
      method: "Online Payment",
      status: "Approved",
    },
  ];

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Program</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image"/>{row.program}
                  </div></TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
