/* eslint-disable react-hooks/rules-of-hooks */
import {
  Circle,
  Html,
  OrbitControls,
  Sky,
  useProgress,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { createRef, Suspense, useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import modelDefault from "../../assets/test.glb";
import * as THREE from "three";
import SaveIcon from "@mui/icons-material/Save";
import ReplayIcon from "@mui/icons-material/Replay";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Button from "@mui/material/Button";
import { uploadFile, deleteFile } from "../../API/firebase/config";
import Model3d from "./Model3d";
import { SaveModel3D } from "../../API/ArServiceApis";

const Model3D = (props) => {
  const gltf = useLoader(GLTFLoader, props.model3D);
  const [animation1, setAnimation1] = useState(false);
  var box = new THREE.Box3().setFromObject(gltf.scene);
  var size1 = new THREE.Vector3();
  box.getSize(size1);

  const [test, setTest] = useState({
    sizeX: size1.x,
    sizeY: size1.y,
    sizeZ: size1.z,
  });

  useEffect(() => {
    // console.log("estamos dentro del useEffect");
    // console.log(size1);
    setTest({
      sizeX: size1.x,
      sizeY: size1.y,
      sizeZ: size1.z,
    });
  }, [props.model3D]);

  // console.log(props.model3D);

  // if (gltf.animations.length !== 0) {
  //   const clock = new THREE.Clock();
  //   const mixer = new THREE.AnimationMixer(gltf.scene);
  //   var action = mixer.clipAction(gltf.animations[0]);
  //   action.play();
  //   useFrame(() => mixer.update(clock.getDelta()));
  // }

  const sizeTime =
    (props.size * 2) / Math.max(test.sizeX, test.sizeY, test.sizeZ);

  const test4 = sizeTime * Math.max(test.sizeX, test.sizeY, test.sizeZ);

  // console.log(sizeTime, "size de 1");

  // console.log(test4, "size normal");

  gltf.scene.scale.set(sizeTime, sizeTime, sizeTime);

  return <primitive object={gltf.scene} />;
};

const Loader = () => {
  const { progress } = useProgress();
  console.log(progress);
  return (
    <Html center style={{ color: "#FFFFFF" }}>
      {progress} % loaded
    </Html>
  );
};

const Viewer3D = () => {
  const [file, setFile] = useState(null);
  const inputRef = createRef();
  const [disable, setDisable] = useState(false);
  const [urlfile, setUrlFile] = useState(
    `${modelDefault}?timestamp=${Date.now()}`
  );
  const [path, setPath] = useState(null);
  const [size1, setSize1] = useState(1);

  const [replay, setReplay] = useState(true);
  const [save, setSave] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showPorcet, setShowPorcet] = useState(false);
  const [rotation, setrotation] = useState([0, 0, 0]);

  const handleSumit = async (e) => {
    setDisable(true);
    setShowPorcet(true);
    e.preventDefault();
    console.log("subiendo archivo");

    try {
      const result = await uploadFile(file, setProgress);
      console.log(result);
      console.log(result.url);
      console.log(result.metaData.fullPath);
      setUrlFile(result.url);
      setPath(result.metaData.fullPath);
      setReplay(false);
      setSave(false);
      setShowPorcet(false);
      setProgress(0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange3 = (event) => {
    setSize1(event.target.value); // Actualizar el valor del slider
  };

  const submitExpAr = async () => {
    console.log("Estamos subiendo los datos a la base de datos");

    const result = await SaveModel3D(
      urlfile,
      path,
      size1,
      rotation[0],
      rotation[1],
      rotation[2]
    );

    console.log(result);
  };

  const rebootSetting = async () => {
    console.log("estamos reniciando las configuraciones");
    // console.log(path);

    try {
      const result = await deleteFile(path);
      console.log(result);
      setFile(null);
      setDisable(false);
      setReplay(true);
      setSave(true);
      inputRef.current.value = "";
      setUrlFile(`${modelDefault}?timestamp=${Date.now()}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={style.container}>
        <Canvas camera={{ position: [1, 1.5, 1] }}>
          {/* <Sky azimuth={1} inclination={0.6} distance={1000} /> */}
          <ambientLight intensity={1} />

          <directionalLight position={[0, 2, 2]} />
          <directionalLight position={[0, 2, -2]} />

          <Suspense fallback={<Loader />}>
            {/* <Model3D model3D={urlfile} size={size1} /> */}
            <Model3d model={urlfile} size={size1} />

            <OrbitControls />
          </Suspense>
        </Canvas>
      </div>
      <div style={style.modalFloat}>
        <p style={style.info}>currently only supports .glb files</p>
        <form style={style.formStyle} onSubmit={handleSumit}>
          <input
            type="file"
            style={style.inputFile}
            ref={inputRef}
            disabled={disable}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            variant="contained"
            type="submit"
            size="small"
            disabled={disable}
            endIcon={<DriveFolderUploadIcon />}
          >
            {showPorcet ? (
              <div style={{ color: "#FF0000" }}>
                uploading {progress.toFixed(2)}%
              </div>
            ) : (
              <> Upload File</>
            )}
          </Button>
          <div style={style.containerButoon}>
            <Button
              disabled={replay}
              variant="contained"
              size="small"
              color="error"
              endIcon={<ReplayIcon />}
              onClick={() => {
                rebootSetting();
              }}
            >
              Replay
            </Button>
            <Button
              disabled={save}
              variant="contained"
              size="small"
              color="success"
              endIcon={<SaveIcon />}
              onClick={() => {
                submitExpAr();
              }}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

const style = {
  container: {
    height: "100vh",
    backgroundColor: "#000",
  },
  modalFloat: {
    position: "absolute",
    borderRadius: "25px",

    backgroundColor: "#fff",
    height: "200px",
    zIndex: "1000",
    width: "350px",
    display: "flex",
    justifyContent: "center",
    padding: "10px",
    flexDirection: "column",
    alignItems: "center",
    bottom: "-50px",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  inputFile: {
    color: "red",
    backgroundColor: "#fff",
    borderRadius: "5px",
    margin: "10px 0px",
  },
  formStyle: {
    display: "flex",
    flexDirection: "column",
  },
  containerButoon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: "10px 0px",
  },
  info: {
    color: "#7D7D7D",
    margin: "0px 0px",
    fontStyle: "italic",
  },
};

export default Viewer3D;
