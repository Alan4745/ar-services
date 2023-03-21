/* eslint-disable react-hooks/rules-of-hooks */

import { Html, OrbitControls, useCursor, useProgress } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { createRef, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import modelDefault from "../../assets/test.glb";
import * as THREE from "three";
import SaveIcon from "@mui/icons-material/Save";
import ReplayIcon from "@mui/icons-material/Replay";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Button from "@mui/material/Button";
import { uploadFile, deleteFile } from "../../API/firebase/config";
import { SaveModel3D } from "../../API/ArServiceApis";
import { useNavigate } from "react-router-dom";

import imgHost from '../../assets/hotspot.png'
import JSZip from "jszip";
import { Input } from "semantic-ui-react";
import { InputBase } from "@mui/material";
import { borderRadius } from "@mui/system";

const Model3D = (props) => {
  const gltf = useLoader(GLTFLoader, props.model);
  const clock = new THREE.Clock()
  const mixer = new THREE.AnimationMixer(gltf.scene)
  const navigate = useNavigate();
  let box = new THREE.Box3().setFromObject(gltf.scene);
  let size = new THREE.Vector3();
  box.getSize(size);

  const [sizeXYZ, setSizeXYZ] = useState({
    sizeX: size.x,
    sizeY: size.y,
    sizeZ: size.z,
  });
  const [sizeDb, setSizeDb] = useState(1);
  const [escaleDb, setEscaleDb] = useState(1);
  const [rotacion, setRotacion] = useState([0, 0, 0]);
  const [position1, setPosition1] = useState([0, 0, 0]);
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  useEffect(() => {
    setSizeXYZ({
      sizeX: size.x,
      sizeY: size.y,
      sizeZ: size.z,
    });
  }, [props.model]);

  useEffect(() => {
    const submitExpAr = async () => {
      console.log("Estamos subiendo los datos a la base de datos");

      const result = await SaveModel3D(
        props.model,
        props.path,
        sizeDb * 2,
        escaleDb * 2,
        rotacion[0],
        rotacion[1],
        rotacion[2]
      );
      console.log(result);
      console.log(result.message._id);
      navigate(`/test/${result.message._id}`);
    };

    if (props.upExp) {
      console.log("Estamos subiendo a la base de datos");
      submitExpAr();
    }
    setEscaleDb(scaleModel1);
    setSizeDb(sizeModel1);
  }, [props.upExp, size]);

  const scaleModel1 = 1 / Math.max(sizeXYZ.sizeX, sizeXYZ.sizeY, sizeXYZ.sizeZ);

  const sizeModel1 =
    scaleModel1 * Math.max(sizeXYZ.sizeX, sizeXYZ.sizeY, sizeXYZ.sizeZ);

  const animate = () => {
    mixer.update(clock.getDelta());
    requestAnimationFrame(animate);
  };

  if (props.imgUp) {
    console.log('subiendo la experiencia')
  } else {
    if (gltf.animations.length > 0) {
      const action = mixer.clipAction(gltf.animations[0])
      action.play()

      // start the animation loop
      animate();

    }
  }
  return (
    <primitive
      scale={scaleModel1}
      object={gltf.scene}
      onTouchStart={() => {
        console.log("estamos dando toques al modelos 3d");
      }}
    />
  );
};

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center style={{ color: "#FFFFFF" }}>
      {progress} % loaded
    </Html>
  );
};

