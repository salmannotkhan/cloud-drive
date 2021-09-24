import React, { useEffect, useState } from "react";
import close from "../assets/close.png";
import "react-dom";

export default function RenameFile(props) {
	const [error, setError] = useState("");
	const [fileName, setFileName] = useState("");

	useEffect(() => {
		props.fileList.forEach((file) => {
			if (file.id === props.fileId) {
				setFileName(file.name);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renameFile = (e) => {
		e.preventDefault();
		if (fileName.trim() === "") {
			setError("Invalid File / Folder name");
			return;
		}
		if (props.fileList.every((file) => file.name !== fileName)) {
			props.setFileList(
				props.fileList.map((file) => {
					if (file.id === props.fileId) {
						return { ...file, name: fileName.trim() };
					} else {
						return file;
					}
				})
			);
			props.setRenameModal(false);
			setFileName("");
		} else {
			setError("File / Folder name already exists");
		}
	};

	return (
		<form onSubmit={renameFile}>
			<div className="head">
				<div>Rename File</div>
				<img
					src={close}
					alt="close"
					onClick={() => props.setRenameModal(false)}
				/>
			</div>
			<input
				type="text"
				name="fileName"
				style={{ borderColor: error ? "red" : "lightgray" }}
				value={fileName}
				autoFocus
				onChange={(e) => setFileName(e.target.value)}
			/>
			{error ? <div style={{ color: "red" }}>{error}</div> : null}
			<input type="submit" value="Rename" />
		</form>
	);
}
