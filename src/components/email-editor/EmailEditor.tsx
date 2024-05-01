import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eraser, Bold, Italic, Underline } from "lucide-react";
import parse from "html-react-parser";

import { applyStyle, TStyle } from "./email-style";
import { emailService } from "../../services/email.service";
import styles from "./EmailEditor.module.scss";
import { useEditor } from "./useEditor";

export function EmailEditor() {
	const { text, applyFormat, updateSelection, setText, textRef } =
		useEditor();
	const queryCLient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationKey: ["create email"],
		mutationFn: () => emailService.sendEmail(text),
		onSuccess() {
			setText("");
			queryCLient.refetchQueries({ queryKey: ["email list"] });
		},
	});

	return (
		<div>
			<h1>Email editor</h1>
			{text && <div className={styles.preview}>{parse(text)}</div>}
			<div className={styles.card}>
				<textarea
					ref={textRef}
					className={styles.editor}
					spellCheck="false"
					onSelect={updateSelection}
					value={text}
					// readOnly
					onChange={(e) => setText(e.target.value)}
				>
					{text}
				</textarea>
				<div className={styles.actions}>
					<div className={styles.tools}>
						<button onClick={() => setText("")}>
							<Eraser size={17} />
						</button>
						<button
							onClick={() => {
								applyFormat("bold");
							}}
						>
							<Bold size={17} />
						</button>
						<button
							onClick={() => {
								applyFormat("italic");
							}}
						>
							<Italic size={17} />
						</button>
						<button
							onClick={() => {
								applyFormat("underline");
							}}
						>
							<Underline size={17} />
						</button>
					</div>
					<button disabled={isPending} onClick={() => mutate()}>
						Send now
					</button>
				</div>
			</div>
		</div>
	);
}
