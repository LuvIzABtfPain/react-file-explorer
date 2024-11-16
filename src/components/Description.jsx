import { IoIosAddCircleOutline } from "react-icons/io";

export default function Description() {
    return (
        <div className={"mb-4"}>
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
        </div>
    );
}