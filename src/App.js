import React, { Suspense, useState } from 'react';
import {
  ZapparCamera, InstantTracker, ZapparCanvas, BrowserCompatibility, Loader , 
} from '@zappar/zappar-react-three-fiber';

function App() {
  const [placementMode, setPlacementMode] = useState(true);
  return (
    <>
      <BrowserCompatibility />
      <ZapparCanvas>
        <ZapparCamera />
        <InstantTracker placementMode={placementMode} placementCameraOffset={[0, 0, -5]}>
        <Suspense fallback={null}>
          <mesh>
            <boxBufferGeometry />
            <meshStandardMaterial color="hotpink" />
          </mesh>
          </Suspense> 
        </InstantTracker>
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
      <Loader />
      </ZapparCanvas>
      {/* <div
        id="zappar-button"
        role="button"
        onKeyPress={() => { setPlacementMode(((currentPlacementMode) => !currentPlacementMode)); }}
        tabIndex={0}
        onClick={() => { setPlacementMode(((currentPlacementMode) => !currentPlacementMode)); }}
      >
        Tap here to
        {placementMode ? ' place ' : ' pick up '}
        the object
      </div> */}
    </>
  );
}

export default App;
