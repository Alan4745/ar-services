import React, { Component } from "react";
import Logo1 from "../../assets/svgs/LndMark_logo.svg";
import { ReactComponent as ProfileIcon } from "../../assets/svgs/profileIcon.svg";
import { ReactComponent as PasswordIcon } from "../../assets/svgs/passwordIcon.svg";
import {
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import Button from "@mui/material/Button";
import theme from "../../Theme";
import { Formik } from "formik";
import QuestionMarkSharpIcon from "@mui/icons-material/QuestionMarkSharp";
import * as yup from "yup";
import {
  Error,
  Logo,
  LogoHeader,
  ColumnContainer,
  headingStylePrimary,
  headingStyleSecondary,
  CustomCard,
  RowContainer,
  textFieldLabelStyle,
  StyledTextField,
  LinkStyle,
  squareButtonIconStyle,
  Background,
  solidButtonStyle,
} from "../../components/StyledComponents";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SquareButton from "../../components/SquareButton";
import SocialMediaButton from "../../components/SocialMediaButton";
import { loginUser } from "../../API/authApi";

const SignInScreen = ({ setIsLoggedIn }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const navigate = useNavigate();

  const ReviewSchema = yup.object({
    UserName: yup.string().required("Please enter your username"),
    Password: yup.string().required("Password error"),
  });
  return (
    <Background
      style={{
        justifyContent: "space-evenly",
        padding: 0,
        gap: 0,
      }}
    >
      <LogoHeader>
        <div
          style={{
            height: "30px",
            width: "30px",
          }}
        ></div>
        <Logo src={Logo1} />
        <SquareButton>
          <QuestionMarkSharpIcon style={squareButtonIconStyle} />
        </SquareButton>
      </LogoHeader>
      <ColumnContainer
        style={{
          gap: theme.spacing(3),
        }}
      >
        <Typography style={headingStylePrimary}>
          Login to Your Account
        </Typography>
        <Typography style={headingStyleSecondary}>
          Enter your username and password to login
        </Typography>
      </ColumnContainer>
      <CustomCard>
        <Formik
          validationSchema={ReviewSchema}
          initialValues={{
            UserName: "",
            Password: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              const user = await loginUser(values.UserName, values.Password);
              if (user) {
                localStorage.setItem("userJwt", user.token);
                localStorage.setItem("username", user.userName);
                localStorage.setItem("userCredits", user.credits);
                setIsLoggedIn(true);
                setSnackBarMessage("Success");
                setOpenSnackBar(true);
                setSeverity("success");
                resetForm();
                navigate("/welcome");
              }
            } catch (error) {
              setSnackBarMessage("Error");
              setOpenSnackBar(true);
              setSeverity("error");
              console.log("error signing in", error);
            } finally {
              setSeverity("info");
            }
          }}
        >
          {(props) => (
            <>
              <ColumnContainer>
                <RowContainer>
                  <ProfileIcon />
                  <Typography style={textFieldLabelStyle}>Username</Typography>
                </RowContainer>
                <StyledTextField
                  onChange={props.handleChange("UserName")}
                  value={props.values.UserName}
                  size="medium"
                  variant="outlined"
                />
                {props.errors.UserName && props.touched.UserName ? (
                  <Error>{props.errors.UserName}</Error>
                ) : null}
              </ColumnContainer>
              <ColumnContainer>
                <RowContainer>
                  <PasswordIcon />
                  <Typography style={textFieldLabelStyle}>Password</Typography>
                </RowContainer>
                <StyledTextField
                  onChange={props.handleChange("Password")}
                  value={props.values.Password}
                  type={"password"}
                  size="medium"
                  variant="outlined"
                />

                {props.errors.Password && props.touched.Password ? (
                  <Error>{props.errors.Password}</Error>
                ) : null}
              </ColumnContainer>

              {!props.isSubmitting ? (
                <Button
                  onClick={props.handleSubmit}
                  style={solidButtonStyle}
                  variant="contained"
                >
                  Login
                </Button>
              ) : (
                <CircularProgress
                  sx={{ alignSelf: "center", margin: "10px" }}
                />
              )}
            </>
          )}
        </Formik>

        <Link style={LinkStyle} href="/forgotpassword">
          {"Forgot Your Password?"}
        </Link>
      </CustomCard>
      <Typography style={headingStyleSecondary}>or login with</Typography>
      <RowContainer
        style={{
          gap: theme.spacing(4),
        }}
      >
        <SocialMediaButton type={"facebook"} />
        <SocialMediaButton />
        <SocialMediaButton type={"google"} />
      </RowContainer>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={4000}
        message={snackBarMessage}
        onClose={() => setOpenSnackBar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackBar(false)}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackBarMessage}
        </Alert>
      </Snackbar>
      <Typography
        style={{
          fontSize: "16px",
          lineHeight: "19.79px",
        }}
      >
        Don’t have an account?{" "}
        <Link style={{ ...LinkStyle, fontWeight: "700" }} href="/signup">
          {"Sign Up"}
        </Link>
      </Typography>
    </Background>
  );
};
export default SignInScreen;
