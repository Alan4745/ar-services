import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import theme from "../Theme";
import {
  groupElements,
  headingStyleSecondary,
  solidButtonStyle,
} from "./StyledComponents";
import Avatar from "@mui/material/Avatar";

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
const HistoryCard = ({ data }) => {
  return (
    <ContentContainer>
      <ImageNameContainer>
        <img
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "10px",
          }}
          src={data.image}
          alt=""
        />
        <div
          style={{
            ...groupElements,
            gap: theme.spacing(2),
            alignItems: "flex-start",
          }}
        >
          <Typography variant="more_option_text">
            {data.LandMark_Name}
          </Typography>
          <Typography style={headingStyleSecondary}>{data.Category}</Typography>
        </div>
      </ImageNameContainer>
      {data.Distance ? (
        <Typography
          style={{
            ...headingStyleSecondary,
            fontWeight: "600",
            color: theme.palette.primary.main,
          }}
        >
          {data.Distance}
        </Typography>
      ) : null}
    </ContentContainer>
  );
};

export default HistoryCard;
