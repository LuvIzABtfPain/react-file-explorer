import { useState } from 'react';
import File from './File';
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import folderStructureData, {deleteById, findById} from "../structureData/structure.js";
import {MdOutlineArrowDropDown, MdOutlineArrowRight} from "react-icons/md";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Folder({ item , onChangeData, selectedId , onChangeSelectedId,}) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [openFolder, setOpenFolder] = React.useState(false);
    const [openFile, setOpenFile] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [name, setName] = useState('')
    const [content, setContent] = useState('')

    const handleClickFolderOpen = () => {
        setOpenFolder(true);
    };

    const handleClickFileOpen = () => {
        setOpenFile(true);
    };

    const handleClose = () => {
        setName('')
        setContent('')
        setOpenFolder(false);
        setOpenFile(false);
    };

    const handleAddFolder = (parentFolderId) => {
        if(!name) {
            alert('Please enter name')
            return
        }
        console.log('folderStructureData', folderStructureData)
        const res = findById(folderStructureData, parentFolderId)
        console.log('res', res)

        const newFolder = {
            id: Date.now().toString(),
            name: name,
            isFolder: true,
            items: []
        }

        if(!res) {return}

        for(const item of res.items) {
            if(item.isFolder && (item.name === newFolder.name)) {
                alert("Folder already exists")
                return
            }
        }

        res.items.push(newFolder)
        onChangeData({...folderStructureData})
        handleClose()
    };

    const handleAddFile = (parentFolderId) => {
        if(!name) {
            alert('Please enter name')
            return
        }
        const res = findById(folderStructureData, parentFolderId)
        const newFile = {
            id: Date.now().toString(),
            name: name,
            isFolder: false,
            content: content
        }

        if(!res) {return}

        for(const item of res.items) {
            if(!item.isFolder && (item.name === newFile.name)) {
                alert("File already exists")
                return
            }
        }
        res.items.push(newFile)
        onChangeData({...folderStructureData})
        handleClose()
    };

    const handleDelete = (id) => {
        deleteById(folderStructureData, id)
        onChangeData({...folderStructureData})
        setOpenDelete(false);
    }

    function handleCloseDelete() {
        setOpenDelete(false);
    }


    function handleClickDeleteOpen() {
        setOpenDelete(true);
    };

    return (
        <>
            <Dialog
                open={openFolder}
                onClose={handleClose}
                maxWidth={'xs'}
                fullWidth
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Add Folder</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => {
                             setName(e.target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleAddFolder(item.id)}>Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openFile}
                onClose={handleClose}
                maxWidth={'xs'}
                fullWidth
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const file = formJson.name;
                        console.log(name);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Add File</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="File Name"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="content"
                        label="File Content"
                        fullWidth
                        variant="standard"
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value)
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleAddFile(item.id)}>Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete this folder?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseDelete}>Cancel</Button>
                    <Button onClick={() => handleDelete(item.id)} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <div className={"flex items-center gap-2 cursor-pointer p-0.5"}>
                <div className={"flex items-center"} onClick={() => setIsExpanded((prevState) => !prevState)}>
                {isExpanded ? <MdOutlineArrowDropDown className="transform transition-transform duration-200"/> : <MdOutlineArrowRight className="transition-transform duration-200"/>}
                <span>
                    {item.name}
                </span>
                </div>
                <div className={'flex items-center gap-2'}>
                <IoIosAddCircleOutline onClick={handleClickFolderOpen} title={"Add Folder"} className={"text-blue-500"}/>
                <IoIosAddCircleOutline onClick={handleClickFileOpen} title={"Add File"} className={"text-green-500"}/>
                <CiCircleMinus  onClick={handleClickDeleteOpen}  title={"Delete"} className={"text-red-500"} />
                </div>
            </div>


            <div className={"pl-3"}
            >
                {isExpanded &&
                    item.items.map((item) =>
                        item.isFolder ?
                            <Folder
                                onChangeSelectedId={onChangeSelectedId}
                                onChangeData={onChangeData}
                                selectedId={selectedId}
                                key={item.id}
                                item={item}
                           /> :
                            <File
                                selectedId={selectedId}
                                onChangeData={onChangeData}
                                key={item.id}
                                item={item}
                                onChangeSelectedId={onChangeSelectedId}
                            />
                    )}
            </div>
        </>
    );
}