const Floor = () => {
  const floorRef = useRef();

  useFrame(() => {
    floorRef.current.position.y = -0.1
  })

  const texture = useMemo(() => new THREE.TextureLoader().load(imgHost), [imgHost]);

  return (
    <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[3, 3]} />
      <meshStandardMaterial attach="material" map={texture} transparent={true} />
    </mesh>
  )
}


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
  const controlsRef = useRef();
  const [initialPosition, setInitialPosition] = useState([1, 1.5, 1]);
  const [upLoadExp, setupLoadExp] = useState(false);
  const [imageUp, setImageUp] = useState(false);
  const [urlSketchab, setUrlSketchab] = useState(null);

  const handleSumit = async (e) => {
    setDisable(true);
    setShowPorcet(true);
    setImageUp(true)
    e.preventDefault();
    console.log("subiendo archivo");

    try {
      const result = await uploadFile(file, setProgress);

      setUrlFile(result.url);
      setPath(result.metaData.fullPath);
      setReplay(false);
      setSave(false);
      setShowPorcet(false);
      setImageUp(false)
      setProgress(0);
      handleReset();
    } catch (error) {
      console.log(error);
    }
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
      handleReset();
      setUrlFile(`${modelDefault}?timestamp=${Date.now()}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    const controls = controlsRef.current;
    controls.reset();
    controls.object.position.fromArray(initialPosition);
    controls.update();
  };

  useEffect(() => {
    test(urlSketchab)

  }, [urlSketchab]);


  const CLIENT_ID = 'vagG6eINsnorKHmdlGd4iUbs2kiGvlULCKsclozk';
  const AUTHENTICATION_URL = `https://sketchfab.com/oauth2/authorize/?state=123456789&response_type=token&client_id=${CLIENT_ID}`;

  function authenticate() {
    window.open(AUTHENTICATION_URL, '_blank');
  }

  async function getModelDownloadUrl(inputUrl) {
    // Extract the model ID from the URL
    const input = new URL(inputUrl);
    // The ID is always the last string when seperating by '-'
    const pieces = input.pathname.split('-');
    const modelID = pieces[pieces.length - 1];
    const token = localStorage.getItem('sketchfab_token');

    // console.log(modelID, 'modelID')

    const metadataUrl = `https://api.sketchfab.com/v3/models/${modelID}/download`;
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: 'cors'
    };

    // This call will fail if model can't be downloaded
    const response = await fetch(metadataUrl, options);
    // console.log(response);
    const metadata = await response.json();
    console.log(metadata.glb.url)
    return metadata.glb.url;
  }

  async function getFileUrl(file) {
    const blob = await file.async('blob');
    const url = URL.createObjectURL(blob);
    return url;
  }


  async function test(url) {
    console.log(url);
    if (url) {
      console.log('estamos dentro del if')

      const result = await getModelDownloadUrl(url)
      const response = await fetch(result)

      const fileblob = await response.blob()

      console.log(fileblob)

      try {
        const result = await uploadFile(fileblob, setProgress);

        setUrlFile(result.url);
        setPath(result.metaData.fullPath);
        setReplay(false);
        setSave(false);
        setShowPorcet(false);
        setImageUp(false)
        setProgress(0);
        handleReset();
      } catch (error) {
        console.log(error);
      }

    } else {
      console.log('estamos dentro del else');
    }


  }

  useEffect(() => {

  }, []);

  function getExtension(filename) {
    return filename.toLowerCase().split('.').pop();
  }

  async function readZip(zipUrl) {
    const response = await fetch(zipUrl)
    console.log(response)

    const arrayBuffer = await response.arrayBuffer();

    console.log(arrayBuffer)



    const result = await JSZip.loadAsync(arrayBuffer);
    console.log(result)

    const files = Object.values(result.files).filter(item => !item.dir);
    console.log(files)

    const entryFile = files.find(f => getExtension(f.name) === 'gltf')
    console.log(entryFile)

    const blobUrls = {};
    console.log(blobUrls)

    for (const file of files) {
      console.log(`Loading ${file.name}...`);
      blobUrls[file.name] = await getFileUrl(file)
    }
    const fileUrl = blobUrls[entryFile.name];

    console.log(fileUrl)


    const loadingManager = new THREE.LoadingManager();
    loadingManager.setURLModifier((url) => {
      const parsedUrl = new URL(url);
      const origin = parsedUrl.origin;
      const path = parsedUrl.pathname;
      const relativeUrl = path.replace(origin + '/', "");

      if (blobUrls[relativeUrl] != undefined) {
        return blobUrls[relativeUrl];
      }

      return url
    });

    console.log(loadingManager)

  }


  return (
    <>
      <div style={style.container}>
        <Canvas camera={{ position: [1, 1.5, 1] }}>
          {/* <Sky azimuth={1} inclination={0.6} distance={1000} /> */}
          <ambientLight intensity={0.1} />

          <directionalLight intensity={0.5} position={[0, 0.5, 2]} />
          <directionalLight intensity={0.5} position={[-1, 0.5, 1]} />
          <directionalLight intensity={0.5} position={[1, 0.5, 1]} />
          <directionalLight intensity={0.5} position={[2, 0.5, 0]} />
          <directionalLight intensity={0.5} position={[-2, 0.5, 0]} />
          <directionalLight intensity={0.5} position={[0, 0.5, -2]} />
          <directionalLight intensity={0.5} position={[1, 0.5, 1]} />
          <directionalLight intensity={0.5} position={[-1, 0.5, -1]} />

          <Suspense fallback={null}>
            {/* <Model3d model={urlfile} size={size1} /> */}
            <Model3D
              model={urlfile}
              path={path}
              size={size1}
              upExp={upLoadExp}
              imgUp={imageUp}
            />
            <Floor />
            <OrbitControls ref={controlsRef} />
          </Suspense>
        </Canvas>
      </div>
      <div style={style.modalFloat}>
        {/* <p style={style.info}>currently only supports .glb files</p> */}
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
                setupLoadExp(true);
              }}
            >
              Save
            </Button>


          </div>
        </form>
        <InputBase style={style.inputBase} size='medium' type='text' placeholder="ingresa al link" fullWidth={true}
          onChange={(e) => { setUrlSketchab(e.target.value) }} />

        {/* <Button onClick={() => { authenticate() }}>
          login sketchfab
        </Button> */}
        {/* <input type='text' placeholder="model link" /> */}

      </div>
      <div style={style.modalLoginSke}>
        <Button
          variant="contained"
          type="submit"
          size="small"
          onClick={() => { authenticate() }}>
          login sketchfab
        </Button>
        {/* <input type='text' placeholder="model link" /> */}
        {/* <InputBase style={style.inputBase} size='small' type='text' placeholder="ingresa al link" /> */}

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
  modalLoginSke: {
    position: "absolute",
    borderRadius: "10px",
    backgroundColor: "#fff",
    height: "50px",
    zIndex: 1000,
    width: "200px",
    top: '10px',
    right: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
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
  inputBase: {
    color: 'red',
    backgroundColor: 'lightgrey',
    padding: '1px 5px',
    borderRadius: '5px',
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
