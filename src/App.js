import axios from 'axios';
import React, { Suspense, useState } from 'react';
import { deleteFile, uploadFile } from './firebase/config'
import Ar from './screen/Ar';
import Model from './screen/Model';


function App() {
  const [file, setFile] = useState(null);
  const [urlfile, setUrlFile] = useState(null);
  const [path, setPath] = useState(null);
  const [modelCargado, setModelCargado] = useState(false)

  const handleSumit = async (e) => {
    e.preventDefault()
    console.log('subiendo archivo')
    // const result = await uploadFile(file)
    // console.log(result)

    try {
      const result = await uploadFile(file);
      console.log(result.url);
      console.log(result.metaData.fullPath);
      setUrlFile(result.url);
      setPath(result.metaData.fullPath);
      setModelCargado(true)
    } catch (error) {
      console.log(error);
    }
  }

//   axios.get('https://firebasestorage.googleapis.com/v0/b/lndmrk-64e90.appspot.com/o/3D%2F645a074a-10e3-45e0-844a-e148f3a44acc.glb?alt=media&token=de935f91-1657-4e86-b5be-2c4c886a6be7', {
//     "Access-Control-Allow-Origin": "*"
// })
//     .then(function (response) {
//       // handle success
//       console.log(response);
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     })

  return (
    <>
      {
        !modelCargado ?
          <div>
            <h1>Estamos en la pantalla de inicio</h1>
            <form onSubmit={handleSumit}>
              <input
                type="file"
                name=''
                id=''
                onChange={e => setFile(e.target.files[0])} />
              <button>upload</button>
            </form>
            <button onClick={() => { deleteFile('4d0bf7e3-7314-42c0-8e16-83c918d656b4.glb') }}>Delete</button>
          </div>
          :
          <>
            <Ar url={urlfile} />
          </>
      }
    </>
  );
}

export default App;
