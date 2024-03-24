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
import Checkbox from "@mui/joy/Checkbox";
import EditNoteIcon from "@mui/icons-material/EditNote";

interface props {
  lang: string;
}

function LangTablePage(props: props): JSX.Element {
  const params = useParams();
  const [rows, setRows] = useState<wordsModel[]>([]);
  const [selected, setSelected] = React.useState<any[]>([]); // State for selected rows
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setEdit] = useState<boolean>(false);
  const [ref, setRefresh] = useState<boolean>(false);
  const [wordToEdit, setWord] = useState<wordsModel>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const toggleModal = () => {
    setOpen((prev) => !prev);
    setRefresh(!ref);
  };

  const toggleEdit = () => {
    setEdit((prev) => !prev);
    setRefresh(!ref);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/v1/words/getMyWords/${params.id}/${props.lang}`
      )
      .then((res: any) => {
        setRows(res.data);
      });
  }, [ref]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const labelDisplayedRows = ({
    from,
    to,
    count,
  }: {
    from: number;
    to: number;
    count: number;
  }): string => {
    return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
  };

  const getLabelDisplayedRowsTo = () => {
    if (rows.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? rows.length
      : Math.min(rows.length, (page + 1) * rowsPerPage);
  };

  const editRow = (word: wordsModel) => {
    toggleEdit();
    setWord(word);
  };

  const deleteRow = (id: number | any[]) => {
    axios
      .delete(`http://localhost:4000/api/v1/words/deleteWord/${id}`)
      .then((res) => {
        setRefresh(!ref);
      });
  };

  const hearWord = (word: string) => {
    // Do something with the word
  };
  const sendWordsForPractice = () => {
    // Convert string IDs to numbers
    const selectedIds = selected.map((id) => parseInt(id, 10));

    // Filter the rows array based on selectedIds
    const filteredArray = rows.filter((item) => selectedIds.includes(item.id));

    axios
      .post(`http://localhost:4000/api/v1/words/getPractice`, filteredArray)
      .then((res: any) => {
        console.log({ words: res.data, level: 5, sentence: 5 });
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  const handleCheckboxClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
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
                  <th>
                    <Checkbox
                      indeterminate={
                        selected.length > 0 && selected.length < rows.length
                      }
                      checked={
                        rows.length > 0 && selected.length === rows.length
                      }
                      onChange={() => {
                        if (selected.length === rows.length) {
                          setSelected([]);
                        } else {
                          const newSelected = rows.map((row) =>
                            row.id.toString()
                          );
                          setSelected(newSelected);
                        }
                      }}
                    />
                  </th>
                  <th>Category</th>
                  <th>Word</th>
                  <th>Definition</th>
                  <th>
                    {selected && (
                      <>
                        <Button
                          color="error"
                          onClick={() => {
                            deleteRow(selected);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                        <Button
                          color="success"
                          disabled={selected.length < 10}
                          onClick={() => {
                            sendWordsForPractice();
                          }}
                        >
                          <EditNoteIcon />
                        </Button>
                      </>
                    )}
                  </th>
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
                      <td>
                        <Checkbox
                          checked={selected.indexOf(row.id.toString()) !== -1}
                          onChange={(event) =>
                            handleCheckboxClick(event, row.id.toString())
                          }
                        />
                      </td>
                      <td>{row.category}</td>
                      <td>{row.word}</td>
                      <td>{row.definition}</td>
                      <td>
                        <IconButton onClick={() => deleteRow(row.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => editRow(row)}>
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
        <h1>It's a good time to add words</h1>
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
      <MainModal
        open={openEdit}
        onClose={toggleEdit}
        type={"editWord"}
        data={wordToEdit}
      />
    </div>
  );
}

export default LangTablePage;
