import { Gltf } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React, { useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

function Model3d(props) {
  const gltf = useLoader(GLTFLoader, props.model);
  var box = new THREE.Box3().setFromObject(gltf.scene);
  var size1 = new THREE.Vector3();
  box.getSize(size1);

  const [sizeCordenadas, setSizeCordenadas] = useState({
    sizeX: size1.x,
    sizeY: size1.y,
    sizeZ: size1.z,
  });

  const scaleModel =
    1 /
    Math.max(sizeCordenadas.sizeX, sizeCordenadas.sizeY, sizeCordenadas.sizeZ);
  gltf.scene.scale.set(scaleModel, scaleModel, scaleModel);

  return <primitive object={gltf.scene} />;
}

export default Model3d;
