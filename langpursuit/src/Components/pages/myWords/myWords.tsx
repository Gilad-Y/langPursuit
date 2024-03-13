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
          {/* <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
            Community
          </Tab> */}
          {langs.map((lang) => {
            return (
              <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
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
        {/* <TabPanel value={0}>
          <Typography level="inherit">
            Get started with the industry-standard React UI library,
            MIT-licensed.
          </Typography>
          <Typography
            textColor="success.400"
            fontSize="xl3"
            fontWeight="xl"
            mt={1}
          >
            $0{" "}
            <Typography
              fontSize="sm"
              textColor="text.secondary"
              fontWeight="md"
            >
              － Free forever
            </Typography>
          </Typography>
        </TabPanel>
        <TabPanel value={1}>
          <Typography level="inherit">
            Best for professional developers building enterprise or data-rich
            applications.
          </Typography>
          <Typography
            textColor="primary.400"
            fontSize="xl3"
            fontWeight="xl"
            mt={1}
          >
            $15{" "}
            <Typography
              fontSize="sm"
              textColor="text.secondary"
              fontWeight="md"
            >
              / dev / month
            </Typography>
          </Typography>
        </TabPanel>
        <TabPanel value={2}>
          <Typography level="inherit">
            The most advanced features for data-rich applications, as well as
            the highest priority for support.
          </Typography>
          <Typography
            textColor="primary.400"
            fontSize="xl3"
            fontWeight="xl"
            mt={1}
          >
            <Typography
              fontSize="xl"
              borderRadius="sm"
              px={0.5}
              mr={0.5}
              sx={(theme) => ({
                ...theme.variants.soft.danger,
                color: "danger.400",
                verticalAlign: "text-top",
                textDecoration: "line-through",
              })}
            >
              $49
            </Typography>
            $37*{" "}
            <Typography
              fontSize="sm"
              textColor="text.secondary"
              fontWeight="md"
            >
              / dev / month
            </Typography>
          </Typography>
        </TabPanel> */}
      </Tabs>
    </div>
  );
}

export default MyWords;
