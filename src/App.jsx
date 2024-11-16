import './App.css';

import Folder from './components/Folder';
import File from './components/File';

import folderStructureData, {findById} from './structureData/structure.js';
import {useMemo, useState} from "react";
import Description from "./components/Description.jsx";
import {CiFileOn} from "react-icons/ci";

function App() {
    const [data, setData] = useState(folderStructureData)
    const [selectedId, setSelectId] = useState(null)
    // const [selectedFile, setSelectedFile] = useState(null)

    const selectedFile = useMemo(() => {
        if(!selectedId)
            return null
        return findById(data, selectedId)
    }, [selectedId, data])

    const onChangeData = (newData) => {
         setData(newData)
    }

    const handleAddRootFolder = () => {
        const newFolder = {
            id: Date.now().toString(),
            name: `${Date.now()}`,
            isFolder: true,
            items: []
        };
        data.items.push(newFolder);
        onChangeData({ ...data });
    };

    const handleAddRootFile = () => {
        const newFile = {
            id: Date.now().toString(),
            name: `${Date.now()}`,
            isFolder: false,
            content: '',
        };
        data.items.push(newFile);
        onChangeData({ ...data });
    };

    return (
        <>
            <Description />
            <div className={"flex gap-4"}>
                <div className={"p-2 border-2 border-gray-500 lg:w-1/4 h-[70vh] overflow-auto"}>
                    <div>
                        <button
                            onClick={handleAddRootFolder}
                            className="m-2 bg-green-500 hover:bg-green-700 text-white py-2 px-4 border border-green-700 rounded">
                            Add root folder
                        </button>
                        <button
                            onClick={handleAddRootFile}
                            className="m-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded">
                            Add root file
                        </button>
                        <button
                            className="m-2 bg-red-500 hover:bg-red-700 text-white py-2 px-4 border border-red-700 rounded">
                            Select files to delete
                        </button>
                    </div>
                    {data.items.map((item) => {
                        return item.isFolder ? <Folder
                            selectedId={selectedId}
                            onChangeSelectedId={setSelectId}
                                onChangeData={onChangeData} key={item.id} item={item}/> :
                            <File onChangeData={onChangeData}
                                  selectedId={selectedId}
                                  key={item.id} item={item}
                                  onChangeSelectedId={setSelectId}
                            />;
                })}
                </div>
                <div className={"p-2 flex-1 border-2 border-gray-500 h-[70vh] overflow-auto"}>
                    {selectedFile && <div>
                        <div className={"flex items-center gap-2 p-0.5 border border-black"}>
                            <CiFileOn/>
                            <h2>{selectedFile.name}</h2>
                        </div>
                        <div className={"mt-2"}>{selectedFile.content}</div>
                    </div>}
                </div>
            </div>
        </>
    );
}

export default App;
