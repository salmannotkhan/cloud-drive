import React, { useState } from "react";
import "react-dom";
import "../styles/AddFile.css";
import close from "../assets/close.png";
import { v4 as uuid } from "uuid";

export default function AddFile(props) {
    const [error, setError] = useState("");
    const [fileName, setFileName] = useState("");
    const [fileType, setFileType] = useState("file");
    const addFile = (e) => {
        e.preventDefault();
        if (fileName.trim() === "") {
            setError("Invalid File / Folder name");
        } else if (
            props.fileList.every(
                (file) => file.path !== props.currPath || file.name !== fileName
            )
        ) {
            props.setFileList([
                ...props.fileList,
                {
                    id: uuid(),
                    name: fileName.trim(),
                    path: props.currPath,
                    type: fileType,
                },
            ]);
            props.setShowNewModal(false);
        } else {
            setError("File / Folder name already exists");
        }
    };

    return (
        <form onSubmit={addFile}>
            <div className="head">
                <div>Create new</div>
                <img
                    src={close}
                    alt="close"
                    onClick={() => props.setShowNewModal(false)}
                />
            </div>
            <div className="file-type-selector">
                <div
                    className={`file-type ${
                        fileType === "file" ? "selected" : ""
                    }`}
                    onClick={() => setFileType("file")}
                >
                    File
                </div>
                <div
                    className={`file-type ${
                        fileType === "folder" ? "selected" : ""
                    }`}
                    onClick={() => setFileType("folder")}
                >
                    Folder
                </div>
            </div>
            <input
                type="text"
                name="fileName"
                autoFocus
                style={{ borderColor: error ? "red" : "lightgray" }}
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
            />
            {error ? <div style={{ color: "red" }}>{error}</div> : null}
            <input type="submit" value="Create" />
        </form>
    );
}
