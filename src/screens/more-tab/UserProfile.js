import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import SquareButton from "../../components/SquareButton";
import ShareIcon from "@mui/icons-material/Share";
import { ReactComponent as CoinsIcon } from "../../assets/svgs/coinsIcon.svg";
import { ReactComponent as ArrowLeftIcon } from "../../assets/svgs/arrow-left.svg";
import { ReactComponent as Achievement1 } from "../../assets/svgs/achievement1.svg";
import { ReactComponent as Achievement2 } from "../../assets/svgs/achievement2.svg";
import { ReactComponent as Achievement3 } from "../../assets/svgs/achievement3.svg";
import { ReactComponent as Achievement4 } from "../../assets/svgs/achievement4.svg";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import {
  CustomCard,
  Background,
  headingStylePrimary,
  headingStyleSecondary,
  squareButtonIconStyle,
  TextButtonRow,
  viewAllCardsButtonStyle,
  CardRowDiv,
  solidButtonStyle,
  cardRowHeading,
  SemiHeader,
  groupElements,
  screenNameStyle,
} from "../../components/StyledComponents";
import { useWindowDimensions } from "../../utils/WindowWidthHeight";
import theme from "../../Theme";
import { DummyData } from "../../DummyData";
import LndMrkCard from "../../components/LndMrkCard";
import AvatarDummy from "../../assets/images/dummy-avatars/AvatarDummy.png";
import { useEffect, useState } from "react";
import { creditPacks } from "../../utils/CreditsPack";
import CreditPackCard from "../../components/CreditPackCard";
import Joyride from "react-joyride";
import { steps } from "../../utils/OnboardingTourSteps";
import Tooltip from "../../components/OnboardingTourTooltip";
import {
  addFollower,
  followUser,
  getFollowers,
  getFollowing,
  getUser,
  removeFollower,
  unfollowUser,
} from "../../API/userServiceApis";
import CircularProgress from "@mui/material/CircularProgress";
import { followAchievement } from "../../API/AchievementServiceApis";

const SocialInfoContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  gap: ${theme.spacing(2)};
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 80%;
  background-color: white;
  border-radius: 15px;
  align-items: center;
  gap: ${theme.spacing(5)};
  padding: ${theme.spacing(3)};
  padding-top: ${theme.spacing(4)};
