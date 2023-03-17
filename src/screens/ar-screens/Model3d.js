import React, { useEffect, useState, memo, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useGesture } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/three";
import { Html } from "@react-three/drei";

function Model3d(props) {
  const gltf = useLoader(GLTFLoader, props.model);
  const clock = new THREE.Clock()
  const mixer = new THREE.AnimationMixer(gltf.scene)
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
  const [data, setdata] = useState(1);

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

  const animate = () => {
    mixer.update(clock.getDelta());
    requestAnimationFrame(animate);
  };


  console.log('la experiencia no se está subiendo');
  if (gltf.animations.length > 0) {
    console.log('estamos entrando en el if')

    const action = mixer.clipAction(gltf.animations[0])
    action.play()

    // start the animation loop
    animate();

    console.log('se está animando');
  }


  // const [{ scale }, set] = useSpring(() => ({ scale: 1 }));

  return (
    <primitive
      object={gltf.scene}
      scale={props.scale1}
      rotation={[0, (180 * Math.PI) / 180, 0]}
    />
  );
}

export default memo(Model3d);
