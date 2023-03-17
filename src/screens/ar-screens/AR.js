import React, { Suspense, useEffect, useState } from "react";
import { Navigate, unstable_HistoryRouter, useParams } from "react-router-dom";
import { getIdModelConfig } from "../../API/ArServiceApis";
import {
  BrowserCompatibility,
  InstantTracker,
  Loader,
  ZapparCamera,
  ZapparCanvas,
} from "@zappar/zappar-react-three-fiber";
import Model3d from "./Model3d";
import { useRef } from "react";
import { useGesture, usePinch } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/three";

function AR() {
  let { id } = useParams();
  const [configAr, setConfigAr] = useState({});
  const [out, setOut] = useState(false);

  useEffect(() => {
    const loadConfigAr = async () => {
      const ar = await getIdModelConfig(id);
      // console.log(ar.message);
      setConfigAr(ar.message);
    };
    loadConfigAr();
  }, []);

  // console.log(configAr.urlModel);
  const [placementMode, setPlacementMode] = useState(true);

  const camera = useRef();

  useEffect(() => {
    // setZoom());
    console.log(configAr.scaleModel);
    return () => {
      if (camera.current) {
        camera.current.stop();
      }
    };
  }, []);

  function NoZoom() {
    useEffect(() => {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "viewport");
      meta.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      );
      document.head.appendChild(meta);
    }, []);

    return null;
  }

  const [zoom, setZoom] = useState(null);

  useEffect(() => {
    setZoom(parseFloat(configAr.scaleModel));
  }, [configAr]);

  // const bind = usePinch(({ offset: [d], last }) => {
  //   console.log("estamos usando pinch");
  //   if (last) {
  //     setZoom((prev) => prev + d / 100);
  //   }
  // });

  const bind = useGesture({
    onPinch: ({ delta }) => {
      console.log("estamos en onPinch");
      // set({ scale: Math.max(scale.get() + delta[0] * 0.01, 0.2) });
      setZoom((prev) => prev + delta[0] / 100);
    },
  });

  return (
    <>
      <ZapparCanvas>
        <ZapparCamera ref={camera} />
        <InstantTracker placementMode={placementMode} placementCameraOffset={[0, 0, -5]}>
          {configAr.urlModel !== undefined ? (
            <Model3d
              model={configAr.urlModel}
              size={configAr.sizeModel}
              scale1={zoom}
            />
          ) : null}
        </InstantTracker>
        {/* <directionalLight position={[2.5, 8, 5]} intensity={1.5} /> */}
        <directionalLight intensity={0.5} position={[0, 0.5, 2]} />
        <directionalLight intensity={0.5} position={[-1, 0.5, 1]} />
        <directionalLight intensity={0.5} position={[1, 0.5, 1]} />
        <directionalLight intensity={0.5} position={[2, 0.5, 0]} />
        <directionalLight intensity={0.5} position={[-2, 0.5, 0]} />
        <directionalLight intensity={0.5} position={[0, 0.5, -2]} />
        <directionalLight intensity={0.5} position={[1, 0.5, 1]} />
        <directionalLight intensity={0.5} position={[-1, 0.5, -1]} />
        <ambientLight intensity={0.1} />
      </ZapparCanvas>
      <div
        id="zappar-placement-ui"
        style={style.zapparButton}
        onClick={() => {
          setPlacementMode((currentPlacementMode) => !currentPlacementMode);
        }}
        onKeyDown={() => {
          setPlacementMode((currentPlacementMode) => !currentPlacementMode);
        }}
        role="button"
        tabIndex={0}
      >
        Tap here to
        {placementMode ? ' place ' : ' pick up '}
        the object
      </div>
    </>
  );
}

const style = {
  zapparButton: {
    position: 'absolute',
    bottom: '30px',
    width: '200px',
    left: 'calc(50% - 100px)',
    Zindex: 1000,
    backgroundColor: ' rgba(0, 0, 0, 0.8)',
    color: 'white',
    texTalign: 'center',
    fontFamily: 'sans-serif',
    padding: '10px',
    borderRadius: '5px',
    position: "absolute",
  },
};


// <div
// style={{
//   backgroundColor: "#000",
//   height: "100vh",
//   width: "100%",
//   overflow: "hidden",
// }}
// >
// <NoZoom />
// <BrowserCompatibility />
// <ZapparCanvas {...bind()}>
//   <ambientLight intensity={1} />
//   <directionalLight position={[0, 2, 2]} />
//   <directionalLight position={[0, 2, -2]} />

//   <ZapparCamera ref={camera} />
//   <Suspense fallback={null}>
//     <InstantTracker
//       placementMode={placementMode}
//       placementCameraOffset={[0, 0, -5]}
//     >
//       {configAr.urlModel !== undefined ? (
//         <Model3d
//           model={configAr.urlModel}
//           size={configAr.sizeModel}
//           scale1={zoom}
//         />
//       ) : null}
//     </InstantTracker>
//   </Suspense>
//   <Loader />
// </ZapparCanvas>
// <div
//   id="zappar-placement-ui"
//   style={style.zapparButton}
//   onClick={() => {
//     setPlacementMode((currentPlacementMode) => !currentPlacementMode);
//   }}
// >
//   Tap here to
//   {placementMode ? " place " : " pick up "}
//   the object
// </div>
// <div
//   style={{
//     position: "absolute",
//     bottom: "100px",
//     left: "calc(50% - 100px)",
//     backgroundColor: "#000",
//     color: "#fff",
//   }}
//   onTouchStart={() => {
//     console.log("estamso dando toques");
//   }}
// >
//   <span>{zoom}</span>
// </div>
// </div>

export default AR;


