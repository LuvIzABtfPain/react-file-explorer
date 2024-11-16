import './App.css';

import Folder from './components/Folder';
import File from './components/File';

import folderStructureData from './structureData/structure.js';
import {useState} from "react";

function App() {
    const [data, setData] = useState(folderStructureData)

    const onChangeData = (newData) => {
         setData(newData)
    }

    return (
        <>
            <div>
            {data.items.map((item) => {
                return item.isFolder ? <Folder onChangeData={onChangeData} key={item.id} item={item} /> : <File onChangeData={onChangeData} key={item.id} item={item} />;
            })}
            </div>
        </>
    );
}

export default App;
