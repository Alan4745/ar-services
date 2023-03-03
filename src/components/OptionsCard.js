import { Typography } from "@mui/material";
import styled from "styled-components";
import theme from "../Theme";
import { ReactComponent as ArrowCircle } from "../assets/svgs/arrow-circle-right.svg";

const ContentContainer = styled.div`
  flex-direction: row;
  border-radius: 14px;
  box-shadow: 0px 6px 30px rgba(30, 61, 83, 0.08);
  justify-content: space-between;
  align-items: center;
  padding-left: ${theme.spacing(3)};
  padding-right: ${theme.spacing(4)};
  width: 100%;
  height: 60px;
  display: flex;
  cursor: pointer;
`;

const IconTextContainer = styled.div`
  flex-direction: row;
  gap: ${theme.spacing(4)};
  display: flex;
  align-items: center;
`;
const OptionsCard = ({ icon, label, onClick }) => {
  return (
    <ContentContainer onClick={onClick}>
      <IconTextContainer>
        {icon}
        <Typography variant="more_option_text">{label}</Typography>
      </IconTextContainer>
      <ArrowCircle />
    </ContentContainer>
  );
};

export default OptionsCard;
