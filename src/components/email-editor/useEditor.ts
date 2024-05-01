import { useState, useRef } from "react";
import { TStyle, applyStyle } from "./email-style";

export function useEditor() {
    const [text, setText] = useState("Enter email...");
    const [selectionStart, setSelectionStart] = useState(0);
	const [selectionEnd, setSelectionEnd] = useState(0);
    	const textRef = useRef<HTMLTextAreaElement | null>(null);

    const updateSelection = () => {
		if (!textRef.current) return;
		setSelectionStart(textRef.current.selectionStart);
		setSelectionEnd(textRef.current.selectionEnd);
	};

	const applyFormat = (type: TStyle) => {
		const selectedText = text.substring(selectionStart, selectionEnd); // выделенный текст

		if (!selectedText) return;

		console.log("selectionStart", selectionStart);
		console.log("selectionEnd", selectionEnd);

		// text before selected tile
		const before = text.substring(0, selectionStart);

		// text after selected tile
		const after = text.substring(selectionEnd);
		console.log("selectedText", selectedText);

		setText(before + applyStyle(type, selectedText) + after);
    };
    
    return{text, applyFormat, updateSelection, setText, text}
}