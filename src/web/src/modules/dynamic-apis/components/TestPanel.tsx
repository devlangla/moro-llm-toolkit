import { Input, Tooltip, message } from "antd";
import {
  Play,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Copy,
  History,
  X,
} from "lucide-react";
import { useState, useCallback } from "react";

interface TestResult {
  status: number;
  body: unknown;
  consoleLogs?: string[];
  executionTimeMs?: number;
  error?: string;
  time?: number;
}

interface HistoryEntry {
  id: number;
  method: string;
  path: string;
  timestamp: number;
  params: Record<string, string>;
  query: Record<string, string>;
  headers: Record<string, string>;
  body: string;
  result: TestResult;
}

interface TestPanelProps {
  method: string;
  path: string;
  testBody: string;
  onTestBodyChange: (value: string) => void;
  testing: boolean;
  testResult: TestResult | null;
  onSend: (
    params: Record<string, string>,
    query: Record<string, string>,
    headers: Record<string, string>
  ) => void;
  /** Base URL for building cURL command (e.g. http://localhost:18080) */
  baseUrl?: string;
}

function getStatusColor(status: number): string {
  if (status >= 200 && status < 300) return "#1f8a65";
  if (status >= 400) return "#cf2d56";
  return "#f59e0b";
}

// ── Key-Value Editor ────────────────────────────────────────────────────────

