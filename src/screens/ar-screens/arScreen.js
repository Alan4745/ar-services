import {
  Button,
  Drawer,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getModelConfig } from "../../API/ArServiceApis";
import ArCard from "../../components/ArCard";
import Header from "../../components/Header";
import { Background, groupElements } from "../../components/StyledComponents";
import theme from "../../Theme";
import SendIcon from "@mui/icons-material/Send";
import BackupIcon from "@mui/icons-material/Backup";
import CloseIcon from "@mui/icons-material/Close";
import { useWindowDimensions } from "../../utils/WindowWidthHeight";
import { useNavigate } from "react-router-dom";

const ArScreen = ({ setValue }) => {
  const navigate = useNavigate();

  const { height } = useWindowDimensions();
  const [arConfigs, setArConfigs] = useState([]);

  useEffect(() => {
    const loadAr = async () => {
      const ar = await getModelConfig();
      console.log(ar.message);
      setArConfigs(ar.message);
    };

    loadAr();
  }, []);

  return (
    <div>
      <Background
        style={{
          height: height - 74,
          gap: theme.spacing(5),
        }}
      >
        <Header backButton={true} screenName={"AR"} setValue={setValue} />
        <div style={{ position: "absolute", bottom: "90px", right: "10px" }}>
          <Button
            variant="contained"
            endIcon={<BackupIcon />}
            onClick={() => {
              navigate(`/uploadExperianAr`);
            }}
          >
            New AR Experience
          </Button>
        </div>

        <div
          style={{
            ...groupElements,
            gap: theme.spacing(4),
            width: "100%",
            maxWidth: "349px",
          }}
        >
          {arConfigs.length !== 0 ? (
            <>
              {arConfigs.map((experience, index) => (
                <ArCard key={index} data={experience} />
              ))}
            </>
          ) : (
            <h1>Create your first AR experience</h1>
          )}
        </div>
      </Background>
    </div>
  );
};

export default ArScreen;
