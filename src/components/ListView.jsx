import React, { useEffect, useState } from "react";
import { useBoxStore } from "../state/zustandStore";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function createData(name, weight, color, country, cost) {
  return { name, weight, color, country, cost };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const ListView = () => {
  const [allShippingBoxes, setallShippingBoxes] = useState([]);

  const { boxes, loadBoxes } = useBoxStore((state) => state);
  useEffect(() => {
    loadBoxes();
  }, []);

  useEffect(() => {
    let allBoxes = boxes.map((box) =>
      createData(
        box.receiverName,
        box.weight,
        box.color,
        box.country,
        box.cost,
      ),
    );

    setallShippingBoxes([...allBoxes]);
  }, [boxes]);

  return (
    <>
      {allShippingBoxes.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Reciever's Name</TableCell>
                <TableCell align="right">Weight (kg)</TableCell>
                <TableCell align="right">Color</TableCell>
                <TableCell align="right">Destination Country</TableCell>
                <TableCell align="right">Shipping Cost (INR)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allShippingBoxes.map((row, ind) => (
                <TableRow
                  key={`${row.name}-${ind}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.weight}</TableCell>
                  <TableCell align="right">
                    {" "}
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        margin: "auto",
                        display: "block",
                        backgroundColor: row.color,
                      }}
                    ></div>{" "}
                  </TableCell>
                  <TableCell align="right">{row.country}</TableCell>
                  <TableCell align="right">₹{parseFloat(row.cost).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        "No Data Found!"
      )}
    </>
  );
};

export default ListView;
