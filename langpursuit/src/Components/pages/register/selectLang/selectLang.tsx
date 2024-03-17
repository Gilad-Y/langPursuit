import "./selectLang.css";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import Select, { SelectOption } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { Avatar, Chip } from "@mui/joy";
import axios from "axios";

interface props {
  addStep: () => void;
  sendLangInfo: (langs: String[]) => void;
  removeToStep: () => void;
}

function SelectLang(props: props): JSX.Element {
  const [options, setOptions] = React.useState<any[]>([]);
  const [value, setValue] = React.useState<string[]>([]);
  const [flags, setFlags] = React.useState<string[]>([]);

  React.useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((res: any) => {
      // Sort the array based on the label (name)
      const sortedData = res.data.sort((a: any, b: any) => {
        if (a.name.common < b.name.common) return -1;
        if (a.name.common > b.name.common) return 1;
        return 0;
      });

      // Map over the sorted array to create the options
      const mappedOptions = sortedData.map((item: any) => ({
        label: item.name.common,
        value: item.languages,
        src: item.flags.png,
      }));

      // Set the options in the state
      setOptions(mappedOptions);
    });
  }, []);
  const sendLanguages = () => {
    props.sendLangInfo(value);
    props.addStep();
  };
  const handleSelectChange = (event: any, newValue: any) => {
    setValue(newValue);
    // Extract flag URLs from selected options and set them in the state
    const selectedFlags = newValue.map(
      (val: string) => options.find((opt) => opt.label === val)?.src || ""
    );
    setFlags(selectedFlags);
  };

  // Create a new variable and assign Select component with 'any' type
  const SelectComponent: any = Select;

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
          <Typography component="h1" variant="h5">
            choose languages from the list
          </Typography>
          <br />
          <Grid container spacing={2}>
            {/* Use the newly created SelectComponent */}
            <SelectComponent
              component="div" // Set the component prop to "div"
              defaultValue={["1"]}
              slotProps={{
                listbox: {
                  sx: {
                    "--ListItemDecorator-size": "44px",
                  },
                },
              }}
              sx={{
                "--ListItemDecorator-size": "44px",
                minWidth: 240,
              }}
              renderValue={(options: SelectOption<string>[] | null) =>
                options ? options.map((opt) => opt.label).join(", ") : ""
              }
              multiple
              onChange={handleSelectChange}
              value={value}
              // Use the renderTags property
              renderTags={(value: SelectOption<string>[], getTagProps: any) =>
                value.map((option: SelectOption<string>, index: number) => (
                  <Chip
                    key={index}
                    label={option.label}
                    {...getTagProps({ index })}
                    sx={{ m: 0.5 }}
                  />
                ))
              }
            >
              {options.map((option, index) => (
                <React.Fragment key={option.label}>
                  {index !== 0 ? (
                    <ListDivider role="none" inset="startContent" />
                  ) : null}
                  <Option value={option.value} label={option.label}>
                    <ListItemDecorator>
                      <Avatar size="sm" src={option.src} />
                    </ListItemDecorator>
                    {option.label}
                  </Option>
                </React.Fragment>
              ))}
            </SelectComponent>
          </Grid>
          <br />
          <Typography component="h2" variant="h6">
            Selected Flags:
          </Typography>
          <Grid container spacing={2}>
            {flags.map((flag, index) => (
              <Grid item key={index}>
                <img alt="Flag" src={flag} />
              </Grid>
            ))}
            <br />
          </Grid>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              sendLanguages();
            }}
          >
            done
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default SelectLang;
