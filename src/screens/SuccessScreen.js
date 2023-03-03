import {
  Background,
  ColumnContainer,
  CustomCard,
  headingStylePrimary,
  headingStyleSecondary,
  LinkStyle,
  Logo,
  LogoHeader,
  solidButtonStyle,
  squareButtonIconStyle,
} from "../components/StyledComponents";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MailIcon from "@mui/icons-material/Mail";
import Logo1 from "../assets/svgs/LndMark_logo.svg";
import SquareButton from "../components/SquareButton";
import QuestionMarkSharpIcon from "@mui/icons-material/QuestionMarkSharp";
import { useNavigate } from "react-router-dom";
import { ReactComponent as EmailBigIcon } from "../assets/svgs/emailBig.svg";

import theme from "../Theme";
import {
  Alert,
  Badge,
  Button,
  Link,
  Snackbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const SuccessScreen = () => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const navigate = useNavigate();

  useEffect(() => {
    const showSuccessScreen = sessionStorage.getItem("showSuccessScreen");
    if (!showSuccessScreen) navigate("/");
  }, []);
  return (
    <Background
      style={{
        gap: theme.spacing(5),
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
        <Typography style={headingStylePrimary}>Email has been sent</Typography>
        <Typography style={{ ...headingStyleSecondary, width: "310px" }}>
          Please check your email to verify your email address.
        </Typography>
      </ColumnContainer>
      <CustomCard
        style={{
          height: "100%",
          maxHeight: "380px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Badge
          style={{
            width: "fit-content",
          }}
          overlap="circular"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          badgeContent={
            <CheckCircleIcon
              style={{
                height: "40px",
                width: "40px",
                color: "#30CA6E",
                borderRadius: "100px",
                backgroundColor: "white",
              }}
            />
          }
        >
          <MailIcon
            style={{
              ...theme.achievement_icon_style,
              height: "120px",
              width: "120px",
              padding: "28px",
            }}
          />
        </Badge>
        <Typography
          style={{
            ...headingStylePrimary,
            color: "#30CA6E",
          }}
        >
          Successfully Sent!
        </Typography>
        <Typography style={{ ...headingStyleSecondary, width: "310px" }}>
          Click on the link sent to your email address to verify and login to
          your account.
        </Typography>
        {/* <Button
          onClick={() => {
            navigate("/");

            // : type==='confirmSignUp'?  navigate(`/${type}`);
          }}
          variant="contained"
          style={solidButtonStyle}
        >
          "Login"
        </Button> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            textAlign: "center",
            gap: theme.spacing(2),
          }}
        >
          Didn't receieve code?
          <Link
            style={LinkStyle}
            onClick={async () => {
              // console.log("Resend verification code clicked");
              // if (username) {
              //   try {
              //     await Auth.resendSignUp(username);
              //     console.log("code resent successfully");
              //   } catch (err) {
              //     console.log("error resending code: ", err);
              //   }
              // } else {
              //   setSnackBarMessage("Error. Enter username please.");
              //   setOpenSnackBar(true);
              //   setSeverity("error");
              // }
            }}
            // underline="none"
          >
            {"Resend."}
          </Link>
        </div>
      </CustomCard>
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
    </Background>
  );
};
export default SuccessScreen;