`;
const achievementBackground = {
  display: "flex",
  height: "60px",
  width: "60px",
  flexDirection: "column",
  backgroundColor: "#E0F1F8",
  borderRadius: "100%",
  justifyContent: "center",
  alignItems: "center",
};
const infoNumberStyle = {
  fontWeight: "600",
  fontSize: "18px",
  lineHeight: "22px",
  color: "#000000",
};
const UserProfile = ({
  setValue,
  setCreditPack,
  userProfile,
  setModalData,
  setOpenModal,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const [isFollowButtonClicked, setIsFollowButtonClicked] = useState(false);
  const [numberOfFollowers, setNumberOfFollowers] = useState();
  const [selectedCreditPack, setSelectedCreditPack] = useState(0);
  const [user, setUser] = useState(userProfile);
  const [isFollower, setIsFollower] = useState(false);
  const { height } = useWindowDimensions();

  const handleFollowButtonClick = async (isFollower) => {
    setIsFollowButtonClicked((prev) => !prev);
    try {
      if (isFollower) {
        await unfollowUser(userProfile._id);
      } else {
        await followUser(userProfile._id);
        const achievement = await followAchievement();
        if (achievement) {
          setModalData(achievement.data);
          setOpenModal(true);
        }
      }
    } catch (error) {
      console.log("Error follow button : ", error);
    }
  };

  useEffect(() => {
    const checkIfFollowing = async () => {
      const isFollowing = await getFollowing(userProfile._id);
      if (isFollowing) setIsFollower(true);
      else setIsFollower(false);
    };

    const fetchUser = async (id) => {
      const fetchedUser = await getUser(id);
      setUser(fetchedUser.data);
    };

    if (!userProfile) {
      fetchUser();
    } else {
      setUser(userProfile);
      checkIfFollowing();
    }
  }, [isFollowButtonClicked]);

  const loading = !user;
  return loading ? (
    <Background style={{ height: height - 74, justifyContent: "space-evenly" }}>
      <CircularProgress />
    </Background>
  ) : (
    <>
      {!localStorage.getItem("oldUser") && (
        <Joyride
          continuous
          stepIndex={3}
          disableScrollParentFix={true}
          tooltipComponent={Tooltip}
          steps={steps}
          callback={(data) => {
            const { action, index, type } = data;

            if (action === "prev" && index === 3 && type === "step:after") {
              setValue(0);
            } else if (
              action === "close" &&
              index === 3 &&
              type === "step:after"
            ) {
              localStorage.setItem("oldUser", true);

              setValue(0);
            }

            console.log("calback data argument : ", data);
          }}
        />
      )}
      <Background
        style={{ height: height - 74, justifyContent: "space-evenly" }}
      >
        <Modal
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: theme.spacing(5),
          }}
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "87%",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={handleModalClose}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",
                  height: "30px",
                  width: "30px",
                  borderRadius: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "white",
                }}
              >
                <CloseIcon />
              </button>
            </div>

            <ModalContainer>
              <div style={{ ...groupElements, gap: theme.spacing(3) }}>
                <Typography
                  style={{
                    fontWeight: 600,
                    fontSize: "26px",
                    lineHeight: "32px",
                    color: "#000000",
                  }}
                >
                  Need More Credits?
                </Typography>
                <Typography
                  style={{
                    ...headingStylePrimary,
                    fontWeight: 400,
                    lineHeight: "24px",
                    color: theme.palette.text.secondary,
                  }}
                >
                  Purchase a pack!
                </Typography>
              </div>

              <div
                style={{
                  ...groupElements,
                  width: "100%",
                  gap: theme.spacing(4),
                }}
              >
                {creditPacks.map((pack, index) => (
                  <CreditPackCard
                    selectedCreditPack={selectedCreditPack}
                    setSelectedCreditPack={setSelectedCreditPack}
                    key={index}
                    value={index}
                    image={pack.image}
                    price={pack.price}
                    credits={pack.credits}
                    details={pack.details}
                  />
                ))}
              </div>

              <Button
                onClick={() => {
                  setValue(30);
                  setCreditPack(creditPacks[selectedCreditPack]);
                  console.log(
                    "selected credit pack : ",
                    creditPacks[selectedCreditPack]
                  );
                }}
                variant="contained"
                style={solidButtonStyle}
              >
                Purchase
              </Button>
            </ModalContainer>
          </>
        </Modal>
        <SemiHeader>
          <SquareButton
            onClick={() => {
              setValue(4);
            }}
          >
            <ArrowLeftIcon />
          </SquareButton>
          <Typography style={screenNameStyle}>Profile</Typography>
          <SquareButton>
            <ShareIcon style={squareButtonIconStyle} />
          </SquareButton>
        </SemiHeader>

        <CustomCard
          style={{
            alignItems: "center",
            gap: theme.spacing(4),
            maxWidth: "100%",
            boxShadow: "0px 6px 30px rgba(30, 61, 83, 0.08)",
            filter: "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.0))",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              paddingBottom: theme.spacing(4),
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundImage: `url(${AvatarDummy})`,
                backgroundSize: "cover",
                borderRadius: "100%",
                height: "106px",
                width: "106px",
                justifyContent: "flex-end",
                position: "relative",
              }}
            >
              <div
                onClick={handleModalOpen}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: theme.palette.primary.dark,
                  width: "74px",
                  height: "32px",
                  borderRadius: "60px",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  gap: theme.spacing(2),
                  position: "absolute",
                  bottom: -15,
                }}
              >
                <CoinsIcon />
                <Typography
                  style={{
                    fontSize: "14px",
                  }}
                >
                  {user.credits}
                </Typography>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "57%",
                justifyContent: userProfile ? "space-between" : "space-evenly",
                alignItems: "flex-start",
              }}
            >
              <Typography
                style={{
                  ...headingStylePrimary,
                  fontSize: "22px",
                  color: "#000000",
                }}
              >
                {user.userName}
              </Typography>
              <Typography
                style={{
                  ...headingStyleSecondary,
                  fontSize: "16px",
                  lineHeight: "20px",
                }}
              >
                Personal Creator
              </Typography>

              {userProfile && (
                <Button
                  onClick={() => {
                    handleFollowButtonClick(isFollower);
                  }}
                  variant="contained"
                  style={{
                    ...solidButtonStyle,
                    height: "42px",
                    width: "95%",
                    backgroundColor: isFollower && theme.palette.primary.dark,
                  }}
                >
                  {isFollower ? "Following" : "Follow"}
                </Button>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "68px",
              borderTop: `1px solid ${theme.palette.secondary.main}`,
              borderBottom: `1px solid ${theme.palette.secondary.main}`,
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              // backgroundColor: "red",
            }}
          >
            <SocialInfoContainer
              style={{
                flex: 2,
              }}
            >
              <Typography style={headingStyleSecondary}>Likes</Typography>
              <Typography style={infoNumberStyle}>22.2K</Typography>
            </SocialInfoContainer>
            <SocialInfoContainer
              onClick={() => {
                setValue(6);
              }}
              style={{
                flex: 3,
                cursor: "pointer",
                borderLeft: `1px solid ${theme.palette.secondary.main}`,
                borderRight: `1px solid ${theme.palette.secondary.main}`,
              }}
            >
              <Typography style={headingStyleSecondary}>Followers</Typography>
              <Typography style={infoNumberStyle}>
                {user.userFollowers.length}
              </Typography>
            </SocialInfoContainer>
            <SocialInfoContainer
              style={{
                flex: 2,
              }}
            >
              <Typography style={headingStyleSecondary}>Published</Typography>
              <Typography style={infoNumberStyle}>102</Typography>
            </SocialInfoContainer>
          </div>
          <Typography
            style={{
              fontWeight: "600",
              fontSize: "16px",
              lineHeight: "20px",
              color: "#000000",
              alignSelf: "flex-start",
              letterSpacing: "0",
            }}
          >
            Achievements
          </Typography>
          <div
            id="step4"
            style={{
              display: "flex",
              flexDirection: "row",
              width: "92%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={achievementBackground}>
              <Achievement4 />
            </div>
            <div style={achievementBackground}>
              <Achievement3 />
            </div>{" "}
            <div style={achievementBackground}>
              <Achievement2 />
            </div>{" "}
            <div style={achievementBackground}>
              <Achievement1 />
            </div>{" "}
          </div>
        </CustomCard>
        <TextButtonRow>
          <Typography style={cardRowHeading}>Recently Published</Typography>
          <Button style={viewAllCardsButtonStyle} variant="text">
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
                image={landmark.image}
              />
            );
          })}
        </CardRowDiv>
      </Background>
    </>
  );
};

export default UserProfile;
