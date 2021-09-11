import "../styles/App.css";
import { useState } from "react";
import FileFolder from "./FileFolder";
import ReactModal from "react-modal";
import arrow from "../assets/arrow_up.png";
import AddFile from "./AddFile";
import RenameFile from "./RenameFile";
import BreadCrumbs from "./BreadCrumbs";

ReactModal.setAppElement("#root");

function App() {
    const [fileList, setFileList] = useState([]);
    const [fileId, setFileId] = useState("");
    const [showNewModal, setShowNewModal] = useState(false);
    const [showRenameModal, setRenameModal] = useState(false);
    const [currPath, setCurrPath] = useState("/");

    const handleContextMenu = (data) => {
        console.log(data);
        switch (data.action) {
            case "rename":
                setFileId(data.id);
                setRenameModal(true);
                break;
            case "delete":
                setFileList(fileList.filter((file) => file.id !== data.id));
                break;
            default:
                console.log("Invalid action");
        }
    };

    return (
        <div className="App">
            <header>
                <img
                    src={arrow}
                    onClick={() => {
                        setCurrPath(
                            currPath.substr(
                                0,
                                currPath.indexOf(currPath.split("/").pop())
                            ) + "/"
                        );
                    }}
                    alt="back"
                />
                <BreadCrumbs setCurrPath={setCurrPath} currPath={currPath} />
            </header>
            <ReactModal
                isOpen={showNewModal}
                contentElement={() => (
                    <div>
                        <AddFile
                            fileList={fileList}
                            currPath={currPath}
                            setFileList={(e) => setFileList(e)}
                            setShowNewModal={(e) => setShowNewModal(e)}
                        />
                    </div>
                )}
            />
            <ReactModal
                isOpen={showRenameModal}
                contentElement={() => (
                    <div>
                        <RenameFile
                            fileList={fileList}
                            fileId={fileId}
                            setFileList={(e) => setFileList(e)}
                            setRenameModal={(e) => setRenameModal(e)}
                        />
                    </div>
                )}
            />
            <div className="file-list">
                {fileList
                    .filter((file) => file.path === currPath)
                    .map((file) => (
                        <FileFolder
                            key={file.id}
                            currPath={currPath}
                            openFolder={
                                file.type === "folder" ? setCurrPath : () => {}
                            }
                            id={file.id}
                            name={file.name}
                            type={file.type}
                            handleContextMenu={(data) =>
                                handleContextMenu(data)
                            }
                        />
                    ))}
                <FileFolder
                    handleClick={() => {
                        setShowNewModal(true);
                    }}
                    name=""
                />
            </div>
        </div>
    );
}

export default App;
