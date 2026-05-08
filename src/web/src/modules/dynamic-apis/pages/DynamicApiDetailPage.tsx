import { Modal, Spin, Tabs, message } from "antd";
import { AlertTriangle, BookOpen, Clock, Terminal } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE, client } from "src/lib/client";
import { MoroError } from "src/lib/http";
import type { DynamicApiItem, DynamicApiLogItem } from "src/lib/types";



import { EndpointHeader } from "../components/EndpointHeader";
import { HandlerCodeEditor } from "../components/HandlerCodeEditor";
import { HandlerSdkReference } from "../components/HandlerSdkReference";
import { LogsPanel } from "../components/LogsPanel";
import { TestPanel } from "../components/TestPanel";

const { confirm } = Modal;

const DEFAULT_CODE = `async function handler(request, context) {
  // request: { method, path, params, query, headers, body }
  // context: { log }
  //
  // Return: { status, headers?, body }

  context.log("Hello from handler!");

  return {
    status: 200,
    body: { message: "Hello World" }
  };
}`;

// ══════════════════════════════════════════════════════════════════════════════
//  DYNAMIC API DETAIL PAGE
// ══════════════════════════════════════════════════════════════════════════════

export default function DynamicApiDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [api, setApi] = useState<DynamicApiItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [method, setMethod] = useState<DynamicApiItem["method"]>("GET");
  const [path, setPath] = useState("");
  const [code, setCode] = useState(DEFAULT_CODE);
  const [isActive, setIsActive] = useState(true);
  const [isPublic, setIsPublic] = useState(false);
  const [timeout, setTimeoutVal] = useState(30000);

  // Test panel state
  const [testBody, setTestBody] = useState("{}");
  const [testResult, setTestResult] = useState<{
    status: number;
    body: unknown;
    consoleLogs?: string[];
    executionTimeMs?: number;
    error?: string;
    time?: number;
  } | null>(null);
  const [testing, setTesting] = useState(false);

  // Logs
  const [logs, setLogs] = useState<DynamicApiLogItem[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);

  // ── Data Fetching ──────────────────────────────────────────────────────────

  const fetchApi = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await client.dynamicApis.get(id);
      setApi(data);
      setName(data.name);
      setMethod(data.method);
      setPath(data.path);
      setCode(data.code || DEFAULT_CODE);
      setIsActive(data.isActive);
      setIsPublic(data.isPublic);
      setTimeoutVal(data.timeout);
      setDirty(false);
    } catch {
      message.error("Failed to load API");
      navigate("/dynamic-apis");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const fetchLogs = useCallback(async () => {
    if (!id) return;
    setLogsLoading(true);
    try {
      const result = await client.dynamicApis.listLogs(id, { limit: 50 });
      setLogs(result.items);
    } catch {
      // silent
    } finally {
      setLogsLoading(false);
    }
  }, [id]);

  // ── Keyboard Shortcuts ─────────────────────────────────────────────────────

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  // ── Actions ────────────────────────────────────────────────────────────────

  const markDirty = () => {
    if (!dirty) setDirty(true);
  };

  const handleSave = async () => {
    if (!id || saving) return;
    setSaving(true);
    try {
      const updated = await client.dynamicApis.update(id, {
        name,
        method,
        path,
        description: null,
        code,
        isActive,
        isPublic,
        timeout,
      });
      setApi(updated);
      setDirty(false);
      message.success("Saved");
    } catch (err) {
      if (err instanceof MoroError) message.error(err.message);
      else message.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    if (!api) return;
    confirm({
      title: <span className="font-mono text-[14px]">Delete Endpoint</span>,
      icon: <AlertTriangle size={20} className="text-red-500 mr-2" />,
      content: `Delete "${api.name}" (${api.method} ${api.path})? This action is irreversible.`,
      okText: "Delete",
      okType: "danger",
      async onOk() {
        try {
          await client.dynamicApis.delete(api.id);
          message.success(`Deleted "${api.name}"`);
          navigate("/dynamic-apis");
        } catch (err) {
          if (err instanceof MoroError) message.error(err.message);
        }
      },
    });
  };

  const handleTest = async (params: Record<string, string>, query: Record<string, string>, headers: Record<string, string>) => {
    if (!api) return;
    setTesting(true);
    setTestResult(null);
    try {
      // Dry-run: send current editor code to test endpoint
      const url = `${API_BASE || ""}/api/dynamic-apis/${api.id}/test`;
      const token = localStorage.getItem("access_token");

      let bodyParsed: unknown = null;
      if (["POST", "PUT", "PATCH"].includes(method)) {
        try {
          bodyParsed = JSON.parse(testBody);
        } catch {
          bodyParsed = testBody;
        }
      }

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          code,
          method,
          path,
          params,
          query,
          headers,
          body: bodyParsed,
        }),
      });

      const data = await res.json();
      setTestResult(data);
    } catch (err) {
      setTestResult({
        status: 0,
        body: { error: "network_error", message: (err as Error).message },
      });
    } finally {
      setTesting(false);
    }
  };


  // ── Render ─────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-canvas">
        <Spin size="large" />
      </div>
    );
  }

  if (!api) return null;

  const baseUrl = API_BASE || window.location.origin;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-canvas">
      <EndpointHeader
        baseUrl={baseUrl}
        dirty={dirty}
        saving={saving}
        isActive={isActive}
        name={name}
        method={method}
        path={path}
        isPublic={isPublic}
        timeout={timeout}
        onBack={() => navigate("/dynamic-apis")}
        onDelete={handleDelete}
        onSave={handleSave}
        onActiveChange={(checked) => {
          setIsActive(checked);
          markDirty();
        }}
        onNameChange={(v) => {
          setName(v);
          markDirty();
        }}
        onMethodChange={(v) => {
          setMethod(v);
          markDirty();
        }}
        onPathChange={(v) => {
          setPath(v);
          markDirty();
        }}
        onPublicChange={(v) => {
          setIsPublic(v);
          markDirty();
        }}
        onTimeoutChange={(v) => {
          setTimeoutVal(v);
          markDirty();
        }}
      />

      {/* Main content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Left: Config + Code */}
        <div className="flex-1 flex flex-col overflow-hidden border-r border-hairline">
          <Tabs
            defaultActiveKey="code"
            style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}
            styles={{
              header: { paddingLeft: "20px", paddingRight: "20px", flexShrink: 0 },
            }}
            items={[
              {
                key: "code",
                label: (
                  <span className="flex items-center gap-1.5 font-mono text-[12px]">
                    <Terminal size={13} /> Code
                  </span>
                ),
                children: (
                  <div className="flex flex-col overflow-hidden" style={{ height: "calc(100vh - 160px)" }}>
                    <HandlerCodeEditor
                      value={code}
                      onChange={(v) => {
                        setCode(v);
                        markDirty();
                      }}
                    />
                  </div>
                ),
              },
              {
                key: "logs",
                label: (
                  <span className="flex items-center gap-1.5 font-mono text-[12px]">
                    <Clock size={13} /> Logs
                  </span>
                ),
                children: <LogsPanel logs={logs} loading={logsLoading} onRefresh={fetchLogs} />,
              },
              {
                key: "sdk",
                label: (
                  <span className="flex items-center gap-1.5 font-mono text-[12px]">
                    <BookOpen size={13} /> SDK Reference
                  </span>
                ),
                children: (
                  <div className="overflow-y-auto px-5 pb-8" style={{ maxHeight: "calc(100vh - 212px)" }}>
                    <HandlerSdkReference />
                  </div>
                ),
              },
            ]}
            onChange={(key) => {
              if (key === "logs") fetchLogs();
            }}
          />
        </div>

        {/* Right: Test Panel */}
        <TestPanel
          method={method}
          path={path}
          testBody={testBody}
          onTestBodyChange={setTestBody}
          testing={testing}
          testResult={testResult}
          onSend={handleTest}
          baseUrl={baseUrl}
        />
      </div>
    </div>
  );
}
