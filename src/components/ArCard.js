import { Typography } from "@mui/material";
import React from "react";
import { Navigate, redirect, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import theme from "../Theme";
import { groupElements, headingStyleSecondary } from "./StyledComponents";

const ContentContainer = styled.div`
  flex-direction: row;
  border-radius: 14px;
  box-shadow: 0px 6px 30px rgba(30, 61, 83, 0.08);
  justify-content: space-between;
  align-items: center;
  padding-left: ${theme.spacing(3)};
  padding-right: ${theme.spacing(4)};
  width: 100%;
  height: 70px;
  display: flex;
`;

const ImageNameContainer = styled.div`
  flex-direction: row;
  gap: ${theme.spacing(4)};
  display: flex;
  align-items: center;
`;

function ArCard({ data }) {
  const navigate = useNavigate();
  return (
    <ContentContainer>
      <ImageNameContainer>
        {/* <img
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "10px",
          }}
          src={data.image}
          alt=""
        /> */}
        <div
          style={{
            ...groupElements,
            gap: theme.spacing(2),
            alignItems: "flex-start",
          }}
        >
          <Typography variant="more_option_text">{data.nameAr}</Typography>
          {/* <Typography style={headingStyleSecondary}>{data.Category}</Typography> */}
        </div>
      </ImageNameContainer>
      {/* {data.Distance ? (
        <Typography
          style={{
            ...headingStyleSecondary,
            fontWeight: "600",
            color: theme.palette.primary.main,
          }}
        >
          {data.Distance}
        </Typography>
      ) : null} */}
      <button
        onClick={() => {
          // console.log(data._id);
          // return redirect(`/test/:${data._id}`);

          navigate(`/test/${data._id}`);
        }}
      >
        {" "}
        Redicionar
      </button>
    </ContentContainer>
  );
}

export default ArCard;
