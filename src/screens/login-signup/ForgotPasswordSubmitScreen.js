import React, { Component } from "react";
import Logo1 from "../../assets/svgs/LndMark_logo.svg";
import QuestionMarkSharpIcon from "@mui/icons-material/QuestionMarkSharp";
import { ReactComponent as PasswordIcon } from "../../assets/svgs/passwordIcon.svg";
import { ReactComponent as EmailIcon } from "../../assets/svgs/emailIcon.svg";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  Typography,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import theme from "../../Theme";
import { Formik } from "formik";
import * as yup from "yup";
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
  iconStyle,
  textFieldLabelStyle,
  StyledTextField,
  LinkStyle,
  squareButtonIconStyle,
  solidButtonStyle,
} from "../../components/StyledComponents";
// import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SquareButton from "../../components/SquareButton";
import { resetPassword } from "../../API/authApi";

const ReviewSchema = yup.object({
  Email: yup.string().email().required("Please Enter Email"),
  Code: yup.number().required(),
  NewPassword: yup.string().required("Password error"),
});
const ForgotPasswordSubmitScreen = () => {
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
          Reset Your Password?
        </Typography>
        <Typography style={headingStyleSecondary}>
          Enter verification code along with new password.
        </Typography>
      </ColumnContainer>
      <CustomCard>
        <Formik
          validationSchema={ReviewSchema}
          initialValues={{
            Email: "",
            Code: "",
            NewPassword: "",
          }}
          onSubmit={async (values, { resetForm }) => {
            // console.log("OnSubmit click", values);
            try {
              const passwordChanged = await resetPassword(
                values.Email,
                `${values.Code}`.padStart(5, "0"),
                values.NewPassword
              );
              if (passwordChanged) {
                setSnackBarMessage("Success");
                setOpenSnackBar(true);
                setSeverity("success");
                resetForm();
                navigate("/");
              }

              // await Auth.forgotPasswordSubmit(
              //   values.Email,
              //   `${values.Code}`,
              //   values.NewPassword
              // );
            } catch (error) {
              setSnackBarMessage("Error");
              setOpenSnackBar(true);
              setSeverity("error");
              console.log("error confirming sign up", error);
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
              <ColumnContainer>
                <RowContainer>
                  <VerifiedUserIcon style={iconStyle} />
                  <Typography style={textFieldLabelStyle}>
                    Verification Code
                  </Typography>
                </RowContainer>
                <StyledTextField
                  onChange={props.handleChange("Code")}
                  value={props.values.Code}
                  size="medium"
                  variant="outlined"
                  type={"number"}
                />
                {props.errors.Code && props.touched.Code ? (
                  <Error>{props.errors.Code}</Error>
                ) : null}
              </ColumnContainer>
              <ColumnContainer>
                <RowContainer>
                  <PasswordIcon />
                  <Typography style={textFieldLabelStyle}>
                    New Password
                  </Typography>
                </RowContainer>
                <StyledTextField
                  onChange={props.handleChange("NewPassword")}
                  value={props.values.NewPassword}
                  type={"password"}
                  size="medium"
                  variant="outlined"
                />

                {props.errors.NewPassword && props.touched.NewPassword ? (
                  <Error>{props.errors.NewPassword}</Error>
                ) : null}
              </ColumnContainer>
              {!props.isSubmitting ? (
                <Button
                  onClick={props.handleSubmit}
                  style={solidButtonStyle}
                  variant="contained"
                >
                  Submit
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
export default ForgotPasswordSubmitScreen;
