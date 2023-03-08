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
  const [startCam, setStartCam] = useState(true);

  useEffect(() => {
    const loadConfigAr = async () => {
      const ar = await getIdModelConfig(id);
      console.log(ar.message);
      setConfigAr(ar.message);
    };
    loadConfigAr();
  }, []);

  useEffect(() => {
    // Inicializa la cámara de Zapper
    setStartCam(true);
    // Retorna una función que se llama cuando el componente se destruye
    return () => {
      setStartCam(false);
      console.log("estamos destrullendo el componente");
      console.log(startCam);
      // Detiene la cámara de Zapper
    };
  }, []);

  console.log(configAr.urlModel);
  const [placementMode, setPlacementMode] = useState(true);

  return (
    <div style={{ backgroundColor: "#000", height: "100vh", width: "100%" }}>
      <BrowserCompatibility />
      <ZapparCanvas>
        <ZapparCamera start={startCam} />
        <ambientLight intensity={1} />

        <directionalLight position={[0, 2, 2]} />
        <directionalLight position={[0, 2, -2]} />
        <Suspense fallback={null}>
          <InstantTracker
            // placementMode={placementMode}
            // placementCameraOffset={[0, 0, -5]}
            placementUI="placement-only"
            placementCameraOffset={[0, 0, -10]}
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
            {/* <Model3d model={configAr.urlModel} /> */}
            {/* 
            <mesh>
              <boxBufferGeometry />
              <meshStandardMaterial color="hotpink" />
            </mesh> */}
          </InstantTracker>
        </Suspense>
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
