import React, { Suspense, useState } from 'react';
import {
  ZapparCamera, InstantTracker, ZapparCanvas, BrowserCompatibility, Loader,
} from '@zappar/zappar-react-three-fiber';
import { Float } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three'
import glb from './assets/waving.glb'
import gbl1 from './assets/old_rusty_car.glb'
import gbl2 from './assets/male_person.glb'
import gbl3 from './assets/the_big_g_building.glb'

const Model = (props) => {
  // const clock = new THREE.Clock()
  console.log(props.model)
  const gltf = useLoader(GLTFLoader, props.model);
  // const mixer = new THREE.AnimationMixer(gltf.scene)

  // var action = mixer.clipAction(gltf.animations[0])
  // action.play()

  // useFrame(() => mixer.update(clock.getDelta()))

  // console.log(gltf.animations)
  return <primitive object={gltf.scene} scale={1} rotation={[0, 75 * Math.PI / 180, 0]} />
}

function App() {
  // const gltf = useLoader(GLTFLoader, data);
  const [data, setData] = useState(glb);

  const [placementMode, setPlacementMode] = useState(true);
  const [test, setTest] = useState(false);
  console.log(glb)

  var url = 'https://api.sketchfab.com/v3/models/ba2b84dbcded4f309ad14f39e2c83932/download';
  var options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${'zljrX7JwA8Qhcz3aUpfYpqj8XHgLW7'}`,
    },
    mode: 'cors'
  };

  fetch(url, options).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
  });


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
              <Model prueba={test} model={data} />
              {/* return <primitive object={gltf.scene} scale={0.1} rotation={[0, 75 * Math.PI / 180, 0]} /> */}

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
      <div id="buton-change"
        role='button'
        tabIndex={0}
        onClick={() => { setData(gbl2)}}
      > 
        Change Model
      </div>
    </>
  );
}

export default App;
