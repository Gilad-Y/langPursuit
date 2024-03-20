import "./selectLang.css";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import { Alert } from "@mui/material";
interface props {
  addStep: () => void;
  sendLangInfo: (langs: string[]) => void;
  removeToStep: () => void;
}

function SelectLang(props: props): JSX.Element {
  const [languages, setLanguages] = React.useState<any[]>([]);
  const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>([]);
const [alert, setAlert] = React.useState<any>(undefined);
const popAlert = (alertToAdd: any) => {
    if (alert == undefined) {
      setAlert(alertToAdd);
      setTimeout(() => {
        popAlert(undefined);
      }, 5000);
    }
  };
  React.useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res: any) => {
      const sortedLanguages: any[] = [];
      res.data.forEach((country: any) => {
        if (country.languages) {
  Object.entries(country.languages).forEach(([key, value]: [any, any]) => {
    // Exclude English (assuming "English" is the language to be excluded)
    if (value !== "English") {
      // Check if the language already exists in the sortedLanguages array
      const existingLanguage = sortedLanguages.find(lang => lang.value === value);
      if (!existingLanguage) {
        sortedLanguages.push({
          label: value,
          value: value,
          flag: country.flags.png
        });
      }
    }
  });
}

      });

      // Sort the languages alphabetically by label
      sortedLanguages.sort((a, b) => a.label.localeCompare(b.label));

      setLanguages(sortedLanguages);
    });
  }, []);

  const sendLanguages = () => {
    if(selectedLanguages.length>0){
    var langToUser:string[]=[]
    selectedLanguages.map((item:any)=>{
      langToUser.push(item.value)
    })
     props.sendLangInfo(langToUser)
    }else{
popAlert({content:"you must pick at least one language",
color:"warning"
})
    }
  };

  return (
    <div className="selectLang">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {alert !== undefined && (
            <Alert variant="filled" color={alert.color}>
              {alert.content}
            </Alert>
          )}
          <Typography component="h1" variant="h5">
            Choose languages from the list
          </Typography>
          <br />
          <Grid container spacing={2}>
            <Autocomplete
            fullWidth
              multiple
              id="tags-standard"
              options={languages}
              value={selectedLanguages}
              onChange={(event, newValue) => {
                setSelectedLanguages(newValue);
                
              }}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="pick languages"
                  placeholder="pick languages"
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <img src={option.flag} alt={option.label}  width={"30px"}/>
                  {option.label}
                </li>
              )}
            />
          </Grid>
          <br />
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              sendLanguages();
            }}
          >
            Done
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default SelectLang;
