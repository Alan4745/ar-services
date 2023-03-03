// import React, { Component } from "react";
import Logo1 from "../../assets/svgs/LndMark_logo.svg";
import { ReactComponent as ProfileIcon } from "../../assets/svgs/profileIcon.svg";
import { ReactComponent as PasswordIcon } from "../../assets/svgs/passwordIcon.svg";
import { ReactComponent as EmailIcon } from "../../assets/svgs/emailIcon.svg";
import {
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import theme from "../../Theme";
import {
  ColumnContainer,
  Error,
  CustomCard,
  LinkStyle,
  Logo,
  LogoHeader,
  Background,
  RowContainer,
  headingStylePrimary,
  headingStyleSecondary,
  squareButtonIconStyle,
  StyledTextField,
  textFieldLabelStyle,
  solidButtonStyle,
} from "../../components/StyledComponents";
import { Formik } from "formik";
import * as yup from "yup";
// import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import QuestionMarkSharpIcon from "@mui/icons-material/QuestionMarkSharp";
import SquareButton from "../../components/SquareButton";
import { signupUser } from "../../API/authApi";

const ReviewSchema = yup.object({
  UserName: yup.string().required("Please Enter Username"),
  Email: yup.string().email().required("Please enter a valid email"),
  Password: yup.string().required("Password error"),
  PasswordConfirmation: yup
    .string()
    .oneOf([yup.ref("Password"), null], "Passwords must match"),
});

const SignUpScreen = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  let navigate = useNavigate();
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
          Create Your Account For FREE!
        </Typography>
        <Typography style={headingStyleSecondary}>
          Enter your information below to get signed up.
        </Typography>
      </ColumnContainer>
      <CustomCard>
        <Formik
          validationSchema={ReviewSchema}
          initialValues={{
            UserName: "",
            Email: "",
            Password: "",
            PasswordConfirmation: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              const user = await signupUser(
                values.Email,
                values.Password,
                values.UserName
              );

              // const { user } = await Auth.signUp({
              //   username: values.UserName,
              //   password: values.PasswordConfirmation,
              //   attributes: {
              //     email: values.Email, // optional
              //   },
              // });
              if (user) {
                sessionStorage.setItem("showSuccessScreen", true);
                setSnackBarMessage("Success");
                setOpenSnackBar(true);
                setSeverity("success");
                console.log("sign up screen: ", user);
                resetForm();
                navigate("/success");
              }
            } catch (error) {
              setSnackBarMessage("Error");
              setOpenSnackBar(true);
              setSeverity("error");
              console.log("error signing up:", error);
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
                  <EmailIcon />
                  <Typography style={textFieldLabelStyle}>Email</Typography>
                </RowContainer>
                <StyledTextField
                  onChange={props.handleChange("Email")}
                  value={props.values.Email}
                  size="medium"
                  variant="outlined"
                />
                {props.errors.Email && props.touched.Email ? (
                  <Error>{props.errors.Email}</Error>
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

              <ColumnContainer>
                <RowContainer>
                  <PasswordIcon />
                  <Typography style={textFieldLabelStyle}>
                    Confirm Password
                  </Typography>
                </RowContainer>
                <StyledTextField
                  onChange={props.handleChange("PasswordConfirmation")}
                  value={props.values.PasswordConfirmation}
                  type={"password"}
                  size="medium"
                  variant="outlined"
                />

                {props.errors.PasswordConfirmation &&
                props.touched.PasswordConfirmation ? (
                  <Error>{props.errors.PasswordConfirmation}</Error>
                ) : null}
              </ColumnContainer>

              {!props.isSubmitting ? (
                <Button
                  onClick={props.handleSubmit}
                  style={solidButtonStyle}
                  variant="contained"
                >
                  Create an Account
                </Button>
              ) : (
                <CircularProgress
                  sx={{ alignSelf: "center", margin: "10px" }}
                />
              )}
            </>
          )}
        </Formik>
      </CustomCard>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography style={headingStyleSecondary}>
          By creating an account, you agree to our
        </Typography>
        <Link style={LinkStyle} href="#">
          {"Terms & Privacy Policy"}
        </Link>
      </div>

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
        Already have an account?{" "}
        <Link style={{ ...LinkStyle, fontWeight: "700" }} href="/">
          {"Log In"}
        </Link>
      </Typography>
    </Background>
  );
};
export default SignUpScreen;
