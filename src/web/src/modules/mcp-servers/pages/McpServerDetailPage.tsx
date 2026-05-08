import { Spin, Switch, Tooltip, message } from "antd";
import { ArrowLeft, BookOpen, Check, Copy, Globe, Key, Layers, Play, Shield, Terminal, Wrench, Zap } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE, client } from "src/lib/client";
import { MoroError } from "src/lib/http";
import type { McpToolItem, McpToolServerItem } from "src/lib/types";

// ── MCP Meta-Tools (the 3 tools exposed to AI agents) ──────────────────────

interface McpMetaTool {
  name: string;
  description: string;
  icon: React.ReactNode;
  usage: string;
}

const MCP_META_TOOLS: McpMetaTool[] = [
  {
    name: "get_overview",
    description: "Returns a summary of all available actions and resources",
    icon: <Layers size={14} strokeWidth={1.5} />,
    usage: "get_overview()",
  },
  {
    name: "get_docs",
    description: "Returns detailed params, types, and examples for an action",
    icon: <BookOpen size={14} strokeWidth={1.5} />,
    usage: 'get_docs({ action: "variables.set" })',
  },
  {
    name: "execute",
    description: "Validates payload and executes the specified action",
    icon: <Play size={14} strokeWidth={1.5} />,
    usage: 'execute({ action: "variables.set", payload: { ... } })',
  },
];

// ══════════════════════════════════════════════════════════════════════════════
//  MCP SERVER DETAIL PAGE
// ══════════════════════════════════════════════════════════════════════════════

