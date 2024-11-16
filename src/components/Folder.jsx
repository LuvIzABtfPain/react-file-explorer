import { useState } from 'react';
import File from './File';
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import folderStructureData, {deleteById, findById} from "../structureData/structure.js";
import {MdOutlineArrowDropDown, MdOutlineArrowRight} from "react-icons/md";


export default function Folder({ item , onChangeData}) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleAddFolder = (parentFolderId) => {
        console.log('folderStructureData', folderStructureData)
        const res = findById(folderStructureData, parentFolderId)
        console.log('res', res)

        const newFolder = {
            id: Date.now().toString(),
            name: Date.now().toString(),
            isFolder: true,
            items: []
        }

        if(!res) {return}

        res.items.push(newFolder)
        onChangeData({...folderStructureData})
    };

    const handleAddFile = (parentFolderId) => {
        console.log('onChangeData', onChangeData)
        const res = findById(folderStructureData, parentFolderId)
        const newFile = {
            id: Date.now().toString(),
            name: Date.now().toString(),
            isFolder: false
        }

        if(!res) {return}

        for(const item of res.items) {
            if(!item.isFolder && (item.name === newFile.name)) {
                alert("File already exist")
                return
            }
        }
        res.items.push(newFile)
        onChangeData({...folderStructureData})
    };

    const handleDelete = (id) => {
        // const res = findParent(folderStructureData, id)
        // const res = deleteByID(id)
        // if(!res) return
        deleteById(folderStructureData, id)
        onChangeData({...folderStructureData})

        // res.items = res.items.filter(item => item.id !== id)
    }

    return (
        <>
            <div className={"flex items-center gap-2 cursor-pointer p-0.5 bg-gray-300"}>
                <div className={"flex items-center"} onClick={() => setIsExpanded((prevState) => !prevState)}>
                {isExpanded ? <MdOutlineArrowDropDown className="transform transition-transform duration-200"/> : <MdOutlineArrowRight className="transition-transform duration-200"/>}
                <span>
                    {item.name}
                </span>
                </div>
                <div className={'flex items-center gap-2'}>
                <IoIosAddCircleOutline onClick={() => handleAddFolder(item.id)} title={"Add Folder"} className={"text-blue-500"}/>
                <IoIosAddCircleOutline onClick={() => handleAddFile(item.id)} title={"Add File"} className={"text-green-500"}/>
                <CiCircleMinus  onClick={() => handleDelete(item.id)}  title={"Delete"} className={"text-red-500"} />
                </div>
            </div>


            <div className={"pl-3"}
            >
                {isExpanded &&
                    item.items.map((item) =>
                        item.isFolder ? <Folder onChangeData={onChangeData} key={item.id} item={item} /> : <File onChangeData={onChangeData} key={item.id} item={item} />
                    )}
            </div>
        </>
    );
}


