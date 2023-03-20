import React, { Component, useEffect } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Typography,
} from "@mui/material";
// import {
//   HouseTwoToneIcon,
//   PublicTwoToneIcon,
//   StarIcon,
//   MoreHorizIcon,
// } from "@mui/icons-material";
import PublicIcon from "@mui/icons-material/Public";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import WelcomeScreen from "../screens/bottom-navbar/WelcomeScreen";
import DiscoverScreen from "../screens/bottom-navbar/DiscoverScreen";
import MoreScreen from "../screens/bottom-navbar/MoreScreen";
import ActivateScreen from "../screens/bottom-navbar/ActivateScreen";
import UserProfile from "../screens/more-tab/UserProfile";
import { ReactComponent as HomeIcon } from "../assets/svgs/homeIcon.svg";
import { ReactComponent as HomeBlueIcon } from "../assets/svgs/homeBlueIcon.svg";
import FollowersScreen from "../screens/more-tab/FollowersScreen";
import theme from "../Theme";
import HistoryScreen from "../screens/more-tab/HistoryScreen";
import LndMrkExpView from "./LndmrkExpView";
import PaymentScreen from "../screens/payment-screen/PaymentScreen";
import CreateSessionScreen from "../screens/CreateSessionScreen";
import Modal from "@mui/material/Modal";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArScreen from "../screens/ar-screens/arScreen";

const NavigationBottomAction = styled(BottomNavigationAction)(`
  color: #9DA7C0;
  font-weight:700;
  min-width:50px;
    max-width:150px;
    padding: 0px;
  /* &.MuiButtonBase-root-MuiBottomNavigationAction-root {
    min-width:10px;
    max-width:10px;
  } */
  &.Mui-selected {
    color: ${theme.palette.primary.main};
  border-top: 3px solid ${theme.palette.primary.main};
  }
  height: 100%;
`);

const NavigationBottom = styled(BottomNavigation)`
  position: fixed;
  display: "flex";
  min-height: 74px;
  @media (max-height: 700px) {
    height: 70px;
  }
  align-items: center;
  width: 100%;
  bottom: 0;
  box-shadow: 0px 15px 60px rgba(186, 174, 180, 0.3);
`;

const RoundButton = styled("div")({
  display: "flex",
  backgroundColor: theme.palette.primary.dark,
  height: "75%",
  width: "71%",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "100%",
  border: `2px solid ${theme.palette.secondary.main}`,
});
const iconStyle = {
  gap: theme.spacing(3),
  letterSpacing: "0.2px",
  minWidth: "fit-content",
  fontFamily: theme.fontFamily,
};

const BottomNavBar = ({ setIsLoggedIn }) => {
  const [value, setValue] = useState(0);
  const [creditPack, setCreditPack] = useState();
  const [userProfile, setUserProfile] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);


  console.log('estamos dentro de welcome');

  const urlParams = new URLSearchParams(window.location.hash.substr(1));
  const token = urlParams.get('access_token');

  if (token) {
    // El token se ha extraído correctamente
    // Almacena el token en una cookie o en el almacenamiento local del navegador
    localStorage.setItem('sketchfab_token', token);
    console.log(token, 'token');
    // Redirige al usuario a la página principal de tu sitio web
  } else {
    // No se pudo extraer el token
    console.error('No se pudo extraer el token');
  }

  return (
    <>
      <Modal
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            display: "flex",
            alignSelf: "center",
            flexDirection: "column",
            height: "45%",
            width: "70%",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
          }}
        >
          <EmojiEventsIcon
            style={{
              color: theme.palette.primary.main,
              height: 100,
              width: 100,
            }}
          />

          <Typography>Congradulations!</Typography>
          <Typography>You've got an achievement</Typography>
          {modalData ? (
            <>
              <Typography>{modalData.name}</Typography>
              <Typography>{modalData.description}</Typography>
            </>
          ) : null}
        </div>
      </Modal>

      {value === 0 ? (
        <WelcomeScreen setUserProfileId={setUserProfile} setValue={setValue} />
      ) : value === 1 ? (
        <DiscoverScreen setUserProfileId={setUserProfile} setValue={setValue} />
      ) : value === 2 ? (
        <CreateSessionScreen setValue={setValue} />
      ) : value === 3 ? (
        <ActivateScreen setUserProfileId={setUserProfile} setValue={setValue} />
      ) : value === 4 ? (
        <MoreScreen
          setUserProfileId={setUserProfile}
          setValue={setValue}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : value === 5 ? (
        <UserProfile
          userProfile={userProfile}
          setCreditPack={setCreditPack}
          setValue={setValue}
          setModalData={setModalData}
          setOpenModal={setOpenModal}
        />
      ) : value === 6 ? (
        <FollowersScreen
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          setValue={setValue}
        />
      ) : value === 7 ? (
        <HistoryScreen setValue={setValue} />
      ) : value === 20 ? (
        <LndMrkExpView setValue={setValue} />
      ) : value === 30 ? (
        <PaymentScreen setValue={setValue} creditPack={creditPack} />
      ) : value === 8 ? (
        <ArScreen setValue={setValue} />
      ) : null}
      <NavigationBottom
        showLabels={true}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);

          // console.log(newValue);
        }}
      >
        <NavigationBottomAction
          style={{
            ...iconStyle,
            fontWeight: value === 0 ? 600 : 400,
          }}
          label="Welcome"
          icon={value === 0 ? <HomeBlueIcon /> : <HomeIcon />}
        />

        <NavigationBottomAction
          style={{
            ...iconStyle,
            fontWeight: value === 1 ? 600 : 400,
          }}
          label="Discover"
          icon={<PublicIcon />}
        />
        <NavigationBottomAction
          style={{
            minWidth: "80px",
            maxWidth: "80px",
          }}
          icon={
            <RoundButton id="step3">
              <AddIcon
                style={{
                  height: 30,
                  width: 30,
                  color: "white",
                }}
              />
            </RoundButton>
          }
        />

        <NavigationBottomAction
          style={{
            ...iconStyle,
            fontWeight: value === 3 ? 600 : 400,
          }}
          label="Activate"
          icon={<StarRoundedIcon />}
        />
        <NavigationBottomAction
          style={{
            ...iconStyle,
            fontWeight: value === 4 ? 600 : 400,
          }}
          label="More"
          icon={<MoreHorizIcon />}
        />
      </NavigationBottom>
    </>
  );
};
export default BottomNavBar;
