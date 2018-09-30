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

function getStorage(name) {
  const storage = JSON.parse(window.localStorage.getItem(storageKey)) || {}
  return name ? storage[name] : storage;
}

function setStorage(name, value) {
  if (!name || !value) return;
  const oldStorage = getStorage();
  const newStorage = Object.assign({}, oldStorage, {
    [name]: value
  });
  window.localStorage.setItem(storageKey, JSON.stringify(newStorage));
  return newStorage;
}

function clenaStorage() {
  window.localStorage.removeItem(storageKey);
  window.location.reload();
}

const height = new URL(window.location.href).searchParams.get("height") || document.body.clientHeight || 800;
const editor = new Editor({
  el: document.querySelector("#editSection"),
  viewer: true,
  initialEditType: "markdown",
  initialValue: getStorage("markdown"),
  previewStyle: "vertical",
  exts: ["scrollSync", "colorSyntax"],
  usageStatistics: false,
  height: height + "px",
  events: {
    change: function () {
      const markdown = editor.getMarkdown();
      setStorage("markdown", markdown);
    }
  }
});