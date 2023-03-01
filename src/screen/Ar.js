import React, { Suspense, useState } from 'react'
import {
    ZapparCamera, InstantTracker, ZapparCanvas, BrowserCompatibility, Loader,
} from '@zappar/zappar-react-three-fiber';
import { Float } from '@react-three/drei';
import glb from '../assets/waving.glb'
import gbl1 from '../assets/old_rusty_car.glb'
import gbl2 from '../assets/male_person.glb'
import gbl3 from '../assets/the_big_g_building.glb'
import gbl4 from '../assets/cyberpunk_card.glb'
import Model from './Model';

export default function Ar(props) {

    // const gltf = useLoader(GLTFLoader, data);
    const [data, setData] = useState(glb);

    const [placementMode, setPlacementMode] = useState(true);
    const [modelUrls, setModelUrls] = useState([
        { url: gbl4 },
        { url: '/path/to/model2.gltf' },
        { url: '/path/to/model3.gltf' },
    ]);

    const [value, setValue] = useState(1); // Valor inicial del slider
    const [ejeY, setEjeY] = useState([0, 0.50, 0]);
    const [rotacion, setRotacion] = useState(0);
    const [size1, setSize1] = useState(1);

    const handleChange = (event) => {
        setValue(event.target.value); // Actualizar el valor del slider
    };

    const handleChange1 = (event) => {
        // setEjeY(event.target.value); // Actualizar el valor del slider
        const newArray = [...ejeY];
        newArray[1] = event.target.value;
        setEjeY(newArray);

        console.log(newArray)
    };

    const handleChange2 = (event) => {
        setRotacion(event.target.value); // Actualizar el valor del slider
    };

    
    const handleChange3 = (event) => {
        setSize1(event.target.value); // Actualizar el valor del slider
    };

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
                            <Model model={props.url} size={size1} posicion={ejeY} rotation={rotacion} />

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
            {/* <div id="buton-change"
                role='button'
                tabIndex={0}
            // onClick={() => { data !== 'gbl4' ? setData(gbl4) : setData(gbl3) }}
            >
                <button style={{ width: '50%' }} onClick={() => { setData(gbl1) }}>
                    model 1
                </button>
                <button style={{ width: '50%' }} onClick={() => { setData(gbl2) }}>
                    model 2
                </button>
                <button style={{ width: '50%' }} onClick={() => { setData(gbl3) }}>
                    model 3
                </button>
                <button style={{ width: '50%' }} onClick={() => { setData(gbl4) }}>
                    model 4
                </button>

            </div> */}
            <div id="change_size">
                <input type="range" min="0" max="360" value={rotacion} onChange={handleChange2} />
                <label>rotation: {rotacion}</label>
            </div>
            {/* <div id="change_posicion">
                <input type="range" min="-5" max="5" step="0.01" value={ejeY[1]} onChange={handleChange1} />
                <label>ejeY: {ejeY[1]}</label>
            </div> */}
            <div id="change_rotacion">
                <input type="range" min="0" max="5" step="0.01" value={size1} onChange={handleChange3} />
                <label>size: {size1}</label>
            </div>
        </>
    );
}