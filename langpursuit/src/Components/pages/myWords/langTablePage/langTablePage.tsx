import "./langTablePage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { wordsModel } from "../../../../models/wordsModel";
import { Button } from "@mui/material";
import MainModal from "../../../mainModal/mainModal";
import { Sheet } from "@mui/joy";
import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
interface props {
  //   id: number;
  lang: string;
}
function LangTablePage(props: props): JSX.Element {
  const params = useParams();
  const [rows, setRows] = useState<wordsModel[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [ref, setRefresh] = useState<boolean>(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/v1/words/getMyWords/${params.id}/${props.lang}`
      )
      .then((res: any) => {
        setRows(res.data); // Update the state with fetched data
      });
  }, [ref]);
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };
  // const handleChangeRowsPerPage = (event: any, newValue: number | null) => {
  //   setRowsPerPage(parseInt(newValue!.toString(), 10));
  //   setPage(0);
  // };
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
  const editRow = (id: number) => {
    console.log(id);
  };
  const deleteRow = (id: number) => {
    axios
      .delete(`http://localhost:4000/api/v1/words/deleteWord/${id}`)
      .then((res) => {
        setRefresh(!ref);
      });
  };
  const hearWord = (word: string) => {
    // const value = new SpeechSynthesisUtterance("こんにちは");
    // window.speechSynthesis.speak(value);
  };
  return (
    <div className="langTablePage">
      {rows.length > 0 ? (
        <>
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <tr
                      key={index}
                      onClick={() => {
                        hearWord(row.word);
                      }}
                    >
                      <td>{row.category}</td>
                      <td>{row.word}</td>
                      <td>{row.definition}</td>
                      <td>
                        {" "}
                        <IconButton onClick={() => deleteRow(row.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => editRow(row.id)}>
                          <EditIcon />
                        </IconButton>
                      </td>
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
        </>
      ) : (
        <h1>it's a good time to add words</h1>
      )}
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
        data={props.lang}
      />
    </div>
  );
}

export default LangTablePage;
