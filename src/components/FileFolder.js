import React from "react";
import { ContextMenu, ContextMenuTrigger, MenuItem } from "react-contextmenu";
import fileIcon from "../assets/file.png";
import folderIcon from "../assets/folder.png";
import addNewButton from "../assets/add_new_button.png";
import "../styles/FileFolder.css";

export default function FileFolder(props) {
    if (!props.name) {
        return (
            <div className="new-file" onClick={props.handleClick}>
                <img
                    style={{ height: 100, width: 75 }}
                    alt="Create file"
                    src={addNewButton}
                />
            </div>
        );
    }
    return (
        <ContextMenuTrigger id={props.id}>
            <div
                className="file-folder"
                onDoubleClick={() =>
                    props.openFolder(props.currPath + props.name + "/")
                }
            >
                <img
                    style={{ height: 75, width: 75 }}
                    alt={props.name}
                    src={props.type === "file" ? fileIcon : folderIcon}
                />
                <div>{props.name}</div>
            </div>

            <ContextMenu id={props.id} className="menu" style={{}}>
                <MenuItem
                    onClick={() =>
                        props.handleContextMenu({
                            action: "rename",
                            id: props.id,
                        })
                    }
                    className="menu-item"
                >
                    Rename
                </MenuItem>
                <MenuItem divider className="menu-divider" />
                <MenuItem
                    onClick={() =>
                        props.handleContextMenu({
                            action: "delete",
                            id: props.id,
                            name: props.name,
                        })
                    }
                    className="menu-item danger"
                >
                    Delete
                </MenuItem>
            </ContextMenu>
        </ContextMenuTrigger>
    );
}
