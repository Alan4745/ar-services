import React, { Component, useState } from "react";
import styled from "styled-components";
import "@fontsource/lato";
import "@fontsource/catamaran";
import theme from "../Theme";

const Container = styled.div`
  display: flex;
  background-color: ${(props) =>
    props.clicked ? "#0099f1" : "rgba(0, 136, 223, 0.1)"};
  border-radius: 8px;
  width: fit-content;
  height: 30px;
  padding-inline: ${theme.spacing(3)};
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color: ${(props) => (props.clicked ? "white" : "#0099f1")};
  /* font-family: "Poppins"; */
  cursor: pointer;
`;
const ExperienceCategoryButton = ({ categoryName, style }) => {
  const [clicked, setIsClicked] = useState(false);
  return (
    <Container
      style={style}
      onClick={() => {
        setIsClicked((prev) => !prev);
      }}
      clicked={clicked}
    >
      {categoryName}
    </Container>
  );
};

export default ExperienceCategoryButton;
