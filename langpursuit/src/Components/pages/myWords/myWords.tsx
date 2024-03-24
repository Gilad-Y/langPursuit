import "./myWords.css";
import * as React from "react";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Typography from "@mui/joy/Typography";
import axios from "axios";
import { useParams } from "react-router-dom";
import LangTablePage from "./langTablePage/langTablePage";
import cld from "cld";
function MyWords(): JSX.Element {
  const params = useParams();
  const [langs, setLangs] = React.useState<string[]>([]);
  React.useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/words/getLangListById/${params.id}`)
      .then((res: any) => {
        setLangs(res.data[0].lang.split(","));
      });
  }, []);
  return (
    <div className="myWords">
      <Tabs
        variant="outlined"
        aria-label="Pricing plan"
        defaultValue={0}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          height: "100vh",
        }}
      >
        <TabList
          disableUnderline
          tabFlex={1}
          sx={{
            [`& .${tabClasses.root}`]: {
              fontSize: "sm",
              fontWeight: "lg",
              [`&[aria-selected="true"]`]: {
                color: "primary.500",
                bgcolor: "background.surface",
              },
              [`&.${tabClasses.focusVisible}`]: {
                outlineOffset: "-4px",
              },
            },
          }}
        >
          {langs.map((lang, index) => {
            return (
              <Tab
                disableIndicator
                variant="soft"
                sx={{ flexGrow: 1 }}
                key={index}
              >
                {lang}
              </Tab>
            );
          })}
        </TabList>
        {langs.map((lang, index) => {
          return (
            <TabPanel value={index}>
              <LangTablePage lang={lang} />
            </TabPanel>
          );
        })}
      </Tabs>
    </div>
  );
}

export default MyWords;
