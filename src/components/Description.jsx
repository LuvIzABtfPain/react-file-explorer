import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";

export default function Description() {
    return (
        <div className={"ml-2 mb-4"}>
            <span>Button List:</span>
            <div className={"flex items-center"}>
                <IoIosAddCircleOutline className={"text-blue-500"}/>
                <span>: Add folder</span>
            </div>
            <div>
                <div className={"flex items-center"}>
                    <IoIosAddCircleOutline className={"text-green-500"}/>
                    <span>: Add file</span>
                </div>
            </div>
            <div>
                <div className={"flex items-center"}>
                    <CiCircleMinus className={"text-red-500"}/>
                    <span>: Delete file/folder</span>
                </div>
            </div>
        </div>
    );
}