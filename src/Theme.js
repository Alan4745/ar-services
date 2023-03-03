import React, { Component } from "react";
import { createTheme } from "@mui/material/styles";
import "@fontsource/lato";
import "@fontsource/prompt";
import "@fontsource/varela-round";
import "@fontsource/secular-one";
import "@fontsource/archivo-black";
import "@fontsource/catamaran";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#0088DF",
      dark: "#005D9E",
    },
    secondary: {
      main: "#DCECF6",
    },
    text: {
      primary: "#000000",
      secondary: "#8EA2AF",
      light_blue: "#0088DF",
    },
  },

  spacing: [0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],

  achievement_icon_style: {
    color: "#0088DF",
    backgroundColor: "#E0F1F8",
    borderRadius: "100%",
    fontSize: "60px",
    padding: "12px",
  },
  Submit_Button_blue: {
    backgroundColor: "#0099F1",
    color: "white",
    width: "45%",
    // fontFamily: "Poppins",
    fontSize: 17,
    fontWeight: 100,
    textTransform: "none",
    borderRadius: 3,
    letterSpacing: 0,
  },
  Submit_Button_gray: {
    backgroundColor: "#AEB0B6",
    color: "white",
    width: "45%",
    // fontFamily: "Poppins",
    fontSize: 17,
    fontWeight: 100,
    textTransform: "none",
    borderRadius: 3,
    letterSpacing: 0,
  },
  login_Button: {
    color: "white",
    backgroundColor: "#0099F1",
    width: "80%",
    // fontFamily: "Poppins",
    fontSize: 18,
    textTransform: "none",
    borderRadius: 2,
    marginTop: 20,
    letterSpacing: 0,
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    more_under_heading: {
      color: "#9DA7C0",
      fontWeight: 500,
      fontSize: 19,
    },
    more_option_text: {
      color: "#00000",
      fontSize: 16,
      fontWeight: 600,
    },
    long_card_name: {
      // fontFamily: "Lato",
      fontWeight: 800,
      fontSize: 18,
      color: "#0C143D",
    },
    long_card_category: {
      // fontFamily: "Lato",
      // fontWeight: 100,
      fontSize: 20,
      color: "white",
    },
    screen_heading: {
      // fontFamily: "Poppins",
      fontSize: 35,
      fontWeight: 200,
      color: "#0C143D",
    },

    clicktext_lower_blue: {
      // fontFamily: "Poppins",
      fontSize: 14,
      fontWeight: 600,
      color: "#005D9E",
    },
  },
});

export default theme;
