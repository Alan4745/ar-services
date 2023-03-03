import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import theme from "../Theme";
import { solidButtonStyle } from "./StyledComponents";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { getUser, removeFollower } from "../API/userServiceApis";
import Skeleton from "@mui/material/Skeleton";

const ContentContainer = styled.div`
  flex-direction: row;
  border-radius: 14px;
  box-shadow: 0px 6px 30px rgba(30, 61, 83, 0.08);
  justify-content: space-between;
  align-items: center;
  padding-left: ${theme.spacing(3)};
  padding-right: ${theme.spacing(4)};
  width: 100%;
  height: 70px;
  display: flex;
`;

const AvatarNameContainer = styled.div`
  flex-direction: row;
  gap: ${theme.spacing(4)};
  display: flex;
  align-items: center;
`;
const FollowerCard = ({
  followerObject,
  setButtonClicked,
  setValue,
  setUserProfile,
}) => {
  // const [follower, setFollower] = useState();
  useEffect(() => {
    // const fetchFollower = async () => {
    //   const response = await getUser(`${followerObject}`);
    //   setFollower(response.data);
    // };
    // fetchFollower();
  }, []);

  const handleRemoveButtonClick = async (followerObject) => {
    try {
      await removeFollower(followerObject._id);
      setButtonClicked((prev) => !prev);
    } catch (error) {
      console.log("Remove click button error : ", error);
    }
  };

  const loading = !followerObject;
  return (
    <ContentContainer>
      {loading ? (
        <>
          <AvatarNameContainer>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton width={100} />
          </AvatarNameContainer>
          <Skeleton width={98} height={50} />
        </>
      ) : (
        <>
          <AvatarNameContainer
            onClick={() => {
              setUserProfile(followerObject);
              setValue(5);
            }}
          >
            <Avatar
            // src={follower.avatar}
            />
            <Typography variant="more_option_text">
              {followerObject.userName}
            </Typography>
          </AvatarNameContainer>
          <Button
            onClick={() => {
              handleRemoveButtonClick(followerObject);
            }}
            variant="contained"
            style={{
              ...solidButtonStyle,
              maxWidth: "98px",
              width: "100%",
              height: "38px",
              fontSize: "15px",
            }}
          >
            Remove
          </Button>
        </>
      )}
    </ContentContainer>
  );
};

export default FollowerCard;
