import React, { Component } from "react";
import styled from "styled-components";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import longImg from "../assets/images/dummy-card-imgs/largeImg.png";
import { useState } from "react";
import { Typography } from "@mui/material";
import { headingStylePrimary, headingStyleSecondary } from "./StyledComponents";
import theme from "../Theme";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  min-width: 350px;
  max-width: 350px;
  width: 350px;
  height: 200px;
  box-shadow: -1px 8px 6px -3px rgba(0, 0, 0, 0.26);
  margin: 10px;
`;

const ImgDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 160px;
  min-width: 350px;
  max-width: 350px;
  border-radius: 14px;
  background-image: url(${longImg});
  background-repeat: no-repeat;
  justify-content: space-between;
  object-fit: cover;
  color: white;
  padding: ${theme.spacing(4)};
`;

const ExperienceCard = ({
  experienceName,
  experienceCategory,
  experienceImage,
}) => {
  const [redHeart, setRedHeart] = useState("white");

  const handleHeartClick = () => {
    redHeart === "white" ? setRedHeart("red") : setRedHeart("white");
  };
  return (
    <ContentContainer>
      <ImgDiv>
        <FavoriteIcon
          style={{
            color: redHeart,
            cursor: "pointer",
          }}
          onClick={handleHeartClick}
        />
        <ShareRoundedIcon />
      </ImgDiv>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "40px",
          width: "100%",
          minWidth: "350px",
          maxWidth: "350px",
          alignItems: "center",
          justifyContent: "space-between",
          padding: theme.spacing(4),
        }}
      >
        <Typography
          style={{ fontWeight: "600", fontSize: "17px", color: "#00000" }}
        >
          {experienceName}
        </Typography>
        <Typography style={headingStyleSecondary}>
          {experienceCategory}
        </Typography>
      </div>
    </ContentContainer>
  );
};

export default ExperienceCard;