export default function McpServerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [server, setServer] = useState<McpToolServerItem | null>(null);
  const [tools, setTools] = useState<McpToolItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"tools" | "config">("tools");

  const fetchData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const [srv, toolsRes] = await Promise.all([client.mcpToolServers.get(id), client.mcpToolServers.listTools(id)]);
      setServer(srv);
      setTools(toolsRes.items);
    } catch {
      message.error("Failed to load MCP server");
      navigate("/mcp-servers");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleToggleTool = async (tool: McpToolItem) => {
    if (!id) return;
    try {
      const updated = await client.mcpToolServers.updateTool(id, tool.id, {
        isActive: !tool.isActive,
      });
      setTools((prev) => prev.map((t) => (t.id === tool.id ? updated : t)));
    } catch (err) {
      if (err instanceof MoroError) message.error(err.message);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const isBuiltin = server?.type === "builtin";
  const apiOrigin = API_BASE || `${window.location.protocol}//${window.location.hostname}:18080`;
  const mcpEndpoint = `${apiOrigin}/api/mcp/${id}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-canvas">
        <Spin size="large" />
      </div>
    );
  }

  if (!server) return null;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-canvas">
      {/* Header */}
      <div className="px-8 pt-10 pb-6 shrink-0 border-b border-hairline">
        <button
          onClick={() => navigate("/mcp-servers")}
          className="flex items-center gap-1.5 text-muted text-[13px] mb-4 bg-transparent border-none cursor-pointer hover:text-ink transition-colors p-0"
        >
          <ArrowLeft size={14} />
          <span className="font-mono text-[11px] uppercase tracking-wide">MCP Servers</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-md border border-hairline-soft bg-canvas text-muted shrink-0">
              <Shield size={18} strokeWidth={1.5} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-[28px] font-normal text-ink tracking-[-0.56px] m-0 leading-tight">{server.name}</h1>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#dfa88f]/30 text-[#8a5a3a]">Built-in</span>
              </div>
              {server.description && <p className="text-[13px] text-muted mt-1 m-0">{server.description}</p>}
            </div>
          </div>

          <div className="flex items-center gap-1 p-0.5 rounded-md bg-surface-strong border border-hairline">
            <button
              onClick={() => setActiveTab("tools")}
              className={`flex items-center gap-1.5 h-[30px] px-3 rounded-md font-mono text-[11px] uppercase tracking-wider border-none cursor-pointer transition-all duration-150 ${
                activeTab === "tools" ? "bg-canvas text-ink shadow-sm" : "bg-transparent text-muted hover:text-ink"
              }`}
            >
              <Wrench size={12} />
              Tools
            </button>
            <button
              onClick={() => setActiveTab("config")}
              className={`flex items-center gap-1.5 h-[30px] px-3 rounded-md font-mono text-[11px] uppercase tracking-wider border-none cursor-pointer transition-all duration-150 ${
                activeTab === "config" ? "bg-canvas text-ink shadow-sm" : "bg-transparent text-muted hover:text-ink"
              }`}
            >
              <Terminal size={12} />
              Connect
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-8">
        {activeTab === "tools" ? (
          <ToolsTab isBuiltin={isBuiltin} tools={tools} onToggle={handleToggleTool} />
        ) : (
          <ConfigTab mcpEndpoint={mcpEndpoint} copiedField={copiedField} onCopy={copyToClipboard} />
        )}
      </div>
    </div>
  );
}

// ── Tools Tab ─────────────────────────────────────────────────────────────────

function ToolsTab({
  isBuiltin,
  tools,
  onToggle,
}: {
  isBuiltin: boolean;
  tools: McpToolItem[];
  onToggle: (t: McpToolItem) => void;
}) {
  if (!isBuiltin) {
    return (
      <div className="flex flex-col gap-2">
        {tools.map((tool) => (
          <div key={tool.id} className="flex items-center justify-between px-4 py-3 border border-hairline rounded-md bg-surface-card">
            <div className="flex items-center gap-3 min-w-0">
              <Wrench size={14} className="text-muted shrink-0" />
              <span className="font-mono text-[13px] text-ink font-medium truncate">{tool.name}</span>
              <span className="text-[12px] text-muted truncate">{tool.description}</span>
            </div>
            <Switch size="small" checked={!!tool.isActive} onChange={() => onToggle(tool)} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-[800px] mx-auto">
      {/* ── 3 Meta-Tools ── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-muted" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">MCP Tools — 3 Exposed to Agents</span>
        </div>
        <div className="flex flex-col gap-2">
          {MCP_META_TOOLS.map((tool, idx) => (
            <div
              key={tool.name}
              className="flex items-center justify-between px-4 py-3.5 border border-hairline rounded-md bg-surface-card hover:border-hairline-strong transition-colors duration-150 opacity-0 animate-[fadeInUp_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards]"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#dfa88f]/15 border border-[#dfa88f]/30 text-[#8a5a3a] shrink-0">
                  {tool.icon}
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[13px] text-ink font-medium">{tool.name}</div>
                  <div className="text-[12px] text-muted mt-0.5">{tool.description}</div>
                </div>
              </div>
              <div className="hidden sm:block font-mono text-[11px] text-muted-soft bg-canvas border border-hairline rounded px-2.5 py-1 shrink-0 ml-4">
                {tool.usage}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Config Tab ────────────────────────────────────────────────────────────────

function ConfigTab({
  mcpEndpoint,
  copiedField,
  onCopy,
}: {
  mcpEndpoint: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}) {
  const cursorConfig = JSON.stringify(
    {
      mcpServers: {
        "moro-llm-toolkit": {
          url: `${mcpEndpoint}`,
          headers: {
            Authorization: "Bearer <YOUR_API_KEY>",
          },
        },
      },
    },
    null,
    2,
  );

  const claudeCodeCmd = `claude mcp add moro-toolkit ${mcpEndpoint} --header "Authorization: Bearer <YOUR_API_KEY>"`;

  const antigravityConfig = JSON.stringify(
    {
      mcpServers: {
        "moro-llm-toolkit": {
          serverUrl: `${mcpEndpoint}`,
          headers: {
            Authorization: "Bearer <YOUR_API_KEY>",
          },
        },
      },
    },
    null,
    2,
  );

  return (
    <div className="flex flex-col gap-8 max-w-[800px] mx-auto">
      {/* Endpoint Info */}
      <div className="opacity-0 animate-[fadeInUp_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards]">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={14} className="text-muted" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">MCP Endpoint</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-3 rounded-md border border-hairline bg-surface-card">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#1f8a65] bg-[#1f8a65]/10 px-2 py-0.5 rounded shrink-0">POST</span>
          <code className="font-mono text-[13px] text-ink flex-1 break-all">{mcpEndpoint}</code>
          <CopyButton text={mcpEndpoint} field="endpoint" copiedField={copiedField} onCopy={onCopy} />
        </div>
        <p className="text-[12px] text-muted mt-2 mb-0">Streamable HTTP transport — compatible with MCP SDK 2025+</p>
      </div>

      {/* Authentication */}
      <div className="opacity-0 animate-[fadeInUp_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards]" style={{ animationDelay: "0.05s" }}>
        <div className="flex items-center gap-2 mb-4">
          <Key size={14} className="text-muted" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Authentication</span>
        </div>
        <div className="px-4 py-4 rounded-md border border-hairline bg-surface-card flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#dfa88f]/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="font-mono text-[10px] text-[#8a5a3a] font-bold">1</span>
            </div>
            <div>
              <div className="text-[13px] text-ink font-medium">API Key (Recommended)</div>
              <div className="text-[12px] text-muted mt-0.5">
                Create an API Key in{" "}
                <a href="/api-keys" className="text-ink underline hover:no-underline">
                  Settings → API Keys
                </a>
                , then pass it in the header:
              </div>
              <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-md bg-canvas border border-hairline font-mono text-[12px] text-ink">
                <span className="text-muted-soft">Authorization:</span> Bearer ltk_xxxxxxxx...
              </div>
            </div>
          </div>
          <div className="w-full h-px bg-hairline" />
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-surface-strong flex items-center justify-center shrink-0 mt-0.5">
              <span className="font-mono text-[10px] text-muted font-bold">2</span>
            </div>
            <div>
              <div className="text-[13px] text-ink font-medium">JWT Bearer Token</div>
              <div className="text-[12px] text-muted mt-0.5">
                Use the access token from <code className="text-[11px] bg-canvas px-1 py-0.5 rounded border border-hairline">POST /api/auth/login</code> —
                suitable for dev/testing.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cursor */}
      <ConfigBlock
        title="Cursor"
        subtitle="Add to .cursor/mcp.json in your project root"
        code={cursorConfig}
        field="cursor"
        copiedField={copiedField}
        onCopy={onCopy}
        delay="0.1s"
      />

      {/* Claude Code */}
      <ConfigBlock
        title="Claude Code"
        subtitle="Run this command in your terminal"
        code={claudeCodeCmd}
        field="claudecode"
        copiedField={copiedField}
        onCopy={onCopy}
        delay="0.15s"
      />

      {/* Antigravity (Gemini) */}
      <ConfigBlock
        title="Antigravity / Gemini"
        subtitle="Add to .gemini/settings.json"
        code={antigravityConfig}
        field="antigravity"
        copiedField={copiedField}
        onCopy={onCopy}
        delay="0.2s"
      />
    </div>
  );
}

// ── Reusable Config Block ─────────────────────────────────────────────────────

function ConfigBlock({
  title,
  subtitle,
  code,
  field,
  copiedField,
  onCopy,
  delay = "0s",
}: {
  title: string;
  subtitle: string;
  code: string;
  field: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
  delay?: string;
}) {
  return (
    <div className="opacity-0 animate-[fadeInUp_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards]" style={{ animationDelay: delay }}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="font-mono text-[12px] text-ink font-medium">{title}</div>
          <div className="text-[11px] text-muted-soft mt-0.5">{subtitle}</div>
        </div>
        <CopyButton text={code} field={field} copiedField={copiedField} onCopy={onCopy} />
      </div>
      <pre className="m-0 p-4 rounded-md bg-[#1e1e1e] border border-hairline font-mono text-[12px] text-[#d4d4d4] overflow-x-auto leading-relaxed whitespace-pre">
        {code}
      </pre>
    </div>
  );
}

// ── Copy Button ───────────────────────────────────────────────────────────────

function CopyButton({
  text,
  field,
  copiedField,
  onCopy,
}: {
  text: string;
  field: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}) {
  const isCopied = copiedField === field;
  return (
    <Tooltip title={isCopied ? "Copied!" : "Copy"}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onCopy(text, field);
        }}
        className={`inline-flex items-center justify-center gap-1.5 h-[28px] px-2.5 rounded-md border font-mono text-[10px] uppercase tracking-wider cursor-pointer transition-all duration-200 ${
          isCopied
            ? "bg-[#1f8a65]/10 border-[#1f8a65]/30 text-[#1f8a65]"
            : "bg-transparent border-hairline text-muted hover:border-hairline-strong hover:text-ink"
        }`}
      >
        {isCopied ? <Check size={11} /> : <Copy size={11} />}
        {isCopied ? "Copied" : "Copy"}
      </button>
    </Tooltip>
  );
}
