import { Button, Grid } from "@mui/material";
import "./editWord.css";
import { wordsModel } from "../../../models/wordsModel";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import axios from "axios";
interface props {
  onClose: () => void;
  data: wordsModel;
}
function EditWord(props: props): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<wordsModel>();
  const editWord = (data: wordsModel) => {
    document.body.style.cursor = "wait";
    data.id = props.data.id;
    data.userId = props.data.userId;
    axios
      .put("http://localhost:4000/api/v1/words/editWord", data)
      .then((res: any) => {
        props.onClose();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (document.body.style.cursor = "default"));
  };
  return (
    <div className="editWord">
      <h1>edit word</h1>
      <form onSubmit={handleSubmit(editWord)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              {...register("category", { required: true })}
              name="category"
              defaultValue={props.data.category}
              required
              fullWidth
              id="category"
              label="category "
              autoFocus
              error={!!errors.category}
              helperText={errors.category ? "Required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              {...register("word", { required: true })}
              name="word"
              defaultValue={props.data.word}
              required
              fullWidth
              id="word"
              label="word"
              autoFocus
              error={!!errors.word}
              helperText={errors.word ? "Required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              {...register("definition", { required: true })}
              name="definition"
              defaultValue={props.data.definition}
              required
              fullWidth
              id="definition"
              label="definition"
              autoFocus
              error={!!errors.definition}
              helperText={errors.definition ? "Required" : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" color="success" variant="contained" fullWidth>
              edit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default EditWord;
