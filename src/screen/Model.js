import React from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three'
import axios from 'axios';


export default function Model(props) {
  console.log(props.model)



  // axios.get('https://firebasestorage.googleapis.com/v0/b/lndmrk-64e90.appspot.com/o/3D%2F645a074a-10e3-45e0-844a-e148f3a44acc.glb?alt=media&token=de935f91-1657-4e86-b5be-2c4c886a6be7')
  //   .then(function (response) {
  //     // handle success
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   })


  const gltf = useLoader(GLTFLoader, props.model);
  // const mixer = new THREE.AnimationMixer(gltf.scene)

  // var action = mixer.clipAction(gltf.animations[0])
  // action.play()

  // useFrame(() => mixer.update(clock.getDelta()))

  // console.log(gltf.animations)
  console.log(props.size)

  return (
    <primitive object={gltf.scene} scale={props.size} position={props.posicion} rotation={[0, 0 * Math.PI / 180, 0]} />
  )
}
