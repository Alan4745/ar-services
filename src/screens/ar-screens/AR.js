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
  console.log(camera);

  useEffect(() => {
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

  return (
    <div
      style={{
        backgroundColor: "#000",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <NoZoom />
      <BrowserCompatibility />
      <ZapparCanvas>
        <ambientLight intensity={1} />
        <directionalLight position={[0, 2, 2]} />
        <directionalLight position={[0, 2, -2]} />

        <ZapparCamera ref={camera} />
        <Suspense fallback={null}>
          <InstantTracker
            placementMode={placementMode}
            placementCameraOffset={[0, 0, -5]}
          >
            {configAr.urlModel !== undefined ? (
              <Model3d
                model={configAr.urlModel}
                size={configAr.sizeModel}
                scale1={configAr.scaleModel}
              />
            ) : null}
          </InstantTracker>
        </Suspense>
        {/* <Loader /> */}
      </ZapparCanvas>
      <div
        id="zappar-placement-ui"
        style={style.zapparButton}
        onClick={() => {
          setPlacementMode((currentPlacementMode) => !currentPlacementMode);
        }}
      >
        Tap here to
        {placementMode ? " place " : " pick up "}
        the object
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "100px",
          left: "calc(50% - 100px)",
          backgroundColor: "#000",
          color: "#fff",
        }}
        onTouchStart={() => {
          console.log("estamso dando toques");
        }}
      >
        <span>Estamos probando</span>
      </div>
    </div>
  );
}

const style = {
  zapparButton: {
    position: "absolute",
    bottom: "30px",
    width: "200px",
    left: "calc(50% - 100px)",
    zIndex: "1000",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "white",
    textAlign: "center",
    fontFamily: "sans-serif",
    padding: "10px",
    borderRadius: "5px",
  },
};

export default AR;
