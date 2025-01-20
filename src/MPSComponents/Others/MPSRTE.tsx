import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface MPSRTEProps {
  value: any;
  onChange?: (content: string) => void;
  onBlur: Function;
  Button?: ButtonProp;
  placeholder?: string;
  height?: number;
  width?: number;
}

interface ButtonProp {
  preview?: boolean;
  align?: boolean;
  bold?: boolean;
  brush?: boolean;
  copyformat?: boolean;
  eraser?: boolean;
  font?: boolean;
  fontsize?: boolean;
  fullsize?: boolean;
  hr?: boolean;
  image?: boolean;
  indent?: boolean;
  left?: boolean;
  italic?: boolean;
  link?: boolean;
  ol?: boolean;
  outdent?: boolean;
  paragraph?: boolean;
  print?: boolean;
  redo?: boolean;
  undo?: boolean;
  selectall?: boolean;
  source?: boolean;
  strikethrough?: boolean;
  subscript?: boolean;
  superscript?: boolean;
  table?: boolean;
  ul?: boolean;
  underline?: boolean;
  find?: boolean;
  paste?: boolean;
  speechRecognize?: boolean;
}

const MPSRTE: React.FC<MPSRTEProps> = ({
  value,
  onChange,
  onBlur,
  Button,
  placeholder = "Start Typing..",
  height = 500,
  width = 1000,
}) => {
  const buttonProp = {
    undo: true,
    redo: true,
    bold: true,
    italic: true,
    underline: true,
    strikethrough: true,
    superscript: true,
    subscript: true,
    align: false,
    ul: true,
    ol: true,
    indent: false,
    outdent: false,
    left: false,
    font: false,
    fontsize: true,
    brush: true,
    paragraph: true,
    image: true,
    link: false,
    speechRecognize: false,
    paste: true,
    table: true,
    hr: true,
    eraser: false,
    copyformat: false,
    fullsize: false,
    selectall: true,
    find: false,
    print: true,
    preview: true,
    source: false,
  };

  const editor = useRef(null);

  const [content, setContent] = useState(value);
  const [buttons, setButtons] = useState<any[]>([]);

  useEffect(() => {
    let buttonValue = { ...buttonProp };
    let myButt = [];
    for (const key in Button) {
      if (Button[key] === false) {
        buttonValue[key] = false;
      }
    }
    for (const key in buttonValue) {
      if (buttonValue[key] === true) {
        myButt.push(key);
      }
    }
    setButtons(myButt);
  }, [Button]);

  const config: any = {
    width: width,
    height: height,
    readonly: false,
    placeholder: placeholder,
    toolbar: true,
    spellcheck: true,
    language: "en",
    toolbarButtonSize: "medium",
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    buttons: buttons,
    uploader: {
      url: "/upload-image-endpoint",
      insertImageAsBase64URI: true,
      isSuccess: (resp) => {
        return resp.success;
      },
      process: (response) => {
        return {
          files: response.files || [],
        };
      },
    },
  };

  useEffect(() => {
    if (editor.current && editor.current.editor) {
      editor.current.editor.focus();
    }
  }, [editor]);

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent) => {
          setContent(newContent);
          if (onChange) {
            onChange(newContent);
          }
          onBlur(newContent);
        }}
        onChange={() => {}}
      />
    </div>
  );
};

export default MPSRTE;
