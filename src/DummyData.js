import img1 from "../src/assets/images/dummy-card-imgs/img1.png";
import img2 from "../src/assets/images/dummy-card-imgs/img2.png";
import img3 from "../src/assets/images/dummy-card-imgs/img3.png";
import img4 from "../src/assets/images/dummy-card-imgs/img4.png";
import avatar6 from "../src/assets/images/dummy-avatars/avatar6.png";
import avatar1 from "../src/assets/images/dummy-avatars/avatar1.png";
import avatar2 from "../src/assets/images/dummy-avatars/avatar2.png";
import avatar3 from "../src/assets/images/dummy-avatars/avatar3.png";
import avatar4 from "../src/assets/images/dummy-avatars/avatar4.png";
import avatar5 from "../src/assets/images/dummy-avatars/avatar5.png";

export const DummyFollowers = [
  {
    name: "Kadin Dokidis",
    avatar: avatar6,
  },
  {
    name: "Phillip Curtis",
    avatar: avatar5,
  },
  {
    name: "Jordyn Ekstrom",
    avatar: avatar4,
  },
  {
    name: "Giana Rosser",
    avatar: avatar3,
  },
  {
    name: "Marcus Dokidis",
    avatar: avatar2,
  },
  {
    name: "Jaylon Lipshutz",
    avatar: avatar1,
  },
];

export const dummyMarkers = [
  {
    features: [
      {
        type: "Feature",
        properties: {
          title: "Lincoln Park",
          description: "A northside park that is home to the Lincoln Park Zoo",
        },
        geometry: {
          coordinates: [-87.637596, 41.940403],
          type: "Point",
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Burnham Park",
          description: "A lakefront park on Chicago's south side",
        },
        geometry: {
          coordinates: [-87.603735, 41.829985],
          type: "Point",
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Millennium Park",
          description:
            "A downtown park known for its art installations and unique architecture",
        },
        geometry: {
          coordinates: [-87.622554, 41.882534],
          type: "Point",
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Grant Park",
          description:
            "A downtown park that is the site of many of Chicago's favorite festivals and events",
        },
        geometry: {
          coordinates: [-87.619185, 41.876367],
          type: "Point",
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Humboldt Park",
          description: "A large park on Chicago's northwest side",
        },
        geometry: {
          coordinates: [-87.70199, 41.905423],
          type: "Point",
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Douglas Park",
          description:
            "A large park near in Chicago's North Lawndale neighborhood",
        },
        geometry: {
          coordinates: [-87.699329, 41.860092],
          type: "Point",
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Calumet Park",
          description:
            "A park on the Illinois-Indiana border featuring a historic fieldhouse",
        },
        geometry: {
          coordinates: [-87.530221, 41.715515],
          type: "Point",
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Jackson Park",
          description:
            "A lakeside park that was the site of the 1893 World's Fair",
        },
        geometry: {
          coordinates: [-87.580389, 41.783185],
          type: "Point",
        },
      },
      {
        type: "Feature",
        properties: {
          title: "Columbus Park",
          description: "A large park in Chicago's Austin neighborhood",
        },
        geometry: {
          coordinates: [-87.769775, 41.873683],
          type: "Point",
        },
      },
    ],
    type: "FeatureCollection",
  },
];
export const DummyData = [
  {
    LandMark_Name: "Random 1",
    Category: "First",
    Distance: "300m",
    image: img1,
    link: "https://lndmrk-blippar-ar.netlify.app/?Model=Burger",
  },
  {
    LandMark_Name: "Random 2",
    Category: "Second",
    Distance: "200m",
    image: img2,
    link: "https://lndmrk-blippar-ar.netlify.app/?Model=Platter",
  },
  {
    LandMark_Name: "Random 3",
    Category: "Third",
    Distance: "100m",
    image: img3,
    link: "https://lndmrk-blippar-ar.netlify.app/?Model=Astronaut",
  },
  {
    LandMark_Name: "Random 4",
    Category: "Fourth",
    Distance: "50m",
    image: img4,
    link: "https://lndmrk-blippar-ar.netlify.app/?Model=Trophy",
  },
];

export const DummyCategory = [
  { Category_name: "Animal" },
  { Category_name: "Cat" },
  { Category_name: "Plane" },
  { Category_name: "Grass" },
  { Category_name: "Cloud" },
  { Category_name: "Tree" },
  { Category_name: "Boy" },
];
