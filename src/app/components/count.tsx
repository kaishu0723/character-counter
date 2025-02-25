"use client";
import { useState, useEffect } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Count = () => {
    const [text, setText] = useState("");
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        (document.getElementById("copy-button") as HTMLButtonElement).textContent = "copied";
        setTimeout(() => {
            (document.getElementById("copy-button") as HTMLButtonElement).textContent = "copy";
        }, 3000);
    }

    useEffect(() => {
        (document.getElementById("copy-button") as HTMLButtonElement).textContent = "copy";
    }, [text]);
    return (
        <div>
            <p className="text-center m-10">Character count: {text.length}</p>
            <textarea
                className="block w-1/2 min-h-[200px] h-auto mx-auto border-2 border-gray-300 rounded-md p-2"
                placeholder="Enter your text here"
                onChange={(e) => setText(e.target.value)}
            />
            <div className="block w-[90px] mx-auto m-10 bg-blue-500 text-white p-2 rounded-md">
            <ContentCopyIcon/>
            <button onClick={handleCopy} id="copy-button" className="pl-2">copy</button>
            </div>
        </div>
    );
}

export default Count;