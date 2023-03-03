import theme from "../../Theme";
import { ReactComponent as CardType } from "../../assets/svgs/cardType.svg";
import { ReactComponent as CalenderIcon } from "../../assets/svgs/calendarIcon.svg";
import { ReactComponent as ProfileCircle } from "../../assets/svgs/profileCircleIcon.svg";
import { ReactComponent as CreditCardIcon } from "../../assets/svgs/creditCardIcon.svg";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import styled from "styled-components";
import Select from "@mui/material/Select";
import { PatternFormat } from "react-number-format";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import {
  headingStylePrimary,
  RowContainer,
  solidButtonStyle,
  StyledTextField,
} from "../../components/StyledComponents";
import { Button, MenuItem, Typography } from "@mui/material";
import ToggleSwitch from "../../components/AntSwitch";
import { useState } from "react";

const textFieldLabelStyle = {
  fontWeight: 400,
  fontSize: "15px",
  lineHeight: "19.73px",
  color: "#656565",
};
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
`;

const CardPaymentComponent = () => {
  const [age, setAge] = useState("");
  const [value, setValue] = useState(dayjs("04-2022"));
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleDateChange = (newValue) => {
    setValue(newValue);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: theme.spacing(4),
      }}
    >
      <Typography
        style={{
          ...headingStylePrimary,
          lineHeight: "24.66px",
          color: "#000000",
          textAlign: "left",
        }}
      >
        Card Details
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          borderRadius: "14px",
          boxShadow: "0px 6px 30px rgba(30, 61, 83, 0.08)",
          padding: theme.spacing(4),
          gap: theme.spacing(4),
        }}
      >
        <ColumnContainer>
          <RowContainer>
            <CardType />
            <Typography style={textFieldLabelStyle}>Card Type</Typography>
          </RowContainer>
          <Select
            IconComponent={ExpandMoreRoundedIcon}
            sx={{
              borderRadius: "14px",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.secondary.main,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: `2px solid ${theme.palette.secondary.main}`,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: `${theme.palette.secondary.main}`,
              },
              ".MuiSvgIcon-root ": {},
            }}
            value={age}
            onChange={handleChange}
          >
            <MenuItem value={10}>Visa Express</MenuItem>
          </Select>

          {/* {props.errors.UserName && props.touched.UserName ? (
                  <Error>{props.errors.UserName}</Error>
                ) : null} */}
        </ColumnContainer>
        <ColumnContainer>
          <RowContainer>
            <CreditCardIcon
              style={{
                width: "20px",
                height: "20px",
              }}
            />
            <Typography style={textFieldLabelStyle}>Card Number</Typography>
          </RowContainer>
          <PatternFormat
            // value={}
            format="#### #### #### ####"
            customInput={StyledTextField}
          />
          {/* {props.errors.UserName && props.touched.UserName ? (
                  <Error>{props.errors.UserName}</Error>
                ) : null} */}
        </ColumnContainer>{" "}
        <ColumnContainer>
          <RowContainer>
            <ProfileCircle />
            <Typography style={textFieldLabelStyle}>Name on Card</Typography>
          </RowContainer>
          <StyledTextField
            //   onChange={props.handleChange("UserName")}
            //   value={props.values.UserName}
            size="medium"
            variant="outlined"
          />
          {/* {props.errors.UserName && props.touched.UserName ? (
                  <Error>{props.errors.UserName}</Error>
                ) : null} */}
        </ColumnContainer>{" "}
        <ColumnContainer>
          <RowContainer>
            <CalenderIcon />
            <Typography style={textFieldLabelStyle}>Expiry Date</Typography>
          </RowContainer>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              views={["month", "year"]}
              value={value}
              onChange={handleDateChange}
              renderInput={(params) => <StyledTextField {...params} />}
            />
          </LocalizationProvider>
          {/* {props.errors.UserName && props.touched.UserName ? (
                  <Error>{props.errors.UserName}</Error>
                ) : null} */}
        </ColumnContainer>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          style={{
            fontSize: "14px",
            lineHeight: "17.26px",
            color: "#000000",
            fontWeight: 500,
          }}
        >
          Save my card details
        </Typography>
        <ToggleSwitch />
      </div>
      <Button
        onClick={() => {
          console.log("month , year : ", value, value.y);
        }}
        variant="contained"
        style={solidButtonStyle}
      >
        Purchase
      </Button>
    </div>
  );
};

export default CardPaymentComponent;
