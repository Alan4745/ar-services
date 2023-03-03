import { useWindowDimensions } from "../utils/WindowWidthHeight";
import {
  groupElements,
  headingStylePrimary,
  headingStyleSecondary,
  SemiHeader,
  solidButtonStyle,
} from "./StyledComponents";
import lndmrkExpBg from "../assets/images/LndmrkExperienceBg.png";
import SquareButton from "./SquareButton";
import { ReactComponent as ArrowLeftIcon } from "../assets/svgs/arrow-left.svg";
import { ReactComponent as ShareButton } from "../assets/svgs/shareButton.svg";
import { ReactComponent as LocationIcon } from "../assets/svgs/locationIcon.svg";
import { ReactComponent as HeartIcon } from "../assets/svgs/heartIcon.svg";
import { Button, Typography } from "@mui/material";
import theme from "../Theme";
import styled from "styled-components";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${(props) => `url(${props.img})`};
  background-repeat: no-repeat;
  background-size: 390px 370px;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing(4)};
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 334px;
  border-radius: 14px;
  box-shadow: 0px 6px 30px rgba(30, 61, 83, 0.08);
  padding: ${theme.spacing(4)};
  gap: ${theme.spacing(4)};
  background-color: white;
`;

const FloatingButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 38px;
  width: 38px;
  border-radius: 100%;
  box-shadow: 0px 6px 30px rgba(30, 61, 83, 0.08);
`;

const CategoryTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: rgba(0, 136, 223, 0.1);
  color: ${theme.palette.primary.dark};
  width: 100px;
  height: 35px;
  font-size: 14px;
`;
const LndMrkExpView = () => {
  const { height } = useWindowDimensions();
  return (
    <ContentContainer
      img={lndmrkExpBg}
      style={{
        height: height - 74,
      }}
    >
      <SemiHeader>
        <SquareButton>
          <ArrowLeftIcon />
        </SquareButton>
        <SquareButton>
          <ShareButton />
        </SquareButton>
      </SemiHeader>
      <div style={{ ...groupElements, gap: theme.spacing(5) }}>
        <Card>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <CategoryTag>
              <Typography
                style={{
                  ...headingStyleSecondary,
                  color: theme.palette.primary.main,
                }}
              >
                Category
              </Typography>
            </CategoryTag>
            <FloatingButton>
              <HeartIcon />
            </FloatingButton>
          </div>
          <Typography
            style={{
              ...headingStylePrimary,
              fontSize: "22px",
              color: "black",
              textAlign: "left",
              fontWeight: 600,
            }}
          >
            Landmark Name
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: theme.spacing(3),
              }}
            >
              <LocationIcon />
              <Typography style={headingStyleSecondary}>
                43.6532 ° N | 79.3832 ° W
              </Typography>
            </div>

            <Typography
              style={{
                ...headingStyleSecondary,
                color: theme.palette.primary.main,
                fontWeight: "500",
              }}
            >
              325 m
            </Typography>
          </div>
          <Typography
            style={{
              ...headingStyleSecondary,
              textAlign: "left",
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Typography>
        </Card>
        <Button variant="contained" style={solidButtonStyle}>
          Discover
        </Button>
      </div>
    </ContentContainer>
  );
};

export default LndMrkExpView;
