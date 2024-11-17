import './App.css';

import Folder from './components/Folder';
import File from './components/File';

import folderStructureData, {findById} from './structureData/structure.js';
import {useMemo, useState} from "react";
import Description from "./components/Description.jsx";
import {CiCircleMinus, CiFileOn} from "react-icons/ci";
import {IoIosAddCircleOutline} from "react-icons/io";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function App() {
    const [data, setData] = useState(folderStructureData)
    const [selectedId, setSelectId] = useState('2')
    const [openFolder, setOpenFolder] = React.useState(false);
    const [openFile, setOpenFile] = React.useState(false);
    const [name, setName] = useState('')
    const [content, setContent] = useState('')

    const selectedFile = useMemo(() => {
        if(!selectedId)
            return null
        return findById(data, selectedId)
    }, [selectedId, data])

    const onChangeData = (newData) => {
         setData(newData)
    }

    const handleAddRootFolder = () => {
        if(!name) {
            alert('Please enter name')
            return
        }
        if (data.items.some(item => item.name === name && item.isFolder)) {
            alert('Folder already exists');
            return;
        }
        const newFolder = {
            id: Date.now().toString(),
            name: name,
            isFolder: true,
            items: []
        };

        data.items.push(newFolder);
        onChangeData({ ...data });
        handleClose();
    };

    const handleAddRootFile = () => {
        if(!name) {
            alert('Please enter name')
            return
        }
        if (data.items.some(item => item.name === name && !item.isFolder)) {
            alert('File already exists');
            return;
        }
        const newFile = {
            id: Date.now().toString(),
            name: name,
            isFolder: false,
            content: content,
        };
        data.items.push(newFile);
        onChangeData({ ...data });
        handleClose()
    };

    function handleClose() {
        setName('')
        setContent('')
        setOpenFolder(false);
        setOpenFile(false);
    }

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
                        const name = formJson.name;
                        console.log(name);
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
                    <Button onClick={handleAddRootFolder}>Save</Button>
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
                    <Button onClick={handleAddRootFile}>Save</Button>
                </DialogActions>
            </Dialog>
            <Description />
            <div className={"ml-2 lg:flex gap-4"}>
                <div className={"mr-2 lg:mr-0 mb-2 p-2 border-2 border-gray-500 lg:w-1/4 lg:h-[70vh] overflow-auto"}>
                    <div className={"flex gap-2"}>
                        <IoIosAddCircleOutline onClick={() => setOpenFolder(true)} title={"Add Root Folder"} className={"text-blue-500"}/>
                        <IoIosAddCircleOutline onClick={() => setOpenFile(true)} title={"Add Root File"} className={"text-green-500"}/>
                        {/*<CiCircleMinus  title={"Delete"} className={"text-red-500"} />*/}
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
                <div className={"mr-2 p-2 lg:flex-1 border-2 border-gray-500 h-[70vh] overflow-auto"}>
                    {selectedFile && <div>
                        <div className={"flex items-center gap-2 p-0.5 border border-black"}>
                            <CiFileOn/>
                            <h2>{selectedFile.name}</h2>
                        </div>
                        <div className={"mt-2"} dangerouslySetInnerHTML={{ __html: selectedFile.content }}>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    );
}

export default App;
