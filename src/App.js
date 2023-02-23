import React, { Suspense, useState } from 'react';
import {
  ZapparCamera, InstantTracker, ZapparCanvas, BrowserCompatibility, Loader,
} from '@zappar/zappar-react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'
import { Float } from '@react-three/drei';


// const Model = () => {
//   const clock = new THREE.Clock()
//   const gltf = useLoader(GLTFLoader, './assets/waving.glb')

// };

function App() {
  const [placementMode, setPlacementMode] = useState(true);

  return (
    <>
      <BrowserCompatibility />
      <ZapparCanvas>
        <ZapparCamera />
        <InstantTracker placementMode={placementMode} placementCameraOffset={[0, 0, -5]}>
          <Suspense fallback={null}>
            <Float
              speed={1.4} // Animation speed, defaults to 1
              rotationIntensity={1} // XYZ rotation intensity, defaults to 1
              floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            >
              <mesh position={[0.90, 0, -0.50]}>
                <tetrahedronGeometry />
                <meshStandardMaterial color="hotpink" />
              </mesh>
            </Float>
            <Float
              speed={2} // Animation speed, defaults to 1
              rotationIntensity={1} // XYZ rotation intensity, defaults to 1
              floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
            >
              <mesh position={[-0.90, 0, -0.50]}>
                <tetrahedronGeometry />
                <meshStandardMaterial color="hotpink" />
              </mesh>
            </Float>
          </Suspense>
        </InstantTracker>
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
