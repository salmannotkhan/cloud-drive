import React from "react";
import "react-dom";

export default function BreadCrumbs({ currPath, setCurrPath }) {
    return (
        <div className="breadcrumb">
            <span onClick={() => setCurrPath("/")}>root</span>
            {currPath
                .split("/")
                .filter((x) => x)
                .map((path) => (
                    <span
                        key={path}
                        className="crumb"
                        onClick={() =>
                            setCurrPath(
                                currPath.substr(
                                    0,
                                    currPath.indexOf(
                                        "/",
                                        currPath.indexOf(path)
                                    )
                                ) + "/"
                            )
                        }
                    >
                        {path}
                    </span>
                ))}
        </div>
    );
}
