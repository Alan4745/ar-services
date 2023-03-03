import React, { Component, useEffect, useRef, useState } from "react";
import {
  Background,
  CardRowDiv,
  cardRowHeading,
  ColumnContainer,
  TextButtonRow,
  viewAllCardsButtonStyle,
} from "../../components/StyledComponents";
import { useWindowDimensions } from "../../utils/WindowWidthHeight";
import { Typography, Button } from "@mui/material";
import Searchbar from "../../components/SearchBar";
import LndMrkCard from "../../components/LndMrkCard";
import { DummyData, dummyMarkers } from "../../DummyData";
import { API, graphqlOperation, Storage } from "aws-amplify";
// import * as queries from "../graphql/queries";
import Header from "../../components/Header";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import theme from "../../Theme";

mapboxgl.accessToken =
  "pk.eyJ1IjoibG5kbXJrIiwiYSI6ImNsYm5nZDhnaTBpcTMzeHA4MWp6cXJtcmQifQ.REOmW9LVp_eonzWx33W6Gw";

const DiscoverScreen = ({
  setValue,

  setUserProfileId,
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const { height } = useWindowDimensions();
  const [searchTerm, setSearchTerm] = useState();

  useEffect(() => {
    if (map.current) return;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/light-v11",
          center: [position.coords.longitude, position.coords.latitude],
          zoom: zoom,
        });
      });
    } else {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [lng, lat],
        zoom: zoom,
      });
    }
  }, []);
  // const [fileData, setFileData] = useState("null");

  // const handleOnChange = async (e) => {
  //   // console.log("image::", e.target.files[0]);
  //   setFileData(e.target.files[0]);
  //   // console.log(URL.createObjectURL(e.target.files[0]));

  //   try {
  //     const result = await Storage.put(fileData.name, fileData, {
  //       level: "protected",
  //     });
  //     console.log(result);
  //   } catch (error) {
  //     console.log("Error uploading file: ", error);
  //   }
  //   // setSelectedImage(e.target.files[0]);
  //   // setImageUrl(URL.createObjectURL(e.target.files[0]));
  //   // onImageUrlChange(URL.createObjectURL(selectedImage));
  // };

  return (
    <div
      style={{
        height: height - 74,
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      ref={mapContainer}
      className="mapContainer"
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: "100%",
          padding: theme.spacing(4),
        }}
      >
        <Header
          setUserProfileId={setUserProfileId}
          setValue={setValue}
          screenName={"Discover"}
        />
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          width: "100%",
          padding: theme.spacing(4),
          top: 60,
        }}
      >
        <Searchbar
          searchData={[]}
          placeholder={"Search Landmarks"}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          flexDirection: "column",
          width: "100%",
          maxHeight: "250px",
          height: "100%",
          bottom: 0,
          paddingLeft: theme.spacing(4),
        }}
      >
        <Typography style={cardRowHeading}>Discover Landmarks</Typography>

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
      </div>
    </div>
    //  <Header setValue={setValue} screenName={"Discover"} />

    // <Searchbar />
    // <ColumnContainer
    //   style={{
    //     width: "100%",
    //   }}
    // >
    // <TextButtonRow>
    //   <Typography style={cardRowHeading}>Discover Landmarks</Typography>
    //   <Button style={viewAllCardsButtonStyle} variant="text">
    //     View All
    //   </Button>
    // </TextButtonRow>
    // <CardRowDiv>
    //   {DummyData.map((landmark, index) => {
    //     return (
    //       <LndMrkCard
    //         key={index}
    //         LandMark_Name={landmark.LandMark_Name}
    //         Category={landmark.Category}
    //         Distance={landmark.Distance}
    //         image={landmark.image}
    //       />
    //     );
    //   })}
    // </CardRowDiv>
    // </ColumnContainer>
    // <Button
    //   onClick={async () => {
    //     try {
    //       const createCategory = {
    //         category_name: "Boy",
    //       };

    //       const newAr = await API.graphql({
    //         query: mutations.createCategory,
    //         variables: { input: createCategory },
    //       });

    //       console.log("entry created", newAr);
    //     } catch (er) {
    //       console.log("create entry error: ", er);
    //     }
    //   }}
    // >
    //   create entry
    // </Button>
    // <Button
    //   onClick={async () => {
    //     try {
    //       const listEntries = await API.graphql({
    //         query: queries.listSpacialWorldTrackings,
    //         authMode: "AMAZON_COGNITO_USER_POOLS",
    //       });
    //       console.log("entry listed");
    //       console.log("list entries :", listEntries);
    //     } catch (er) {
    //       console.log("list entry error: ", er);
    //     }
    //   }}
    // >
    //   list entries
    // </Button>
    // <Button variant="contained" component="label">
    //   Upload
    //   <input
    //     onChange={handleOnChange}
    //     hidden
    //     accept=".obj,.fbx,.gltf,.glb"
    //     multiple
    //     type="file"
    //   />
    // </Button>
  );
};

export default DiscoverScreen;
