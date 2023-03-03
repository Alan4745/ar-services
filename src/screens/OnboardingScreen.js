import { ReactComponent as Logo } from "../assets/svgs/LndMark_logo.svg";
import { Button, Typography } from "@mui/material";
import SliderNarrowDots from "../utils/SlickSliderDots";
import Slider from "react-slick";
import Onboarding2 from "../assets/images/Onboarding1.png";
import Onboarding3 from "../assets/images/Onboarding2.png";
import Onboarding1 from "../assets/images/Onboarding3.png";

import { useRef } from "react";
import {
  Background,
  headingStyleSecondary,
  outlinedButtonStyle,
  solidButtonStyle,
} from "../components/StyledComponents";
import theme from "../Theme";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: Onboarding1,
    heading: "Adventure Time!",
    description:
      "Create & view location-based augmented reality (AR) Creations called Landmarks.",
  },
  {
    image: Onboarding3,
    heading: "Discover Landmarks",
    description:
      "Discover & activate community-made AR Creations that enhance your world.",
  },
  {
    image: Onboarding2,
    heading: "Activate Screen",
    description:
      "Create & view spatial-based augmented reality (AR) Creations called Experiences.",
  },
];
const OnBoardingScreen = () => {
  const navigate = useNavigate();
  const slickSliderRef = useRef(null);
  const goNextSlide = () => {
    slickSliderRef.current.slickNext();
  };

  return (
    <Background
      style={{
        padding: 0,
        gap: 0,
        justifyContent: "space-around",
      }}
    >
      <Logo
        style={{
          width: "190px",
          height: "59px",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "390px",
          width: "100%",
          height: "fit-content",
        }}
      >
        <SliderNarrowDots>
          <Slider
            appendDots={(dots) => <ul>{dots}</ul>}
            customPaging={(i) => (
              <div className="ft-slick__dots_narrow--custom"></div>
            )}
            beforeChange={(oldSlide, nextSlide) => {
              if (oldSlide === 2) {
                navigate("/signIn");
              }
            }}
            arrows={false}
            infinite={false}
            slidesToShow={1}
            ref={slickSliderRef}
            dots
          >
            {slides.map((slide, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                  key={index}
                >
                  <img alt="" src={slide.image} />
                  <Typography
                    style={{
                      fontWeight: 600,
                      fontSize: "22px",
                      lineHeight: "27.13px",
                      color: "#000000",
                      textAlign: "center",
                      marginTop: theme.spacing(5),
                    }}
                  >
                    {slide.heading}
                  </Typography>
                  <Typography
                    style={{
                      ...headingStyleSecondary,
                      marginTop: theme.spacing(3),
                      paddingInline: "30px",
                    }}
                  >
                    {slide.description}
                  </Typography>
                  <Button
                    onClick={() => {
                      navigate("/signIn");
                    }}
                    variant="contained"
                    style={{
                      ...solidButtonStyle,
                      width: "50%",
                      left: 100,
                      marginTop: theme.spacing(4),
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              );
            })}
          </Slider>
        </SliderNarrowDots>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <Button
          onClick={() => {
            navigate("/signIn");
          }}
          style={{
            ...outlinedButtonStyle,
            border: `1px solid ${theme.palette.text.secondary}`,
            color: theme.palette.text.secondary,
            maxWidth: "98px",
            width: "100%",
            height: "37px",
          }}
        >
          Skip
        </Button>{" "}
        <Button
          style={{
            ...outlinedButtonStyle,
            maxWidth: "98px",
            width: "100%",
            height: "37px",
          }}
          onClick={goNextSlide}
        >
          Next
        </Button>
      </div>
    </Background>
  );
};

export default OnBoardingScreen;
