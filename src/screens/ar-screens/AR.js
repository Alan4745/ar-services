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
function AR() {
  let { id } = useParams();
  const [configAr, setConfigAr] = useState({});

  useEffect(() => {
    const loadConfigAr = async () => {
      const ar = await getIdModelConfig(id);
      console.log(ar.message);
      setConfigAr(ar.message);
    };
    loadConfigAr();
  }, []);

  console.log(id);

  const [placementMode, setPlacementMode] = useState(true);

  return (
    <div style={{ backgroundColor: "#000", height: "100vh", width: "100%" }}>
      <BrowserCompatibility />
      <ZapparCanvas>
        <ZapparCamera />
        <Suspense fallback={null}>
          <InstantTracker
            placementMode={placementMode}
            placementCameraOffset={[0, 0, -5]}
          >
            {/* <Model3d
              model={configAr.urlModel}
              // size={size1}
              // posicion={ejeY}
              // rotation={rotacion}
              // pathBucketModel={props.pathBucket}
              // submit={onSubmit}
            /> */}
            {configAr.urlModel !== undefined ? (
              <Model3d model={configAr.urlModel} />
            ) : null}
          </InstantTracker>
        </Suspense>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
        {/* <Loader /> */}
      </ZapparCanvas>
      <button
        style={{
          position: "absolute",
          bottom: "30px",
          width: "200px",
          left: "calc(50% - 100px)",
        }}
        onClick={() => {
          Navigate(-1);
        }}
      >
        back
      </button>
    </div>
  );
}

export default AR;
