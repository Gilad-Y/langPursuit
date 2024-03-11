import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ColorSchemeToggle from "./ColorSchemeToggle";
import { closeSidebar } from "./utils";
import store from "../../../redux/store";
import { logOutUser } from "../../../redux/usersReducer";
import { UserModel } from "../../../models/userModel";
import { useNavigate } from "react-router-dom";

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);

  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

const logOut = () => {
  store.dispatch(logOutUser());
};

export default function Sidebar() {
  const [user, setUser] = React.useState<UserModel>();
  const nav = useNavigate();
  const navToPage = (page: string) => {
    console.log(page);
    switch (page) {
      case "myWords":
        nav(`/myWords/${user?.id}`);
        break;
      case "settings":
        nav(`/settings/${user?.id}`);
        break;
      // case "mission":
      //   nav(`/update/missions/${user?.id}`);
      //   break;
      // case "weights":
      //   nav(`/update/weight/${user?.id}`);
      //   break;
      // case "program":
      //   nav(`/update/program/${user?.id}`);
      //   break;
      // case "trainee":
      //   nav(`/update/newTrainee/${user?.id}`);
      //   break;
    }
  };

  React.useEffect(() => {
    setUser(store.getState().users.user[0]);
  }, [store.getState()]);
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100vh",
        width: "var(--Sidebar-width)",
        top: 0,
        // p:2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
        paddingBottom: 0,
        // p:0,
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </IconButton>
        <Typography level="title-lg">Lang-Pursuit</Typography>

        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>
      {user ? (
        <>
          <Input
            size="sm"
            startDecorator={<SearchRoundedIcon />}
            placeholder="Search"
          />
          <Box
            sx={{
              minHeight: 0,
              overflow: "hidden auto",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              [`& .${listItemButtonClasses.root}`]: {
                gap: 1.5,
              },
            }}
          >
            <List
              size="sm"
              sx={{
                gap: 1,
                "--List-nestedInsetStart": "30px",
                "--ListItem-radius": (theme) => theme.vars.radius.sm,
              }}
            >
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    nav("/");
                  }}
                >
                  <HomeRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Home</Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton
                  onClick={() => {
                    navToPage("myWords");
                  }}
                >
                  <DashboardRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">my words</Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton selected>
                  <ShoppingCartRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Orders</Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>

              <ListItem nested>
                <Toggler
                  renderToggle={({ open, setOpen }) => (
                    <ListItemButton onClick={() => setOpen(!open)}>
                      <AssignmentRoundedIcon />
                      <ListItemContent>
                        <Typography level="title-sm">פעולות</Typography>
                      </ListItemContent>
                      <KeyboardArrowDownIcon
                        sx={{ transform: open ? "rotate(180deg)" : "none" }}
                      />
                    </ListItemButton>
                  )}
                >
                  <List sx={{ gap: 0.5 }}>
                    <ListItem sx={{ mt: 0.5 }}>
                      <ListItemButton
                        onClick={() => {
                          navToPage("payments");
                        }}
                      >
                        עדכן תשלום
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton
                        onClick={() => {
                          navToPage("mission");
                        }}
                      >
                        עדכן משימות
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton
                        onClick={() => {
                          navToPage("weights");
                        }}
                      >
                        עדכן משקלים
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton
                        onClick={() => {
                          navToPage("program");
                        }}
                      >
                        עדכן תוכנית למתאמן
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton
                        onClick={() => {
                          navToPage("trainee");
                        }}
                      >
                        צרף מתאמן חדש
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Toggler>
              </ListItem>

              {/* <ListItem>
                <ListItemButton
                  role="menuitem"
                  component="a"
                  href="/joy-ui/getting-started/templates/messages/"
                >
                  <QuestionAnswerRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Messages</Typography>
                  </ListItemContent>
                  <Chip size="sm" color="primary" variant="solid">
                    4
                  </Chip>
                </ListItemButton>
              </ListItem> */}
            </List>

            <List
              size="sm"
              sx={{
                mt: "auto",
                flexGrow: 0,
                "--ListItem-radius": (theme) => theme.vars.radius.sm,
                "--List-gap": "8px",
                mb: 2,
              }}
            >
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    nav("info");
                  }}
                >
                  <SupportRoundedIcon />
                  about us!
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    navToPage("settings");
                  }}
                >
                  <SettingsRoundedIcon />
                  settings
                </ListItemButton>
              </ListItem>
            </List>

            <Divider />
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              <Avatar color="primary" variant="soft">
                {`${user.firstName[0]} ${user.lastName[0]}`}
              </Avatar>
              <Box
                sx={{
                  minWidth: 0,
                  flex: 1,
                }}
              >
                <Typography level="title-sm">{`${user.firstName} ${user.lastName}`}</Typography>
                {/* <Typography level="body-xs">siriwatk@test.com</Typography> */}
              </Box>
              <IconButton
                size="sm"
                // sx={{ marginTop: -2 }}
                variant="plain"
                color="neutral"
                onClick={() => {
                  logOut();
                }}
              >
                <LogoutRoundedIcon />
              </IconButton>
            </Box>
          </Box>
        </>
      ) : (
        <Button variant="solid" color="success">
          להתחברות
        </Button>
      )}
    </Sheet>
  );
}
