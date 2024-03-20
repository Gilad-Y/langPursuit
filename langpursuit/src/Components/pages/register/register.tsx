import "./register.css";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { UserModel } from "../../../models/userModel";
import axios from "axios";
import store from "../../../redux/store";
import { logInUser } from "../../../redux/usersReducer";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
interface props {
  addStep: () => void;
  sendUserInfo: (user: any) => void;
}
function Register(props: props): JSX.Element {
  const nav = useNavigate();
  const [alert, setAlert] = React.useState<any>(undefined);
  const[emailFree,setEmail]=React.useState<boolean|undefined>(undefined)
  const[phoneFree,setPhone]=React.useState<boolean|undefined>(undefined)
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<UserModel | any>();
  const popAlert = (alertToAdd: any) => {
    if (alert == undefined) {
      setAlert(alertToAdd);
      setTimeout(() => {
        popAlert(undefined);
      }, 5000);
    }
  };
  const checkinfo = (data: UserModel | any) => {
    const password = data._userPass;
    const confirmPassword = data.confirmPassword;
    if (password.length < 6) {
      popAlert({
        content: "Password must be at least 6 characters long.",
        color: "warning",
      });
      return;
    }
    // Validate password match
    if (password !== confirmPassword) {
      popAlert({ content: "Passwords do not match.", color: "warning" });
      return;
    }
     const queryParams = `?phone=${+data.phone}&email=${encodeURIComponent(data.email)}`;
  axios
    .get(`http://localhost:4000/api/v1/user/checkPhoneNumberAndEmail${queryParams}`)
    .then((res) => {
      console.log(res.data)
      setEmail(res.data.email)
      setPhone(res.data.phone)
      if (password === confirmPassword && password.length >= 6 && res.data.phone && res.data.email) {
        createNewUser(data)
      }
    })
    .catch((error) => {
      // Handle errors
    });
  };
  const createNewUser=(data:UserModel)=>{
 props.sendUserInfo({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        _userPass: data._userPass,
      });
      
      props.addStep();
  }

  return (
    <div className="register">
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {alert !== undefined && (
            <Alert variant="filled" color={alert.color}>
              {alert.content}
            </Alert>
          )}
          <br />
          <form onSubmit={handleSubmit(checkinfo)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstName", { required: true })}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={!!errors.firstName}
                  helperText={errors.firstName ? "Required" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastName", { required: true })}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={!!errors.lastName}
                  helperText={errors.lastName ? "Required" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email", { required: true })}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={(emailFree!==undefined)&&(!emailFree)||!!errors.email}
                  helperText={errors.email ? "Required" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("phone", { required: true })}
                  required
                  fullWidth
                  id="phone"
                  label="Phone number"
                  name="phone"
                  autoComplete="tel"
                  error={(phoneFree!==undefined)&&(!phoneFree)||!!errors.phone}
                  helperText={errors.phone ? "Required" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("_userPass", { required: true })}
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!errors._userPass}
                  helperText={errors._userPass ? "Required" : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("confirmPassword", { required: true })}
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword ? "Required" : ""}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </div>
  );
}

export default Register;
