import theme from "../Theme";
import styled from "styled-components";
import { Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import { useState } from "react";
const Card = styled.div`
  display: flex;
  flex-direction: row;
  height: 60px;
  /* max-width: 290px; */
  width: 100%;
  border: ${(props) =>
    props.selected ? `1px solid ${theme.palette.primary.main}` : null};
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 6px 30px rgba(30, 61, 83, 0.08);
  border-radius: 12px;
  padding-left: ${theme.spacing(3)};
  padding-right: ${theme.spacing(2)};
`;
const ColumnDiv = styled.div`
  display: flex;
  max-width: 150px;
  width: 100%;
  flex-direction: column;
  gap: ${theme.spacing(2)};
`;

const CreditPackCard = ({
  image,
  price,
  credits,
  details,
  value,
  selectedCreditPack,
  setSelectedCreditPack,
}) => {
  return (
    <Card
      onClick={() => {
        setSelectedCreditPack(value);
      }}
      selected={selectedCreditPack === value}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "72%",
          justifyContent: "space-between",
        }}
      >
        {image}

        <ColumnDiv>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography
              style={{
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "19.73px",
                color: "#000000",
              }}
            >
              ${price}
            </Typography>
            <Typography
              style={{
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "14.8px",
                color: "#000000",
              }}
            >
              / {credits} credits
            </Typography>
          </div>
          <Typography
            style={{
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "17.26px",
              color: theme.palette.text.secondary,
            }}
          >
            (${details}/experience)
          </Typography>
        </ColumnDiv>
      </div>

      <Radio checked={selectedCreditPack === value} value={value} />
    </Card>
  );
};

export default CreditPackCard;
