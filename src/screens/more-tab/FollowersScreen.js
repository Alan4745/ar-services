import SquareButton from "../../components/SquareButton";
import {
  Background,
  groupElements,
  headingStylePrimary,
  SemiHeader,
} from "../../components/StyledComponents";
import { useWindowDimensions } from "../../utils/WindowWidthHeight";
import { ReactComponent as ArrowLeftIcon } from "../../assets/svgs/arrow-left.svg";
import { CircularProgress, Typography } from "@mui/material";
import theme from "../../Theme";
import Searchbar from "../../components/SearchBar";
import FollowerCard from "../../components/FollowerCard";
// import { DummyFollowers } from "../../DummyData";
import { useEffect, useState } from "react";
import { getFollowers } from "../../API/userServiceApis";

const FollowersScreen = ({ setValue, setUserProfile, userProfile }) => {
  const [user, setUser] = useState(userProfile);
  const [followersArray, setFollowersArray] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState();
  const { height } = useWindowDimensions();

  useEffect(() => {
    const fetchFollowers = async () => {
      if (user !== null) {
        const response = await getFollowers(user._id);
        setFollowersArray(response);
      } else {
        const response = await getFollowers();
        setFollowersArray(response);
      }
    };
    fetchFollowers();
  }, [buttonClicked]);

  const loading = !followersArray;
  return (
    <Background
      style={{
        height: height - 74,
        gap: theme.spacing(4),
      }}
    >
      <SemiHeader>
        <SquareButton
          onClick={() => {
            setValue(5);
          }}
        >
          <ArrowLeftIcon />
        </SquareButton>
        <Typography
          style={{
            ...headingStylePrimary,
            color: theme.palette.text.primary,
            flex: 1,
          }}
        >
          Followers
        </Typography>
      </SemiHeader>
      <Searchbar
        setSearchTerm={setSearchTerm}
        searchData={[]}
        placeholder={"Search"}
      />
      <div
        style={{
          ...groupElements,
          gap: theme.spacing(4),
          maxWidth: "349px",
          width: "100%",
        }}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        ) : followersArray.length > 0 ? (
          searchTerm ? (
            followersArray
              .filter((follower, index) => follower.userName == searchTerm)
              .map((follower, index) => (
                <FollowerCard
                  setValue={setValue}
                  setUserProfile={setUserProfile}
                  key={index}
                  setButtonClicked={setButtonClicked}
                  followerObject={follower}
                />
              ))
          ) : (
            followersArray.map((follower, index) => (
              <FollowerCard
                setValue={setValue}
                setUserProfile={setUserProfile}
                key={index}
                setButtonClicked={setButtonClicked}
                followerObject={follower}
              />
            ))
          )
        ) : (
          <Typography>No followers</Typography>
        )}
      </div>
    </Background>
  );
};

export default FollowersScreen;