function KeyValueEditor({
  label,
  entries,
  onChange,
  placeholderKey,
  placeholderValue,
}: {
  label: string;
  entries: [string, string][];
  onChange: (entries: [string, string][]) => void;
  placeholderKey?: string;
  placeholderValue?: string;
}) {
  const [collapsed, setCollapsed] = useState(entries.length === 0);

  const addEntry = () => {
    onChange([...entries, ["", ""]]);
    setCollapsed(false);
  };

  const updateEntry = (index: number, key: string, value: string) => {
    const next = [...entries];
    next[index] = [key, value];
    onChange(next);
  };

  const removeEntry = (index: number) => {
    onChange(entries.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-1 font-mono text-[10px] text-muted-soft uppercase tracking-wider bg-transparent border-none cursor-pointer p-0 hover:text-ink transition-colors"
        >
          {collapsed ? <ChevronRight size={10} /> : <ChevronDown size={10} />}
          {label}
          {entries.length > 0 && (
            <span className="text-[#8b5cf6] ml-0.5">({entries.length})</span>
          )}
        </button>
        <button
          onClick={addEntry}
          className="inline-flex items-center justify-center w-5 h-5 rounded bg-transparent border border-hairline text-muted-soft hover:text-ink hover:border-hairline-strong transition-colors cursor-pointer"
        >
          <Plus size={10} />
        </button>
      </div>

      {!collapsed && entries.length > 0 && (
        <div className="space-y-1.5">
          {entries.map(([key, value], i) => (
            <div key={i} className="flex gap-1.5 items-center">
              <Input
                value={key}
                onChange={(e) => updateEntry(i, e.target.value, value)}
                placeholder={placeholderKey ?? "key"}
                size="small"
                className="font-mono text-[11px]"
                style={{ flex: 1 }}
              />
              <Input
                value={value}
                onChange={(e) => updateEntry(i, key, e.target.value)}
                placeholder={placeholderValue ?? "value"}
                size="small"
                className="font-mono text-[11px]"
                style={{ flex: 1 }}
              />
              <button
                onClick={() => removeEntry(i)}
                className="shrink-0 inline-flex items-center justify-center w-5 h-5 bg-transparent border-none text-muted-soft hover:text-red-400 cursor-pointer p-0 transition-colors"
              >
                <Trash2 size={10} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Detect path params from path pattern ────────────────────────────────────

function extractPathParams(path: string): string[] {
  const matches = path.match(/:(\\w+)/g);
  return matches ? matches.map((m) => m.slice(1)) : [];
}

// ── Build cURL command ──────────────────────────────────────────────────────

function buildCurlCommand(
  method: string,
  baseUrl: string,
  path: string,
  params: Record<string, string>,
  query: Record<string, string>,
  headers: Record<string, string>,
  body: string
): string {
  // Replace path params
  let resolvedPath = path;
  for (const [key, val] of Object.entries(params)) {
    resolvedPath = resolvedPath.replace(`:${key}`, val || `:${key}`);
  }

  // Build query string
  const queryParts = Object.entries(query)
    .filter(([k]) => k)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
  const queryStr = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

  const url = `${baseUrl}/apis${resolvedPath}${queryStr}`;
  const parts = [`curl -X ${method}`, `  '${url}'`];

  // Headers
  for (const [k, v] of Object.entries(headers)) {
    if (k) parts.push(`  -H '${k}: ${v}'`);
  }

  // Body
  if (["POST", "PUT", "PATCH"].includes(method) && body && body !== "{}") {
    parts.push(`  -H 'Content-Type: application/json'`);
    parts.push(`  -d '${body}'`);
  }

  return parts.join(" \\\n");
}

// ── Main Component ──────────────────────────────────────────────────────────

const MAX_HISTORY = 10;
let nextHistoryId = 1;

export function TestPanel({
  method,
  path,
  testBody,
  onTestBodyChange,
  testing,
  testResult,
  onSend,
  baseUrl = "",
}: TestPanelProps) {
  const showRequestBody = ["POST", "PUT", "PATCH"].includes(method);
  const pathParamNames = extractPathParams(path);

  const [paramEntries, setParamEntries] = useState<[string, string][]>(
    pathParamNames.map((name) => [name, ""])
  );
  const [queryEntries, setQueryEntries] = useState<[string, string][]>([]);
  const [headerEntries, setHeaderEntries] = useState<[string, string][]>([]);

  // History state
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleSend = useCallback(() => {
    const params = Object.fromEntries(paramEntries.filter(([k]) => k));
    const query = Object.fromEntries(queryEntries.filter(([k]) => k));
    const headers = Object.fromEntries(headerEntries.filter(([k]) => k));
    onSend(params, query, headers);
  }, [paramEntries, queryEntries, headerEntries, onSend]);

  // Save to history when testResult changes
  const lastSavedResultRef = useState<TestResult | null>(null);
  if (
    testResult &&
    testResult !== lastSavedResultRef[0] &&
    !testing
  ) {
    lastSavedResultRef[1](testResult);
    const entry: HistoryEntry = {
      id: nextHistoryId++,
      method,
      path,
      timestamp: Date.now(),
      params: Object.fromEntries(paramEntries.filter(([k]) => k)),
      query: Object.fromEntries(queryEntries.filter(([k]) => k)),
      headers: Object.fromEntries(headerEntries.filter(([k]) => k)),
      body: testBody,
      result: testResult,
    };
    setHistory((prev) => [entry, ...prev].slice(0, MAX_HISTORY));
  }

  const handleCopyCurl = () => {
    const params = Object.fromEntries(paramEntries.filter(([k]) => k));
    const query = Object.fromEntries(queryEntries.filter(([k]) => k));
    const headers = Object.fromEntries(headerEntries.filter(([k]) => k));
    const curl = buildCurlCommand(
      method,
      baseUrl,
      path,
      params,
      query,
      headers,
      testBody
    );
    navigator.clipboard.writeText(curl);
    message.success("cURL copied to clipboard");
  };

  const restoreEntry = (entry: HistoryEntry) => {
    setParamEntries(Object.entries(entry.params));
    setQueryEntries(Object.entries(entry.query));
    setHeaderEntries(Object.entries(entry.headers));
    onTestBodyChange(entry.body);
    setShowHistory(false);
  };

  return (
    <div className="w-[400px] flex flex-col shrink-0 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3 border-b border-hairline flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-muted-soft uppercase tracking-wider">
            Test
          </span>
          <span className="font-mono text-[10px] text-[#8b5cf6] bg-[#8b5cf620] px-1.5 py-0.5 rounded">
            dry-run
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {/* Copy cURL */}
          <Tooltip title="Copy cURL command">
            <button
              onClick={handleCopyCurl}
              className="inline-flex items-center justify-center w-[28px] h-[28px] rounded-md bg-transparent border border-hairline text-muted-soft hover:text-ink hover:border-hairline-strong transition-colors cursor-pointer"
            >
              <Copy size={12} />
            </button>
          </Tooltip>
          {/* History toggle */}
          <Tooltip title={`History (${history.length})`}>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`inline-flex items-center justify-center w-[28px] h-[28px] rounded-md bg-transparent border transition-colors cursor-pointer ${
                showHistory
                  ? "text-[#8b5cf6] border-[#8b5cf640]"
                  : "border-hairline text-muted-soft hover:text-ink hover:border-hairline-strong"
              }`}
            >
              <History size={12} />
            </button>
          </Tooltip>
          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={testing}
            className="inline-flex items-center gap-1.5 h-[28px] px-3 rounded-md bg-[#1f8a65] text-white text-[12px] font-medium hover:bg-opacity-90 transition-opacity cursor-pointer border-none disabled:opacity-50"
          >
            <Play size={12} />
            {testing ? "Running..." : "Run"}
          </button>
        </div>
      </div>

      {/* History panel */}
      {showHistory && (
        <div className="border-b border-hairline bg-canvas max-h-[200px] overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-2 border-b border-hairline">
            <span className="font-mono text-[10px] text-muted-soft uppercase tracking-wider">
              Recent Requests ({history.length})
            </span>
            <button
              onClick={() => setShowHistory(false)}
              className="text-muted-soft hover:text-ink transition-colors bg-transparent border-none cursor-pointer p-0"
            >
              <X size={12} />
            </button>
          </div>
          {history.length === 0 ? (
            <div className="px-5 py-4 text-center font-mono text-[11px] text-muted-soft">
              No history yet
            </div>
          ) : (
            history.map((entry) => (
              <button
                key={entry.id}
                onClick={() => restoreEntry(entry)}
                className="w-full flex items-center gap-2 px-5 py-2 hover:bg-surface-card transition-colors cursor-pointer bg-transparent border-none text-left"
              >
                <span
                  className="font-mono text-[10px] font-semibold w-[40px] shrink-0"
                  style={{ color: getStatusColor(entry.result.status) }}
                >
                  {entry.result.status}
                </span>
                <span className="font-mono text-[10px] text-muted-soft w-[32px] shrink-0">
                  {entry.method}
                </span>
                <span className="font-mono text-[10px] text-ink truncate flex-1">
                  {entry.path}
                </span>
                <span className="font-mono text-[9px] text-muted-soft shrink-0">
                  {entry.result.executionTimeMs ?? 0}ms
                </span>
                <span className="font-mono text-[9px] text-muted-soft shrink-0">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </button>
            ))
          )}
        </div>
      )}

      {/* Request inputs */}
      <div
        className="px-5 py-3 border-b border-hairline space-y-3 overflow-y-auto"
        style={{ maxHeight: 280 }}
      >
        {/* Path params (auto-detected from path) */}
        {pathParamNames.length > 0 && (
          <KeyValueEditor
            label={`Path Params`}
            entries={paramEntries}
            onChange={setParamEntries}
            placeholderKey="param"
            placeholderValue="value"
          />
        )}

        {/* Query params */}
        <KeyValueEditor
          label="Query Params"
          entries={queryEntries}
          onChange={setQueryEntries}
          placeholderKey="key"
          placeholderValue="value"
        />

        {/* Headers */}
        <KeyValueEditor
          label="Headers"
          entries={headerEntries}
          onChange={setHeaderEntries}
          placeholderKey="header"
          placeholderValue="value"
        />

        {/* Request body (for POST/PUT/PATCH) */}
        {showRequestBody && (
          <div>
            <label className="font-mono text-[10px] text-muted-soft uppercase tracking-wider block mb-1.5">
              Body (JSON)
            </label>
            <textarea
              value={testBody}
              onChange={(e) => onTestBodyChange(e.target.value)}
              className="w-full font-mono text-[12px] leading-[1.5] bg-[#1e1e1e] text-[#d4d4d4] p-3 rounded-md border border-hairline resize-none outline-none"
              style={{ minHeight: 80 }}
              spellCheck={false}
            />
          </div>
        )}
      </div>

      {/* Response */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {testResult ? (
          <div className="space-y-3">
            {/* Status + timing */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="font-mono text-[14px] font-semibold"
                  style={{ color: getStatusColor(testResult.status) }}
                >
                  {testResult.status || "ERR"}
                </span>
              </div>
              <span className="font-mono text-[10px] text-muted-soft">
                {testResult.executionTimeMs ?? testResult.time ?? 0}ms
              </span>
            </div>

            {/* Console logs */}
            {testResult.consoleLogs && testResult.consoleLogs.length > 0 && (
              <div>
                <div className="font-mono text-[9px] text-muted-soft uppercase tracking-wider mb-1">
                  Console
                </div>
                <pre className="font-mono text-[11px] leading-[1.5] bg-[#1a1a2e] text-[#a5b4fc] p-2.5 rounded-md overflow-x-auto whitespace-pre-wrap m-0">
                  {testResult.consoleLogs.join("\n")}
                </pre>
              </div>
            )}

            {/* Response body */}
            <div>
              <div className="font-mono text-[9px] text-muted-soft uppercase tracking-wider mb-1">
                Response
              </div>
              <pre className="font-mono text-[12px] leading-[1.5] bg-[#1e1e1e] text-[#d4d4d4] p-3 rounded-md overflow-x-auto whitespace-pre-wrap m-0">
                {typeof testResult.body === "string"
                  ? testResult.body
                  : JSON.stringify(testResult.body, null, 2)}
              </pre>
            </div>

            {/* Error trace */}
            {testResult.error && (
              <div>
                <div className="font-mono text-[9px] text-red-400 uppercase tracking-wider mb-1">
                  Error
                </div>
                <pre className="font-mono text-[11px] leading-[1.4] bg-[#2a0a0a] text-[#fca5a5] p-2.5 rounded-md overflow-x-auto whitespace-pre-wrap m-0">
                  {testResult.error}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-soft">
            <Play size={24} strokeWidth={1.5} className="mb-2" />
            <span className="font-mono text-[11px] uppercase tracking-wider">
              Run to test current code
            </span>
            <span className="font-mono text-[10px] text-muted-soft mt-1">
              (tests code in editor, not saved version)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
