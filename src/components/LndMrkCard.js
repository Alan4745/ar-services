import * as React from "react";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import theme from "../Theme";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import { ReactComponent as InfoCircle2 } from "../assets/svgs/info-circle2.svg";
import { ReactComponent as ArrowRight } from "../assets/svgs/arrow-right.svg";

const TypoRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ImageDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-image: ${(props) => `url(${props.image})`};
  background-size: contain;
  background-repeat: no-repeat;
  box-shadow: ${(props) =>
    props.modalOpen ? "inset 0 200px 0 0 rgba(0, 0, 0, 0.4)" : null};
  width: 100%;
  max-height: 145px;
  height: 100%;
  gap: ${theme.spacing(4)};
  /* @media (max-height: 700px) {
    height: 90px;
  } */
  border-radius: 10px;
  /* margin: 10px; */
  /* justify-content: space-between; */
  padding: ${theme.spacing(3)};
`;

const cardHeading = {
  fontSize: 16,
  lineHeight: "19.73px",
  fontWeight: 600,
  color: "#000000",
};
const cardCategory = {
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.text.secondary,
  lineHeight: "17.26px",
};
const cardDistance = {
  fontSize: 14,
  fontWeight: 600,
  color: theme.palette.text.light_blue,
  lineHeight: "17.26px",
};

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LndMrkCard = ({ name, category, distance, image, link, id }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [redHeart, setRedHeart] = useState("white");

  const handleModal = () => setModalOpen((prev) => !prev);
  const handleHeartClick = () => {
    redHeart === "white" ? setRedHeart("red") : setRedHeart("white");
  };
  return (
    <div
      id={id}
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: "160px",
        maxWidth: "160px",
        maxHeight: "210px",
        height: "100%",
        borderRadius: "14px",
        boxShadow: "0px 6px 30px rgba(30, 61, 83, 0.08)",
        alignItems: "center",
        gap: theme.spacing(3),
        cursor: "pointer",
        backgroundColor: "white",
      }}
    >
      <ImageDiv
        modalOpen={modalOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleModal();
          }
        }}
        image={image}
      >
        <RowDiv>
          <FavoriteIcon sx={{ color: redHeart }} onClick={handleHeartClick} />
          <ShareRoundedIcon
            sx={{ color: "white" }}
            onClick={() => {
              console.log("Share clicked");
            }}
          />
        </RowDiv>
        <Zoom in={modalOpen}>
          <RowDiv
            style={{
              justifyContent: "space-around",
            }}
          >
            <Fab
              onClick={() => (window.location.href = link)}
              style={{
                backgroundColor: "#FFFFFF",
                height: "61px",
                width: "61px",
              }}
            >
              <ArrowRight />
            </Fab>
            <Fab
              style={{
                backgroundColor: "#FFFFFF",
                height: "61px",
                width: "61px",
              }}
            >
              <InfoCircle2 />
            </Fab>
          </RowDiv>
        </Zoom>
      </ImageDiv>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          gap: theme.spacing(3),
        }}
        onClick={handleModal}
      >
        <Typography style={cardHeading}>{name}</Typography>
        <TypoRowDiv>
          <Typography style={cardCategory}>{category}</Typography>
          <Typography style={cardDistance}>{distance}</Typography>
        </TypoRowDiv>
      </div>
    </div>
  );
};

export default LndMrkCard;
