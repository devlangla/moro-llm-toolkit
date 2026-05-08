import { useCallback, useEffect, useRef, useState } from "react";
import "./DocumentEditor.css";
import { Spin, Typography } from "antd";
import { Check, AlertCircle, Loader2, Eye, Code2, WrapText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Editor from "@monaco-editor/react";
import { useShallow } from "zustand/react/shallow";
import { useDocumentsStore } from "../stores/document.store";

const { Text } = Typography;

type EditorInstance = Parameters<NonNullable<React.ComponentProps<typeof Editor>["onMount"]>>[0];

export default function DocumentEditor() {
  const { activeDoc, docLoading, saveStatus, updateDocument } = useDocumentsStore(
    useShallow((s) => ({
      activeDoc: s.activeDoc,
      docLoading: s.docLoading,
      saveStatus: s.saveStatus,
      updateDocument: s.updateDocument,
    })),
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [wordWrap, setWordWrap] = useState(true);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const editorRef = useRef<EditorInstance | null>(null);

  // Sync from store when activeDoc changes
  useEffect(() => {
    if (activeDoc) {
      setTitle(activeDoc.title);
      setContent(activeDoc.content);
      setIsPreview(true); // Default to preview mode
    }
  }, [activeDoc?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-save content with debounce
  const debouncedSave = useCallback(
    (projectId: string, id: string, data: { title?: string; content?: string }) => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        updateDocument(projectId, id, data);
      }, 1000);
    },
    [updateDocument],
  );

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (activeDoc?.projectId) {
      debouncedSave(activeDoc.projectId, activeDoc.id, { title: newTitle });
    }
  };

  const handleContentChange = (newContent: string | undefined) => {
    const val = newContent ?? "";
    setContent(val);
    if (activeDoc?.projectId) {
      debouncedSave(activeDoc.projectId, activeDoc.id, { content: val });
    }
  };

  const handleEditorMount = useCallback((ed: EditorInstance) => {
    editorRef.current = ed;
  }, []);

  if (docLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!activeDoc) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-3 border-b border-hairline-soft shrink-0">
        <div className="flex items-center gap-1.5 min-h-[20px]">
          {saveStatus === "saving" && (
            <>
              <Loader2 size={13} className="animate-spin" />
              <Text type="secondary" style={{ fontSize: 12 }}>Saving...</Text>
            </>
          )}
          {saveStatus === "saved" && (
            <>
              <Check size={13} style={{ color: "var(--color-success)" }} />
              <Text type="secondary" style={{ fontSize: 12 }}>Saved</Text>
            </>
          )}
          {saveStatus === "error" && (
            <>
              <AlertCircle size={13} style={{ color: "var(--color-error)" }} />
              <Text type="danger" style={{ fontSize: 12 }}>Save failed</Text>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setWordWrap(!wordWrap)}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono bg-transparent border cursor-pointer transition-colors ${
              wordWrap ? "text-[#8b5cf6] border-[#8b5cf640]" : "text-muted-soft border-hairline hover:border-hairline-strong hover:text-ink"
            }`}
            title="Toggle word wrap"
          >
            <WrapText size={11} />
            Wrap
          </button>

          <div className="flex bg-surface-card rounded-sm p-0.5">
            <button
              className={`py-1.5 px-3.5 border-none bg-transparent text-xs font-semibold rounded-xs cursor-pointer transition-all duration-150 inline-flex items-center gap-1.5 ${
                !isPreview
                  ? "bg-canvas text-ink shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                  : "text-muted hover:text-body"
              }`}
              onClick={() => setIsPreview(false)}
            >
              <Code2 size={13} />
              Edit
            </button>
            <button
              className={`py-1.5 px-3.5 border-none bg-transparent text-xs font-semibold rounded-xs cursor-pointer transition-all duration-150 inline-flex items-center gap-1.5 ${
                isPreview
                  ? "bg-canvas text-ink shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                  : "text-muted hover:text-body"
              }`}
              onClick={() => setIsPreview(true)}
            >
              <Eye size={13} />
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {isPreview ? (
        <div className="flex-1 overflow-y-auto w-full">
          <div className="px-8 pt-6 pb-2">
            <input
              className="block w-full border-none outline-none bg-transparent font-display text-4xl font-medium text-ink tracking-[-0.5px] leading-[1.2] p-0 placeholder:text-hairline"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Untitled"
              spellCheck={false}
            />
          </div>
          <div className="doc-markdown-preview px-8 pb-8">
            {content ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {content}
              </ReactMarkdown>
            ) : (
              <p className="text-muted-soft italic">Nothing to preview</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Inline Title */}
          <div className="px-8 pt-6 pb-2 w-full shrink-0">
            <input
              className="block w-full border-none outline-none bg-transparent font-display text-4xl font-medium text-ink tracking-[-0.5px] leading-[1.2] p-0 placeholder:text-hairline"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Untitled"
              spellCheck={false}
            />
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 min-h-0 doc-monaco-wrapper relative">
            {/* Placeholder overlay */}
            {!content && (
              <div className="doc-editor-placeholder">Start writing with Markdown...</div>
            )}
            <Editor
              language="markdown"
              value={content}
              onChange={handleContentChange}
              theme="moro-light"
              onMount={handleEditorMount}
              beforeMount={(monaco) => {
                try {
                  monaco.editor.defineTheme("moro-light", {
                    base: "vs",
                    inherit: true,
                    rules: [
                      { token: "", foreground: "5a5852" },
                      { token: "keyword", foreground: "f54e00" },
                      { token: "comment", foreground: "a09c92", fontStyle: "italic" },
                      { token: "string", foreground: "1f8a65" },
                      { token: "number", foreground: "8b5cf6" },
                      { token: "keyword.md", foreground: "cc785c", fontStyle: "bold" },
                      { token: "string.link.md", foreground: "f54e00" },
                      { token: "variable.md", foreground: "8b5cf6" },
                      { token: "markup.bold", foreground: "26251e", fontStyle: "bold" },
                      { token: "markup.italic", foreground: "5a5852", fontStyle: "italic" },
                    ],
                    colors: {
                      "editor.background": "#fafaf7",
                      "editor.foreground": "#5a5852",
                      "editor.lineHighlightBackground": "#f7f7f4",
                      "editor.selectionBackground": "#e6e5e044",
                      "editor.inactiveSelectionBackground": "#e6e5e033",
                      "editorLineNumber.foreground": "#cfcdc4",
                      "editorLineNumber.activeForeground": "#807d72",
                      "editorCursor.foreground": "#26251e",
                      "editor.selectionHighlightBackground": "#cc785c18",
                      "editorIndentGuide.background": "#efeee800",
                      "editorIndentGuide.activeBackground": "#e6e5e0",
                      "editorWidget.background": "#fafaf7",
                      "editorWidget.border": "#e6e5e0",
                      "input.background": "#f7f7f4",
                      "input.border": "#e6e5e0",
                      "scrollbar.shadow": "#00000008",
                      "editorOverviewRuler.border": "#efeee800",
                    },
                  });
                } catch {
                  // theme might already be defined
                }
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                lineHeight: 1.7,
                padding: { top: 16, bottom: 64 },
                tabSize: 2,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                stickyScroll: { enabled: false },
                wordWrap: wordWrap ? "on" : "off",
                renderLineHighlight: "line",
                cursorBlinking: "smooth",
                smoothScrolling: true,
                fontFamily: "'Inter', 'SF Pro Text', system-ui, sans-serif",
                lineNumbers: "off",
                glyphMargin: false,
                folding: false,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 0,
                overviewRulerLanes: 0,
                overviewRulerBorder: false,
                hideCursorInOverviewRuler: true,
                scrollbar: {
                  vertical: "auto",
                  horizontal: "hidden",
                  verticalScrollbarSize: 6,
                  useShadows: false,
                },
                renderWhitespace: "none",
                quickSuggestions: false,
                suggestOnTriggerCharacters: false,
                wordBasedSuggestions: "off",
                occurrencesHighlight: "off",
                selectionHighlight: false,
                contextmenu: false,
                unicodeHighlight: { ambiguousCharacters: false },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
