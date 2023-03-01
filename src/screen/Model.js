import React, { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import axios from "axios";
import { Box3, Vector3 } from "three";

export default function Model(props) {
  const gltf = useLoader(GLTFLoader, props.model);

  var box = new THREE.Box3().setFromObject(gltf.scene);
  var size1 = new THREE.Vector3();
  box.getSize(size1);

  const [test, setTest] = useState({
    sizeX: size1.x,
    sizeY: size1.y,
    sizeZ: size1.z,
  });

  const sizeTime = props.size / Math.max(test.sizeX, test.sizeY, test.sizeZ);

  const test4 = sizeTime * Math.max(test.sizeX, test.sizeY, test.sizeZ);

  console.log(sizeTime, "size de 1");

  console.log(test4, "size normal");

  gltf.scene.scale.set(sizeTime, sizeTime, sizeTime);
  return (
    <primitive
      object={gltf.scene}
      rotation={[0, (props.rotation * Math.PI) / 180, 0]}
    />
  );
}
