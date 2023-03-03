import { Typography } from "@mui/material";
import SquareButton from "../../components/SquareButton";
import {
  Background,
  groupElements,
  headingStylePrimary,
  SemiHeader,
} from "../../components/StyledComponents";
import theme from "../../Theme";
import { useWindowDimensions } from "../../utils/WindowWidthHeight";
import { ReactComponent as ArrowLeftIcon } from "../../assets/svgs/arrow-left.svg";
import Avatar from "@mui/material/Avatar";
import { DummyData } from "../../DummyData";
import HistoryCard from "../../components/HistoryCard";
import Header from "../../components/Header";

const HistoryScreen = ({ setValue }) => {
  const { height } = useWindowDimensions();

  return (
    <Background
      style={{
        height: height - 74,
        gap: theme.spacing(5),
      }}
    >
      <Header backButton={true} screenName={"History"} setValue={setValue} />
      <div
        style={{
          ...groupElements,
          gap: theme.spacing(4),
          maxWidth: "349px",
          width: "100%",
        }}
      >
        {DummyData.map((experience, index) => (
          <HistoryCard key={index} data={experience} />
        ))}
      </div>
    </Background>
  );
};

export default HistoryScreen;
