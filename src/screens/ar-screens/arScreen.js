import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getModelConfig } from "../../API/ArServiceApis";
import ArCard from "../../components/ArCard";
import Header from "../../components/Header";
import { Background, groupElements } from "../../components/StyledComponents";
import theme from "../../Theme";
import { useWindowDimensions } from "../../utils/WindowWidthHeight";

const ArScreen = ({ setValue }) => {
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
        <div
          style={{
            ...groupElements,
            gap: theme.spacing(4),
            width: "100%",
            maxWidth: "349px",
          }}
        >
          <h1>Estamos en AR</h1>
          {arConfigs.map((experience, index) => (
            <ArCard key={index} data={experience} />
          ))}
        </div>
      </Background>
    </div>
  );
};

export default ArScreen;
