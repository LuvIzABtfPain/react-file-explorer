import {CiCircleMinus} from "react-icons/ci";
import folderStructureData, {deleteById} from "../structureData/structure.js";
import { CiFileOn } from "react-icons/ci";


export default function File({ item, onChangeData }) {

    const handleDelete = (id) => {
        deleteById(folderStructureData, id)
        onChangeData({...folderStructureData})
    }

    return (
        <div className={"flex items-center gap-2 p-0.5"}>
            <div className={"flex items-center"}>
            <CiFileOn/>
            <span>{item.name}</span>
            </div>
            <CiCircleMinus  onClick={() => handleDelete(item.id)}  title={"Delete"} className={"text-red-500"} />
        </div>
    );
}
