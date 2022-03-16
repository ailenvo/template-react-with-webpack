import { Paper } from "@mui/material";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

interface Props {
  id?: string;
  value: string;
  label?: string;
  handleTextChange: (content: string, id: any) => void;
  ref?: any;
}

export default function TextEditor(props: Props) {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const key = props.id ? props.id.toString() : new Date().toISOString();

  useEffect(() => {
    const contentBlock = htmlToDraft(props.value);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const content = EditorState.createWithContent(contentState);

      setEditorState(content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  const onEditorStateChange = (editorData: EditorState) => {
    setEditorState(editorData);
    if (!editorData.getCurrentContent().hasText())
      props.handleTextChange("", key);
    else {
      const content = draftToHtml(convertToRaw(editorData.getCurrentContent()));

      props.handleTextChange(content, key);
    }
  };

  return (
    <Paper sx={{ minHeight: 300, padding: 2 }} key={key}>
      <Editor
        key={key}
        placeholder={props.label ?? ""}
        ref={props.ref}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </Paper>
  );
}
