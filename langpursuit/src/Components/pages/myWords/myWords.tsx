import { useEffect, useState } from "react";
import "./myWords.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { wordsModel } from "../../../models/wordsModel";
import { Button } from "@mui/material";
import MainModal from "../../mainModal/mainModal";
import { Sheet } from "@mui/joy";
import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Tooltip from "@mui/joy/Tooltip";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { visuallyHidden } from "@mui/utils";
import React from "react";
function MyWords(): JSX.Element {
  const params = useParams();
  const [rows, setRows] = useState<wordsModel[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/words/getMyWords/${params.id}`)
      .then((res: any) => {
        setRows(res.data); // Update the state with fetched data
        console.log(res.data);
      });
  }, []);
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: any, newValue: number | null) => {
    setRowsPerPage(parseInt(newValue!.toString(), 10));
    setPage(0);
  };
  function labelDisplayedRows({
    from,
    to,
    count,
  }: {
    from: number;
    to: number;
    count: number;
  }): string {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
  }

  const getLabelDisplayedRowsTo = () => {
    if (rows.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? rows.length
      : Math.min(rows.length, (page + 1) * rowsPerPage);
  };

  return (
    <div className="myWords" style={{ overflow: "auto" }}>
      <Sheet
        variant="outlined"
        sx={{ width: "100%", boxShadow: "sm", borderRadius: "sm" }}
      >
        <Table aria-labelledby="tableTitle" hoverRow>
          <thead>
            <tr>
              <th>Category</th>
              <th>Word</th>
              <th>Definition</th>
            </tr>
          </thead>
          <tbody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <tr key={index}>
                  <td>{row.category}</td>
                  <td>{row.word}</td>
                  <td>{row.definition}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "flex-end",
        }}
      >
        <Typography textAlign="center" sx={{ minWidth: 80 }}>
          {labelDisplayedRows({
            from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
            to: getLabelDisplayedRowsTo(),
            count: rows.length === -1 ? -1 : rows.length,
          })}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            size="sm"
            color="neutral"
            variant="outlined"
            disabled={page === 0}
            onClick={() => handleChangePage(page - 1)}
            sx={{ bgcolor: "background.surface" }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton
            size="sm"
            color="neutral"
            variant="outlined"
            disabled={
              rows.length !== -1
                ? page >= Math.ceil(rows.length / rowsPerPage) - 1
                : false
            }
            onClick={() => handleChangePage(page + 1)}
            sx={{ bgcolor: "background.surface" }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      </Box>
      <Button
        color="success"
        variant="contained"
        onClick={() => {
          toggleModal();
        }}
      >
        Add Words
      </Button>
      <MainModal
        open={open}
        onClose={toggleModal}
        type={"addWords"}
        data={""}
      />
    </div>
  );
}

export default MyWords;
