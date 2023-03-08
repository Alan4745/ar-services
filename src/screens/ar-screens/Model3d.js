import { useLoader } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
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

  console.log(props.model);

  useEffect(() => {
    console.log("estamos dentro del useEffect 2");
    // console.log(size1);
    setSizeCordenadas({
      sizeX: size1.x,
      sizeY: size1.y,
      sizeZ: size1.z,
    });
  }, [props.model, gltf]);

  const scaleModel =
    1 /
    Math.max(sizeCordenadas.sizeX, sizeCordenadas.sizeY, sizeCordenadas.sizeZ);
  const SizeModel =
    scaleModel *
    Math.max(sizeCordenadas.sizeX, sizeCordenadas.sizeY, sizeCordenadas.sizeZ);

  // console.log(scaleModel, "size de 1");
  // console.log(SizeModel, "size normal");

  gltf.scene.scale.set(scaleModel, scaleModel, scaleModel);

  console.log(scaleModel);

  return <primitive object={gltf.scene} />;
}

export default Model3d;
