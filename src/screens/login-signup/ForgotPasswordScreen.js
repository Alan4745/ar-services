import React, { Component } from "react";
import { ReactComponent as EmailIcon } from "../../assets/svgs/emailIcon.svg";
import QuestionMarkSharpIcon from "@mui/icons-material/QuestionMarkSharp";
import Logo1 from "../../assets/svgs/LndMark_logo.svg";
import {
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Link,
} from "@mui/material";
import Button from "@mui/material/Button";
import theme from "../../Theme";
import { useState } from "react";
import {
  Logo,
  Error,
  Background,
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
  solidButtonStyle,
  outlinedButtonStyle,
} from "../../components/StyledComponents";
// import { Auth } from "aws-amplify";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import SquareButton from "../../components/SquareButton";
import { initiateResetPassword } from "../../API/authApi";

const ReviewSchema = yup.object({
  Email: yup.string().email().required("Please enter correct email"),
});
const ForgotPasswordScreen = () => {
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
          Forgot Your Password?
        </Typography>
        <Typography style={headingStyleSecondary}>
          Enter your email to reset your password.
        </Typography>
      </ColumnContainer>
      <CustomCard>
        <Formik
          validationSchema={ReviewSchema}
          initialValues={{
            Email: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            // console.log("OnSubmit click", values);
            try {
              const resetPassword = await initiateResetPassword(values.Email);

              // await Auth.forgotPassword(values.Email);
              // .then((data) => console.log(data))
              // .catch((err) => console.log(err));
              if (resetPassword) {
                setSnackBarMessage("Success");
                setOpenSnackBar(true);
                setSeverity("success");
                resetForm();
                navigate("/forgotpasswordsubmit");
              }
            } catch (error) {
              setSnackBarMessage("Error");
              setOpenSnackBar(true);
              setSeverity("error");
              console.log("Forgot Password error : ", error);
            } finally {
              setSeverity("info");
            }
          }}
        >
          {(props) => (
            <>
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
              {!props.isSubmitting ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <Button
                    onClick={props.handleSubmit}
                    style={solidButtonStyle}
                    variant="contained"
                  >
                    Submit
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/");
                    }}
                    style={{ ...outlinedButtonStyle, width: "100%" }}
                  >
                    Cancel
                  </Button>
                </div>
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
        <Typography style={headingStyleSecondary}>Read our</Typography>
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
export default ForgotPasswordScreen;
