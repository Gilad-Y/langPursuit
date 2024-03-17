import { Step, StepIndicator, Stepper } from "@mui/joy";
import "./addAccount.css";
import { Box, Container } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { useState } from "react";
import { Check } from "@mui/icons-material";
import Register from "../register";
import { UserModel } from "../../../../models/userModel";
import SelectLang from "../selectLang/selectLang";
function AddAccount(): JSX.Element {
  const [activeStep, setStep] = useState<number>(1);
  const [user, setUser] = useState<UserModel>();
  const addToStep = () => {
    setStep(activeStep + 1);
  };
  const remToStep = () => {
    setStep(activeStep - 1);
  };
  const getUserInfo = (data: UserModel) => {
    console.log(data);
  };
  const getLangInfo = (lang: String[]) => {
    console.log(lang);
  };
  return (
    <div className="addAccount">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stepper
            sx={{
              "--Step-connectorThickness": "4px",
              "--StepIndicator-size": "38px",
              color: "black",
              width: "100%",
            }}
          >
            <Step
              sx={{
                "&::after": {
                  ...(activeStep > 1 && { bgcolor: "primary.solidBg" }),
                },
              }}
              indicator={
                <StepIndicator
                  variant="solid"
                  color={activeStep <= 1 ? "primary" : "success"}
                >
                  {activeStep <= 1 ? <ChecklistIcon /> : <Check />}
                </StepIndicator>
              }
            >
              information
            </Step>
            <Step
              indicator={
                <StepIndicator variant="solid" color="primary">
                  <TranslateIcon />
                </StepIndicator>
              }
            >
              pick languages
            </Step>
          </Stepper>
          {activeStep == 1 && (
            <Register addStep={addToStep} sendUserInfo={getUserInfo} />
          )}
          {activeStep == 2 && (
            <SelectLang
              addStep={addToStep}
              removeToStep={remToStep}
              sendLangInfo={getLangInfo}
            />
          )}
        </Box>
      </Container>
    </div>
  );
}

export default AddAccount;
