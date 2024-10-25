import React, { useState, useRef, useEffect, SyntheticEvent } from "react";

const RichTextEditor: React.FC = () => {
    const [content, setContent] = useState<string>("<p>Type your text here...</p>");
    const [selectedArea, setSelectedArea] = useState();
    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (editorRef.current && !editorRef.current.innerHTML) {
            editorRef.current.innerHTML = content;
        }
    }, []);

    const decideWrapper = (tagName: "bold" | "italic" | "a") => {
        switch (tagName) {
            case "bold":
                return "strong";
            case "italic":
                return "em";
            default:
                return tagName;
        }
    };

    const applyStyle = (tagName: "bold" | "italic" | "a") => {
        const selection = window.getSelection();
        if (!selection || !selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const selectedContent = range.extractContents();

        const wrapper = document.createElement(decideWrapper(tagName));
        if (tagName === "a") {
            const url = prompt("Enter the URL");
            if (url) {
                wrapper.setAttribute("href", url);
                wrapper.setAttribute("target", "_blank");
            } else {
                return;
            }
        }

        wrapper.appendChild(selectedContent);
        range.insertNode(wrapper);

        // Update content state without re-rendering the div
        if (editorRef.current) {
            setContent(editorRef.current.innerHTML);
        }
    };

    const handleInput = () => {
        if (editorRef.current) {
            setContent(editorRef.current.innerHTML);
        }
    };

    const saveContentAsJSON = () => {
        const contentAsJSON = JSON.stringify({ content });
        console.log(contentAsJSON);
    };

    const handleSelect = (e: SyntheticEvent<HTMLDivElement>) => {
        console.log({ x: e.nativeEvent.clientX, y: e.nativeEvent.clientY })
        setSelectedArea({ x: e.nativeEvent.clientX, y: e.nativeEvent.clientY })
    }

    return (
        <div className="relative">
            <div
                className="w-[400px] flex gap-2 shadow-md rounded-md border border-gray-200 transform -translate-x-1/2"
                style={{ position: "absolute", top: selectedArea?.y || 0, left: selectedArea?.x || 0 }}>
                <button onClick={() => applyStyle("bold")}>Bold</button>
                <button onClick={() => applyStyle("italic")}>Italic</button>
                <button onClick={() => applyStyle("a")}>Link</button>
            </div>
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="border border-gray-300 min-h-[200px] p-4"
                onSelect={handleSelect}
            />
            <button onClick={saveContentAsJSON}>Save as JSON</button>
        </div>
    );
};

export default RichTextEditor;
