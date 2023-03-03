import { Button, Typography } from "@mui/material";
import { ReactComponent as UpArrow } from "../assets/svgs/tooltipUpArrow.svg";
import { ReactComponent as DownArrow1 } from "../assets/svgs/tooltipDown1.svg";
import { ReactComponent as DownArrow2 } from "../assets/svgs/tooltipDown2.svg";

import theme from "../Theme";
import {
  headingStyleSecondary,
  outlinedButtonStyle,
  solidButtonStyle,
} from "./StyledComponents";

const rowDivStyle = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
};
const Tooltip = ({
  continuous,
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "370px",
        width: "100%",
        gap: theme.spacing(4),
      }}
      {...tooltipProps}
    >
      {index === 0 ? (
        <>
          <UpArrow />
          <Typography
            style={{
              fontWeight: 600,
              fontSize: "26px",
              lineHeight: "32px",
              color: "white",
              textAlign: "center",
            }}
          >
            {step.title}
          </Typography>
          <Typography
            style={{
              ...headingStyleSecondary,
              color: "white",
              fontWeight: 700,
            }}
          >
            {step.content1}
          </Typography>
          <Typography
            style={{
              ...headingStyleSecondary,
              color: "white",
              fontWeight: 700,
            }}
          >
            {step.content2}
          </Typography>
          {continuous && (
            <Button
              {...primaryProps}
              id="next"
              variant="contained"
              style={{
                alignSelf: "flex-end",
                ...outlinedButtonStyle,
                color: "white",
                width: "98px",
                height: "37px",
              }}
            >
              Continue
            </Button>
          )}
        </>
      ) : index === 1 ? (
        <>
          {continuous && (
            <div style={rowDivStyle}>
              <Button
                {...backProps}
                id="next"
                variant="contained"
                style={{
                  alignSelf: "flex-end",
                  ...outlinedButtonStyle,
                  backgroundColor: "transparent",
                  borderColor: "white",
                  color: "white",
                  width: "98px",
                  height: "37px",
                }}
              >
                Back
              </Button>

              <Button
                {...primaryProps}
                id="next"
                variant="contained"
                style={{
                  alignSelf: "flex-end",
                  ...solidButtonStyle,
                  width: "98px",
                  height: "37px",
                }}
              >
                Continue
              </Button>
            </div>
          )}
          <Typography
            style={{
              fontWeight: 600,
              fontSize: "26px",
              lineHeight: "32px",
              color: "white",
            }}
          >
            {step.title}
          </Typography>
          <Typography
            style={{
              ...headingStyleSecondary,
              color: "white",
              fontWeight: 700,
            }}
          >
            {step.content1}
          </Typography>
          <Typography
            style={{
              ...headingStyleSecondary,
              color: "white",
              fontWeight: 700,
            }}
          >
            {step.content2}
          </Typography>

          <DownArrow1 />
        </>
      ) : index === 2 ? (
        <>
          {continuous && (
            <div style={rowDivStyle}>
              <Button
                {...backProps}
                id="next"
                variant="contained"
                style={{
                  alignSelf: "flex-end",
                  ...outlinedButtonStyle,
                  backgroundColor: "transparent",
                  borderColor: "white",
                  color: "white",
                  width: "98px",
                  height: "37px",
                }}
              >
                Back
              </Button>

              <Button
                {...primaryProps}
                id="next"
                variant="contained"
                style={{
                  alignSelf: "flex-end",
                  ...solidButtonStyle,
                  width: "98px",
                  height: "37px",
                }}
              >
                Continue
              </Button>
            </div>
          )}
          <Typography
            style={{
              fontWeight: 600,
              fontSize: "26px",
              lineHeight: "32px",
              color: "white",
              textAlign: "center",
            }}
          >
            {step.title}
          </Typography>
          <Typography
            style={{
              ...headingStyleSecondary,
              color: "white",
              fontWeight: 700,
            }}
          >
            {step.content1}
          </Typography>
          <Typography
            style={{
              ...headingStyleSecondary,
              color: "white",
              fontWeight: 700,
            }}
          >
            {step.content2}
          </Typography>

          <DownArrow2 />
        </>
      ) : (
        index === 3 && (
          <>
            <UpArrow />
            <Typography
              style={{
                fontWeight: 600,
                fontSize: "26px",
                lineHeight: "32px",
                color: "white",
                textAlign: "center",
              }}
            >
              {step.title}
            </Typography>
            <Typography
              style={{
                ...headingStyleSecondary,
                color: "white",
                fontWeight: 700,
              }}
            >
              {step.content1}
            </Typography>
            <Typography
              style={{
                ...headingStyleSecondary,
                color: "white",
                fontWeight: 700,
              }}
            >
              {step.content2}
            </Typography>
            {continuous && (
              <div style={rowDivStyle}>
                <Button
                  {...backProps}
                  id="next"
                  variant="contained"
                  style={{
                    alignSelf: "flex-end",
                    ...outlinedButtonStyle,
                    backgroundColor: "transparent",
                    borderColor: "white",
                    color: "white",
                    width: "98px",
                    height: "37px",
                  }}
                >
                  Back
                </Button>

                <Button
                  {...closeProps}
                  variant="contained"
                  style={{
                    alignSelf: "flex-end",
                    ...solidButtonStyle,
                    width: "98px",
                    height: "37px",
                  }}
                >
                  Continue
                </Button>
              </div>
            )}
          </>
        )
      )}
    </div>
  );
};

export default Tooltip;
