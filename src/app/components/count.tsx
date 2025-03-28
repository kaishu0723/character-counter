"use client";
import React, { useState, useEffect } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BackspaceIcon from '@mui/icons-material/Backspace';

const Count = () => {
    const [text, setText] = useState("");
    const [trimText, setTrimText] = useState("");
    const [isChecked, setIsChecked] = useState(false);

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

    const handleRemove = () => {
        setText(text.replace(/\s+/g, ''));
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
        setTrimText(text.replace(/\s+/g, ''));
    }, [text]);
    return (
        <div>
            <p className="text-2xl text-center mt-10">Character count: {isChecked ? text.length : trimText.length}</p>
            <label className="flex p-4 justify-center">
                <div id="container" className={`w-10 h-5 ${isChecked ? 'bg-green-300' : 'bg-gray-300'} rounded-full shadow-inner shadow-black/10 relative cursor-pointer mx-2`} onClick={() => setIsChecked(!isChecked)}>
                    <div id="toggle" className={`w-5 h-5 bg-white rounded-full absolute left-0 top-0 transition-all duration-300 ${isChecked ? 'left-5' : 'left-0'}`}>
                        {/* {isChecked ? <ContentCopyIcon /> : <AutoAwesomeIcon />} */}
                    </div>
                </div>
                <p>スペース、改行、タブをカウントする</p>
            </label>
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

                <div className="block w-[130px] mx-auto m-10 bg-white text-blue-500 border-2 border-blue-500 p-2 rounded-md text-center">
                    <BackspaceIcon className="relative bottom-[1px]" />
                    <button onClick={handleRemove} id="clear-button" className="pl-2">Remove</button>
                </div>
            </div>
        </div>
    );
}

export default Count;