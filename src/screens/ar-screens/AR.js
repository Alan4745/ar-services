import React, { Suspense, useEffect, useState, useRef, useMemo } from "react";
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
import { useGesture, usePinch } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/three";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from 'three';
import imgHost from '../../assets/hotspot.png'
import gifScan from '../../assets/scan.gif'
import { Image, SpotLight } from "@react-three/drei";
import { HemisphereLight, RepeatWrapping, TextureLoader } from "three";

const Floor = () => {
  const floorRef = useRef();

  useFrame(() => {
    floorRef.current.position.y = 0
  })

  const texture = useMemo(() => new THREE.TextureLoader().load(imgHost), [imgHost]);

  return (
    <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[3, 3]} />
      <meshStandardMaterial attach="material" map={texture} transparent={true} />
    </mesh>
  )
}

function Lights() {
  return (
    <group>
      <ambientLight intensity={1} color="white" />
      <directionalLight
        castShadow
        position={[-5, 5, -10]}
        intensity={1.5}
        shadow-bias={0.0001}
        shadow-camera-right={4}
        shadow-camera-left={-4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-radius={2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        castShadow
        position={[5, 15, -10]}
        intensity={1.5}
        shadow-bias={0.0001}
        shadow-camera-right={4}
        shadow-camera-left={-4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-radius={2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        castShadow
        position={[5, 15, 10]}
        intensity={1.5}
        shadow-bias={0.0001}
        shadow-camera-right={4}
        shadow-camera-left={-4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-radius={2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        castShadow
        position={[5, 15, 10]}
        intensity={1.5}
        shadow-bias={0.0001}
        shadow-camera-right={4}
        shadow-camera-left={-4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-radius={2}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </group>
  )
}

function AR() {
  let { id } = useParams();
  const [configAr, setConfigAr] = useState({});
  const [out, setOut] = useState(false);
  const [showGif, setShowGif] = useState(true);
  // const colorMap = useLoader(TextureLoader, imgHost)

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


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGif(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      <ZapparCanvas>
        <ZapparCamera ref={camera} />



        <InstantTracker placementMode={placementMode} placementCameraOffset={[0, 0, -5]}>

          {!showGif && (
            <Suspense fallback={null}>
              {configAr.urlModel !== undefined ? (
                <Model3d
                  model={configAr.urlModel}
                  size={configAr.sizeModel}
                  scale1={zoom} />

              ) : null}
              {placementMode ? <Floor /> : null}

            </Suspense>
          )}



        </InstantTracker>

        {/* <Lights /> */}
        <pointLight color={'white'} intensity={1} position={[2, 2, 2]} />
        <pointLight color={'white'} intensity={1} position={[2, 2, -2]} />
        <pointLight color={'white'} intensity={0.5} position={[2, -2, 2]} />
        <pointLight color={'white'} intensity={0.5} position={[2, -2, -2]} />
        <pointLight color={'red'} intensity={0.5} position={[-2, 2, 2]} />
        <pointLight color={'white'} intensity={0.5} position={[-2, 2, -2]} />
        <pointLight color={'white'} intensity={0.5} position={[-2, -2, 2]} />
        <pointLight color={'white'} intensity={0.5} position={[-2, -2, -2]} />

        <ambientLight />

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
      {showGif && (
        <div style={style.divgifs}>
          <h1 style={style.title}>Scan a flat surface with your device</h1>
          <img src={gifScan} style={style.imgGifs} />
        </div>
      )}
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
  divgifs: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  imgGifs: {
    maxWidth: '100%', height: 'auto'
  },
  title: {
    color: '#FFF',
    textAlign: 'center',
    top: '10px',
  }
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


