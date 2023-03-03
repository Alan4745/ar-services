import { Button } from "@mui/material";
import { Background, solidButtonStyle } from "../components/StyledComponents";
import { useWindowDimensions } from "../utils/WindowWidthHeight";

const CreateSessionScreen = () => {
  const { height } = useWindowDimensions();
  return (
    <Background
      style={{
        height: height - 74,
      }}
    >
      <Button
        onClick={() => {}}
        variant="contained"
        style={solidButtonStyle}
      ></Button>
    </Background>
  );
};

export default CreateSessionScreen;