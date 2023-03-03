import styled from "styled-components";
import { ReactComponent as GoogleIcon } from "../assets/svgs/googleIcon.svg";
import { ReactComponent as TwitterIcon } from "../assets/svgs/twitterIcon.svg";
import { ReactComponent as FacebookIcon } from "../assets/svgs/facebookIcon.svg";

const ContentContainer = styled.div`
  display: flex;
  height: 60px;
  width: 60px;
  border-radius: 100%;
  box-shadow: 0px 6px 30px rgba(30, 61, 83, 0.08);
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SocialMediaButton = ({ type, onClick }) => {
  return (
    <ContentContainer onClick={onClick}>
      {type === "google" ? (
        <GoogleIcon />
      ) : type === "facebook" ? (
        <FacebookIcon />
      ) : (
        <TwitterIcon />
      )}
    </ContentContainer>
  );
};

export default SocialMediaButton;
