import "normalize.css";
import Editor from 'tui-editor';
import "tui-editor/dist/tui-editor-extScrollSync";
import "tui-editor/dist/tui-editor-extColorSyntax.js";
import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'highlight.js/styles/github.css';

const height = (new URL(location.href)).searchParams.get("heigth") || 800;
const editor = new Editor({
    el: document.querySelector('#editSection'),
    viewer: true,
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    exts: ['scrollSync', 'colorSyntax'],
    usageStatistics: false,
    height: height + 'px'
});
