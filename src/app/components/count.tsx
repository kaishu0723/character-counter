"use client";
import { useState, useEffect } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Count = () => {
    const [text, setText] = useState("");
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        (document.getElementById("copy-button") as HTMLButtonElement).textContent = "copied";
        setTimeout(() => {
            (document.getElementById("copy-button") as HTMLButtonElement).textContent = "copy";
        }, 3000);
    }

    const handleClear = () => {
        setText("");
    }

    useEffect(() => {
        if (localStorage.getItem("text") !== null) {
            setText(localStorage.getItem("text") as string);
        }
    }, []);
    useEffect(() => {
        (document.getElementById("copy-button") as HTMLButtonElement).textContent = "copy";
        if (text !== "") {
            localStorage.setItem("text", text);
        }
    }, [text]);
    return (
        <div>
            <p className="text-center m-10">Character count: {text.length}</p>
            <textarea
                value={text}
                className="block w-4/5 min-h-[300px] h-auto mx-auto border-2 border-gray-300 rounded-md p-2"
                placeholder="Enter your text here"
                onChange={(e) => setText(e.target.value)}
            />
            <div className="w-4/5 mx-auto flex justify-center">
                <div className="block w-[100px] mx-auto m-10 bg-blue-500 text-white p-2 rounded-md text-center">
                    <ContentCopyIcon />
                    <button onClick={handleCopy} id="copy-button" className="pl-2">copy</button>
                </div>
                <div className="block w-[100px] mx-auto m-10 bg-white text-blue-500 border-2 border-blue-500 p-2 rounded-md text-center">
                    <AutoAwesomeIcon />
                    <button onClick={handleClear} id="clear-button" className="pl-2">clear</button>
                </div>
            </div>
        </div>
    );
}

export default Count;