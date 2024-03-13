import "./addWordFromFile.css";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useParams } from "react-router-dom";
import store from "../../../../redux/store";

interface Props {
  onClose: () => void;
  data: any;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function AddWordFromFile(props: Props): JSX.Element {
  const [wordsFile, setFile] = React.useState<any[]>();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) return;

      const csvData = e.target.result as string;
      const parsedData = processData(csvData);
      setFile(parsedData);
    };
    reader.readAsText(file);
  };

  const processData = (csvData: string) => {
    const lines = csvData.split("\n");
    const dataArray: any[] = [];
    const headers = lines[0].split(",").map((header) => header.trim()); // Trim headers

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",");
      const obj: any = {};
      for (let j = 0; j < headers.length; j++) {
        // Replace occurrences of ' with ` (backtick)
        const value = values[j].trim().replace(/'/g, "`");
        obj[headers[j]] = value;
      }
      dataArray.push(obj);
    }

    return dataArray;
  };

  const uploadWords = () => {
    axios
      .get(
        `http://localhost:4000/api/v1/words/getMyWords/${
          store.getState().users.user[0].id
        }`
      )
      .then((res: any) => {
        const myWords = res.data;
        // console.log(myWords);
        // Check if any word from wordsFile already exists in myWords
        const nonExistingWords = wordsFile?.filter((wordFromFile: any) => {
          return myWords.some(
            (word: any) => word.word !== wordFromFile.word
            // console.log(detectLanguage())
          );
        });

        // Log the existing words found
        // console.log("added:", nonExistingWords?.length);
        axios.post(
          `http://localhost:4000/api/v1/words/uploadWords/${
            store.getState().users.user[0].id
          }/${props.data}`,
          nonExistingWords
        );
      });
  };
  return (
    <div className="addWordFromFile">
      <h1>add from file</h1>
      {wordsFile?.length && <div>you inserted {wordsFile.length} words</div>}
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
      <br />

      {wordsFile?.length && (
        <Button
          color="success"
          variant="contained"
          disabled={wordsFile == undefined}
          onClick={() => uploadWords()}
        >
          Add to my words
        </Button>
      )}
    </div>
  );
}

export default AddWordFromFile;
