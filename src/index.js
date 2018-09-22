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
import saveAs from "./saveAs";

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

const $reset = document.querySelector('.reset');
const $download = document.querySelector('.download');
const $preview = document.querySelector('.preview');
const $inputs = Array.from(document.querySelectorAll('.input, .select'));
const events = ["propertychange", "change", "click", "keyup", "input", "paste"];
const eventFn = e => {
  const target = e.target;
  const name = target.name;
  let value = target.value;
  if (name === 'poster') {
    $preview.setAttribute('style', `background-image: url(${value});`)
  }
  setStorage(name, value);
};
events.forEach(event => {
  $inputs.forEach(input => {
    input.addEventListener(event, eventFn);
  })
});

$reset.addEventListener('click', clenaStorage);

$download.addEventListener('click', e => {
  const storage = getStorage();
  const content = `<!---
{
    "title": "${storage.title || ''}",
    "type": "${storage.type || ''}",
    "poster": "${storage.poster || ''}",
    "topic": "${storage.topic || 'default'}",
    "sticky": ${storage.sticky || false}
}
-->

${storage.markdown || storage.title || ''}
`
  const blob = new Blob([content], {type: "text/plain;charset=utf-8"});
  saveAs(blob, `${storage.name || 'unnamed'}.md`);
});

const storage = getStorage();
Object.keys(storage).forEach(name => {
  if (name === 'markdown') return;
  let value = storage[name];
  if (name === 'poster') {
    $preview.setAttribute('style', `background-image: url(${value});`)
  }
  document.querySelector(`[name=${name}]`).value = value;
});