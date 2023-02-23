import React, { Suspense, useState } from 'react';
import {
  ZapparCamera, InstantTracker, ZapparCanvas, BrowserCompatibility, Loader,
} from '@zappar/zappar-react-three-fiber';
import { Float } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three'
import glb from './assets/waving.glb'

const Model = (props) => {
  const clock = new THREE.Clock()
  const gltf = useLoader(GLTFLoader, glb);
  const mixer = new THREE.AnimationMixer(gltf.scene)

  var action = mixer.clipAction(gltf.animations[0])
  action.play()

  useFrame(() => mixer.update(clock.getDelta()))

  // console.log(gltf.animations)
  return <primitive object={gltf.scene} />
}

function App() {
  const [placementMode, setPlacementMode] = useState(true);
  const [test, setTest] = useState(false);
  console.log(glb)

  return (
    <>
      <BrowserCompatibility />
      <ZapparCanvas>
        <ZapparCamera />
        <Suspense fallback={null}>
          <InstantTracker placementMode={placementMode} placementCameraOffset={[0, 0, -5]}>
            <Float
              speed={1.4} // Animation speed, defaults to 1
              rotationIntensity={1} // XYZ rotation intensity, defaults to 1
              floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            >
              {/* <mesh>
                <tetrahedronGeometry />
                <meshStandardMaterial color="hotpink" />
              </mesh> */}
              <Model prueba={test} />
              {/* <primitive object={gltf.scene}/> */}
            </Float>
          </InstantTracker>
        </Suspense>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
        <Loader />
      </ZapparCanvas>
      <div
        id="zappar-button"
        role="button"
        onKeyPress={() => { setPlacementMode(((currentPlacementMode) => !currentPlacementMode)); }}
        tabIndex={0}
        onClick={() => { setPlacementMode(((currentPlacementMode) => !currentPlacementMode)); }}
      >
        Tap here to
        {placementMode ? ' place ' : ' pick up '}
        the object
      </div>
    </>
  );
}

export default App;
