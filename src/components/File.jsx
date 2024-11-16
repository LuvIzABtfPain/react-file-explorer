import {CiCircleMinus} from "react-icons/ci";
import folderStructureData, {deleteById} from "../structureData/structure.js";
import { CiFileOn } from "react-icons/ci";
import {clsx} from 'clsx';

export default function File({ item, onChangeData, selectedId, onChangeSelectedId }) {
    const handleDelete = (id) => {
        deleteById(folderStructureData, id)
        onChangeData({...folderStructureData})
    }

    const handleClickFile = () => {
        onChangeSelectedId(item.id)
    }

    return (
        <div
            onClick={handleClickFile}
            className={clsx('flex items-center gap-2 p-0.5', { 'bg-gray-200': selectedId === item.id })}>
            <div className={"flex items-center"}>
            <CiFileOn/>
            <span>{item.name}</span>
            </div>
            <CiCircleMinus  onClick={() => handleDelete(item.id)}  title={"Delete"} className={"text-red-500"} />
        </div>
    );
}
