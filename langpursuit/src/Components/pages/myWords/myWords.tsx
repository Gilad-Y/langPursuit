import { useEffect, useState } from "react";
import "./myWords.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Table, { TableProps } from "@mui/joy/Table";
import { wordsModel } from "../../../models/wordsModel";
import { Button } from "@mui/material";

function MyWords(): JSX.Element {
  const params = useParams();
  const [rows, setRows] = useState<wordsModel[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/words/getMyWords/${params.id}`)
      .then((res: any) => {
        setRows(res.data); // Update the state with fetched data
      });
  }, []);

  return (
    <div className="myWords">
      {rows.length > 0 ? (
        <Table aria-label="table sizes" size={"lg"}>
          <thead>
            <tr>
              <th>word</th>
              <th>Definition</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.word}</td>
                <td>{row.definition}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Button color="success" variant="contained">
          add words
        </Button>
      )}
    </div>
  );
}

export default MyWords;
