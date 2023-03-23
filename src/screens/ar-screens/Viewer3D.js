/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */

import { Html, OrbitControls, useCursor, useProgress } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { createRef, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import modelDefault from "../../assets/test.glb";
import * as THREE from "three";
import { uploadFile, deleteFile } from "../../API/firebase/config";
import { SaveModel3D } from "../../API/ArServiceApis";
import { useNavigate } from "react-router-dom";


const Model3D = (props) => {
  const gltf = useLoader(GLTFLoader, props.model);
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

  // useEffect(() => {
  //   const submitExpAr = async () => {
  //     console.log("Estamos subiendo los datos a la base de datos");

  //     const result = await SaveModel3D(
  //       props.model,
  //       props.path,
  //       sizeDb * 2,
  //       escaleDb * 2,
  //       rotacion[0],
  //       rotacion[1],
  //       rotacion[2]
  //     );
  //     console.log(result);
  //     console.log(result.message._id);
  //     // navigate(`/test/${result.message._id}`);
  //   };

  //   if (props.upExp) {
  //     console.log("Estamos subiendo a la base de datos");
  //     submitExpAr();
  //   }
  //   setEscaleDb(scaleModel1);
  //   setSizeDb(sizeModel1);
  // }, [props.upExp, size]);

  const scaleModel1 = 1 / Math.max(sizeXYZ.sizeX, sizeXYZ.sizeY, sizeXYZ.sizeZ);

  const sizeModel1 =
    scaleModel1 * Math.max(sizeXYZ.sizeX, sizeXYZ.sizeY, sizeXYZ.sizeZ);



  useEffect(() => {
    console.log('a cambiado el tamano');
    setEscaleDb(scaleModel1);
    setSizeDb(sizeModel1);
    console.log(sizeModel1, 'se a cambiando el tamano`')
    console.log(scaleModel1, 'se a cambiando el tamano`')

    const submitExpAr = async () => {
      console.log("Estamos subiendo los datos a la base de datos");

      const result = await SaveModel3D(
        props.model,
        props.path,
        sizeModel1 * 2,
        scaleModel1 * 2,
        rotacion[0],
        rotacion[1],
        rotacion[2]
      );
      console.log(result);
      console.log(result.message._id);
      navigate(`/test/${result.message._id}`);
    };

    if (props.upExp) {
      submitExpAr();
    }

  }, [sizeXYZ]);






  return (
    <primitive
      scale={scaleModel1}
      object={gltf.scene}
      onTouchStart={() => {
        console.log("estamos dando toques al modelos 3d");
      }}
    />
  )
};


const SketchfabWeb = () => {

  // useEffect(() => {
  //   const handleSumit = async () => {
  //     setDisable(true);
  //     setShowPorcet(true);
  //     setImageUp(true)
  //     console.log("subiendo archivo");
  //     console.log(progress);


  //     try {
  //       const result = await uploadFile(test, setProgress);

  //       console.log(result)

  //       setUrlFile(result.url);
  //       setPath(result.metaData.fullPath);
  //       setProgress(0);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  // }, []);


  return (
    <div className="skfb-widget" style={{ height: '100%', }} />
  );

}

const Viewer3D = () => {
  const [urlSketchab, setUrlSketchab] = useState(null);
  const [progress, setProgress] = useState(0);
  const [path1, setPath1] = useState(null);
  const [urlfile, setUrlFile] = useState(
    `${modelDefault}?timestamp=${Date.now()}`
  );
  const [upLoadExp, setupLoadExp] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apps.sketchfab.com/web-importer/sketchfab-importer.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const el = document.querySelector('.skfb-widget');
      const skfbWidget = new SketchfabImporter(el, {
        onModelSelected: function (result) {
          //Do something with the result
          // console.log(result.download.glb.url);
          setUrlSketchab(result.download.glb.url)
        }
      });
    }
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  useEffect(() => {
    console.log(urlSketchab, 'urlSketchab');
    async function downloadModel(url) {
      console.log('Downloading model...');

      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';

      xhr.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setProgress(percentComplete);
        }
      });

      xhr.addEventListener('load', async (event) => {
        const blob = xhr.response;
        console.log('Download complete!', blob);
        const result = await uploadFile(blob, setProgress);

        console.log(result)
        setUrlFile(result.url)
        setPath1(result.metaData.fullPath)
        setupLoadExp(true)
      });

      xhr.send();
    }

    if (urlSketchab !== null) {
      downloadModel(urlSketchab);
    }
  }, [urlSketchab]);




  // useEffect(() => {
  //   console.log(urlSketchab, 'urlSketchab');
  //   async function name(url) {
  //     console.log('estamos entrado en la url')


  //     const response = await fetch(url)


  //     const fileblob = await response.blob()

  //     console.log(fileblob)
  //   }

  //   if (urlSketchab !== null) {
  //     name(urlSketchab)
  //   }
  // }, [urlSketchab]);

  return (
    <>
      {progress > 0 && (
        <div >
          Downloading model... {progress.toFixed(2)}% complete
        </div>
      )}
      <SketchfabWeb />
      <Canvas style={{ position: 'fixed', zIndex: -1 }}>
        <Suspense fallback={null}>
          <Model3D
            model={urlfile}
            path={path1}
            upExp={upLoadExp}
          />
        </Suspense>
      </Canvas>

    </>
  );

}



export default Viewer3D;
