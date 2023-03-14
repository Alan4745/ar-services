import React, { useEffect, useState, memo, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { createUseGesture } from "@use-gesture/react";
import { pinchAction } from "@use-gesture/react/dist/declarations/src";

function Model3d(props) {
  const gltf = useLoader(GLTFLoader, props.model);

  const boxRef = useRef(new THREE.Box3().setFromObject(gltf.scene));
  const size1 = new THREE.Vector3();

  boxRef.current.getSize(size1);

  useEffect(() => {
    boxRef.current.setFromObject(gltf.scene);
  }, [props.model]);

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
    2 /
    Math.max(sizeCordenadas.sizeX, sizeCordenadas.sizeY, sizeCordenadas.sizeZ);

  const SizeModel =
    scaleModel *
    Math.max(sizeCordenadas.sizeX, sizeCordenadas.sizeY, sizeCordenadas.sizeZ);

  console.log(SizeModel, "SizeModel");

  console.log(scaleModel, "scaleModel");

  const useGesture = createUseGesture([pinchAction]);

  return (
    <group>
      <primitive
        object={gltf.scene}
        scale={props.scale1}
        rotation={[0, (180 * Math.PI) / 180, 0]}
      />
    </group>
  );
}

export default memo(Model3d);
