import React, { useEffect, useState, memo, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

function Model3d(props) {
  const gltf = useLoader(GLTFLoader, props.model);

  const boxRef = useRef(new THREE.Box3().setFromObject(gltf.scene));

  useEffect(() => {
    boxRef.current.setFromObject(gltf.scene);
  }, [props.model]);

  const size1 = new THREE.Vector3();
  boxRef.current.getSize(size1);

  const [sizeCordenadas, setSizeCordenadas] = useState({
    sizeX: size1.x,
    sizeY: size1.y,
    sizeZ: size1.z,
  });

  useEffect(() => {
    setSizeCordenadas({
      sizeX: size1.x,
      sizeY: size1.y,
      sizeZ: size1.z,
    });
  }, [props.model]);

  const scaleModel =
    props.size /
    Math.max(sizeCordenadas.sizeX, sizeCordenadas.sizeY, sizeCordenadas.sizeZ);

  // const SizeModel =
  //   scaleModel *
  //   Math.max(sizeCordenadas.sizeX, sizeCordenadas.sizeY, sizeCordenadas.sizeZ);

  // console.log(SizeModel, "SizeModel");

  console.log(scaleModel, "scaleModel");

  return (
    <primitive
      object={gltf.scene}
      scale={scaleModel}
      rotation={[0, (90 * Math.PI) / 180, 0]}
    />
  );
}

export default memo(Model3d);
