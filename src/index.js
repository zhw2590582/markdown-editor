import "normalize.css";
import "./style.css";
import Editor from "tui-editor";
import "tui-editor/dist/tui-editor-extScrollSync";
import "tui-editor/dist/tui-editor-extColorSyntax.js";
import "codemirror/lib/codemirror.css";
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "highlight.js/styles/github.css";

const storageKey = "__editor__";
const height = new URL(window.location.href).searchParams.get("height") || document.body.clientHeight || 800;
const editor = new Editor({
  el: document.querySelector("#editSection"),
  viewer: true,
  initialEditType: "markdown",
  initialValue: window.localStorage.getItem(storageKey),
  previewStyle: "vertical",
  exts: ["scrollSync", "colorSyntax"],
  usageStatistics: false,
  height: height + "px",
  events: {
    change: function () {
      window.localStorage.setItem(storageKey, editor.getMarkdown());
    }
  }
});