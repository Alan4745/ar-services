import React, { useEffect, useState, memo, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

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

  const [touchStart, setTouchStart] = useState(null);
  const [touchMove, setTouchMove] = useState(null);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    setTouchMove({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
    setTouchMove(null);
  };

  useEffect(() => {
    if (touchStart && touchMove) {
      const diffX = touchMove.x - touchStart.x;
      const diffY = touchMove.y - touchStart.y;
      const threshold = 10;
      if (Math.abs(diffX) > threshold || Math.abs(diffY) > threshold) {
        const newScale = diffX > 0 ? props.scale1 * 0.9 : props.scale1 * 1.1;
        props.setScale(newScale);
        setTouchStart(touchMove);
      }
    }
  }, [touchMove]);

  return (
    <primitive
      object={gltf.scene}
      scale={props.scale1}
      rotation={[0, (180 * Math.PI) / 180, 0]}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
  );
}

export default memo(Model3d);
