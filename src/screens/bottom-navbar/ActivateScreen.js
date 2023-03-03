import React, { Component } from "react";
import {
  Background,
  TextButtonRow,
  CardRowDiv,
  viewAllCardsButtonStyle,
  ColumnContainer,
  cardRowHeading,
} from "../../components/StyledComponents";
import { useWindowDimensions } from "../../utils/WindowWidthHeight";
import Searchbar from "../../components/SearchBar";
import { Button, Typography } from "@mui/material";
import ExperienceCard from "../../components/ExperienceCard";
import styled from "styled-components";
import ExperienceCategoryButton from "../../components/ExperienceCategoryButton";
import { DummyCategory, DummyData } from "../../DummyData";
import LndMrkCard from "../../components/LndMrkCard";
import theme from "../../Theme";
import Header from "../../components/Header";
import { Carousel } from "../../components/Carousel";
import { useState } from "react";

const ExperienceCategoryRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  width: 100%;
  min-height: 40px;
  align-items: center;
  gap: ${theme.spacing(3)};
`;

const ActivateScreen = ({ setValue, setUserProfileId }) => {
  const { height } = useWindowDimensions();
  const [searchTerm, setSearchTerm] = useState();

  return (
    <Background style={{ height: height - 74, justifyContent: "space-evenly" }}>
      <Header
        setUserProfileId={setUserProfileId}
        setValue={setValue}
        screenName={"Activate"}
      />
      <Searchbar
        searchData={[]}
        placeholder={"Search Experiences"}
        setSearchTerm={setSearchTerm}
      />
      <Carousel dots>
        {DummyData.map((exp, index) => {
          return (
            <ExperienceCard
              key={index}
              experienceName={exp.LandMark_Name}
              experienceCategory={exp.Category}
              experienceImage={exp.image}
            />
          );
        })}
      </Carousel>
      <ExperienceCategoryRowDiv>
        {DummyCategory.map((category, index) => {
          return (
            <ExperienceCategoryButton
              key={index}
              categoryName={category.Category_name}
            />
          );
        })}
      </ExperienceCategoryRowDiv>
      <ColumnContainer
        style={{
          width: "100%",
        }}
      >
        <TextButtonRow>
          <Typography style={cardRowHeading}>Newest Experiences</Typography>
          <Button
            style={{ ...viewAllCardsButtonStyle, fontSize: "14px" }}
            variant="text"
          >
            View All
          </Button>
        </TextButtonRow>
        <CardRowDiv>
          {DummyData.map((landmark, index) => {
            return (
              <LndMrkCard
                key={index}
                name={landmark.LandMark_Name}
                category={landmark.Category}
                distance={landmark.Distance}
                image={landmark.image}
              />
            );
          })}
        </CardRowDiv>
      </ColumnContainer>
    </Background>
  );
};

export default ActivateScreen;
