import React, { useEffect, useMemo, useState } from "react";
import { func, string } from "prop-types";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState, convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const htmlToEditorState = html => {
	let editorState = EditorState.createEmpty();

	const blocksFromHtml = htmlToDraft(html);
	const { contentBlocks } = blocksFromHtml;
	if (contentBlocks) {
		const contentState = ContentState.createFromBlockArray(contentBlocks);
		editorState = EditorState.createWithContent(contentState);
	}

	return editorState;
};

const BasicEditor = ({ defaultHtml, onChange }) => {
	const [editorState, setEditorState] = useState(() => {
		if (defaultHtml) return htmlToEditorState(defaultHtml);

		return EditorState.createEmpty();
	});

	const handleEditorStateChange = _editorState => {
		setEditorState(_editorState);

		const _html = draftToHtml(
			convertToRaw(_editorState.getCurrentContent())
		);
		onChange(_html);
	};

	return (
		<Editor
			editorState={editorState}
			onEditorStateChange={handleEditorStateChange}
		/>
	);
};

BasicEditor.defaultProps = {
	defaultHtml: ""
};

BasicEditor.propTypes = {
	defaultHtml: string,
	onChange: func.isRequired
};

export { BasicEditor as Editor };
