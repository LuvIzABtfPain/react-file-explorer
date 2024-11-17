import {CiCircleMinus} from "react-icons/ci";
import folderStructureData, {deleteById} from "../structureData/structure.js";
import { CiFileOn } from "react-icons/ci";
import {clsx} from 'clsx';
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import * as React from "react";

export default function File({ item, onChangeData, selectedId, onChangeSelectedId }) {
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleDelete = (id) => {
        deleteById(folderStructureData, id)
        onChangeData({...folderStructureData})
    }

    const handleClickFile = () => {
        onChangeSelectedId(item.id)
    }

    function handleCloseDelete() {
        setOpenDelete(false);
    }

    function handleClickDeleteOpen() {
        setOpenDelete(true);
    };

    return (
        <div
            onClick={handleClickFile}
            className={clsx('flex items-center gap-2 p-0.5', { 'bg-gray-200': selectedId === item.id })}>
            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete this File?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseDelete}>Cancel</Button>
                    <Button onClick={() => handleDelete(item.id)} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <div className={"flex items-center"}>
            <CiFileOn/>
            <span>{item.name}</span>
            </div>
            <CiCircleMinus  onClick={handleClickDeleteOpen}  title={"Delete"} className={"text-red-500"} />
        </div>
    );
}
