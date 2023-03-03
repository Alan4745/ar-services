// import "./carousel.css";

import styled from "@emotion/styled";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import Slider from "react-slick";
import SliderNormalDots from "../utils/SlickSliderDots";
import { settings } from "../utils/SlickSliderSettings";
export const Carousel = (props) => {
  return (
    <SliderNormalDots>
      <Slider
        {...settings}
        appendDots={(dots) => <ul>{dots}</ul>}
        customPaging={(i) => <div className="ft-slick__dots--custom"></div>}
        dots
      >
        {props.children}
      </Slider>
    </SliderNormalDots>
  );
};
