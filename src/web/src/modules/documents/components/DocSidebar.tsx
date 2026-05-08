import { Dropdown, Input, Modal, message } from "antd";
import { ArrowLeft, ChevronDown, ChevronRight, FileText, MoreHorizontal, PanelLeft, PanelLeftClose, Plus, Search, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DocumentItem } from "src/lib/types";
import { useShallow } from "zustand/react/shallow";
import { useDocumentsStore } from "../stores/document.store";

const { confirm } = Modal;

// ── Tree helpers ────────────────────────────────────────────────────────────────

interface TreeNode extends DocumentItem {
  children: TreeNode[];
  depth: number;
}

function buildTree(docs: DocumentItem[]): TreeNode[] {
  const map = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  for (const doc of docs) {
    map.set(doc.id, { ...doc, children: [], depth: 0 });
  }

  for (const doc of docs) {
    const node = map.get(doc.id)!;
    if (doc.parentId && map.has(doc.parentId)) {
      map.get(doc.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }

  // Max 3 levels: 0 (root), 1, 2
  function setDepth(node: TreeNode, depth: number) {
    node.depth = Math.min(depth, 2);
    for (const child of node.children) setDepth(child, depth + 1);
  }
  for (const root of roots) setDepth(root, 0);

  return roots;
}

// ── Sidebar Props ───────────────────────────────────────────────────────────────

interface DocSidebarProps {
  activeDocId?: string;
  collapsed: boolean;
  onToggleCollapse: () => void;
  width: number;
  onWidthChange: (w: number) => void;
}

const MIN_WIDTH = 200;
const MAX_WIDTH = 480;

export default function DocSidebar({ activeDocId, collapsed, onToggleCollapse, width, onWidthChange }: DocSidebarProps) {
  const navigate = useNavigate();

  const { activeProject, documents, createDocument, deleteDocument } = useDocumentsStore(
    useShallow((s) => ({
      activeProject: s.activeProject,
      documents: s.documents,
      createDocument: s.createDocument,
      deleteDocument: s.deleteDocument,
    })),
  );

  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const resizeRef = useRef<HTMLDivElement>(null);

  // Auto-expand parents of active doc + nodes with children
  useEffect(() => {
    if (documents.length > 0) {
      const hasChildren = new Set<string>();
      for (const doc of documents) {
        if (doc.parentId) hasChildren.add(doc.parentId);
      }
      // Also expand ancestors of active doc
      if (activeDocId) {
        const docMap = new Map(documents.map((d) => [d.id, d]));
        let cur = docMap.get(activeDocId)?.parentId;
        while (cur && docMap.has(cur)) {
          hasChildren.add(cur);
          cur = docMap.get(cur)!.parentId;
        }
      }
      setExpanded((prev) => {
        const next = new Set(prev);
        for (const id of hasChildren) next.add(id);
        return next;
      });
    }
  }, [documents, activeDocId]);

  const tree = useMemo(() => buildTree(documents), [documents]);

  const filteredTree = useMemo(() => {
    if (!search) return tree;
    const q = search.toLowerCase();
    return documents.filter((d) => d.title.toLowerCase().includes(q)).map((d) => ({ ...d, children: [], depth: 0 }) as TreeNode);
  }, [search, documents, tree]);

  const toggleExpand = useCallback((id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleCreate = useCallback(
    async (parentId?: string | null) => {
      const projectId = activeProject?.id;
      if (!projectId) return;
      const doc = await createDocument(projectId, parentId);
      if (doc) {
        navigate(`/documents/project/${projectId}/doc/${doc.id}`);
      }
    },
    [activeProject?.id, createDocument, navigate],
  );

  const handleDelete = useCallback(
    (doc: DocumentItem) => {
      const projectId = activeProject?.id;
      if (!projectId) return;
      const hasChildren = documents.some((d) => d.parentId === doc.id);
      confirm({
        title: <span className="font-mono text-[13px]">Delete "{doc.title}"?</span>,
        content: hasChildren ? "All sub-pages will also be deleted." : "This action cannot be undone.",
        okText: "Delete",
        okType: "danger",
        async onOk() {
          await deleteDocument(projectId, doc.id);
          // If we just deleted the active doc, navigate to project
          if (doc.id === activeDocId) {
            navigate(`/documents/project/${projectId}`);
          }
          message.success("Deleted");
        },
      });
    },
    [activeProject?.id, deleteDocument, documents, activeDocId, navigate],
  );

  // ── Resize handle ─────────────────────────────────────────────────────────────

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startW = width;

      const onMouseMove = (ev: MouseEvent) => {
        const newW = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startW + ev.clientX - startX));
        onWidthChange(newW);
      };
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    [width, onWidthChange],
  );

  if (collapsed) {
    return (
      <div className="flex flex-col items-center py-3 w-[44px] shrink-0 border-r border-hairline bg-surface-soft">
        <button
          onClick={onToggleCollapse}
          className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-transparent border-none cursor-pointer text-muted hover:text-ink hover:bg-surface-card transition-colors"
          title="Expand sidebar"
        >
          <PanelLeft size={16} />
        </button>
      </div>
    );
  }

  const projectId = activeProject?.id;

  return (
    <div className="flex shrink-0 h-full relative" style={{ width }}>
      <div className="flex flex-col flex-1 h-full bg-surface-soft border-r border-hairline overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-3 shrink-0">
          <button
            onClick={() => navigate("/documents")}
            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-transparent border-none cursor-pointer text-muted text-[12px] font-medium hover:text-ink hover:bg-surface-card transition-colors"
          >
            <ArrowLeft size={13} />
            <span className="truncate max-w-[120px]">{activeProject?.name ?? "Projects"}</span>
          </button>
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => handleCreate()}
              className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-transparent border-none cursor-pointer text-muted hover:text-ink hover:bg-surface-card transition-colors"
              title="New page"
            >
              <Plus size={15} />
            </button>
            <button
              onClick={onToggleCollapse}
              className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-transparent border-none cursor-pointer text-muted hover:text-ink hover:bg-surface-card transition-colors"
              title="Collapse sidebar"
            >
              <PanelLeftClose size={15} />
            </button>
          </div>
        </div>

        {/* Search */}
        {documents.length > 3 && (
          <div className="px-3 pb-2 shrink-0">
            <Input
              prefix={<Search size={12} className="text-muted-soft" />}
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
              size="small"
              className="bg-transparent border-hairline hover:border-hairline-strong focus-within:border-ink shadow-none text-[12px] rounded-md"
            />
          </div>
        )}

        {/* Tree */}
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          {filteredTree.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <FileText size={24} className="text-muted-soft mb-3" strokeWidth={2} />
              <div className="text-[12px] text-muted-soft mb-4">{search ? "No results" : "Empty project"}</div>
              {!search && (
                <button
                  onClick={() => handleCreate()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium bg-transparent border border-hairline-strong text-ink cursor-pointer hover:border-ink transition-colors"
                >
                  <Plus size={13} /> New Page
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-[2px]">
              {renderSidebarTree(
                filteredTree,
                expanded,
                toggleExpand,
                (id) => navigate(`/documents/project/${projectId}/doc/${id}`),
                handleDelete,
                handleCreate,
                activeDocId,
              )}
            </div>
          )}
        </div>
      </div>

      {/* Resize handle */}
      <div ref={resizeRef} className="absolute top-0 right-0 w-[5px] h-full cursor-col-resize z-20 group" onMouseDown={handleMouseDown}>
        <div className="w-[1px] h-full mx-auto bg-transparent group-hover:bg-primary transition-colors duration-150" />
      </div>
    </div>
  );
}

// ── Recursive sidebar tree ──────────────────────────────────────────────────────

function renderSidebarTree(
  nodes: TreeNode[],
  expanded: Set<string>,
  onToggle: (id: string, e: React.MouseEvent) => void,
  onNavigate: (id: string) => void,
  onDelete: (doc: DocumentItem) => void,
  onCreate: (parentId?: string | null) => void,
  activeDocId?: string,
) {
  return nodes.map((node) => (
    <div key={node.id} className="flex flex-col gap-[2px]">
      <SidebarRow
        node={node}
        isExpanded={expanded.has(node.id)}
        isActive={node.id === activeDocId}
        onToggle={onToggle}
        onNavigate={onNavigate}
        onDelete={() => onDelete(node)}
        onCreateChild={() => onCreate(node.id)}
      />
      {node.children.length > 0 && expanded.has(node.id) && (
        <div className="flex flex-col gap-[2px]">{renderSidebarTree(node.children, expanded, onToggle, onNavigate, onDelete, onCreate, activeDocId)}</div>
      )}
    </div>
  ));
}

// ── Sidebar row ─────────────────────────────────────────────────────────────────

// Depth-based left padding: root=8, child=20, grandchild=32
const DEPTH_PADDING = [8, 28, 52];

function SidebarRow({
  node,
  isExpanded,
  isActive,
  onToggle,
  onNavigate,
  onDelete,
  onCreateChild,
}: {
  node: TreeNode;
  isExpanded: boolean;
  isActive: boolean;
  onToggle: (id: string, e: React.MouseEvent) => void;
  onNavigate: (id: string) => void;
  onDelete: () => void;
  onCreateChild: () => void;
}) {
  const hasChildren = node.children.length > 0;
  const depth = node.depth;
  const canNest = depth < 2; // max 3 levels (0, 1, 2)

  return (
    <div
      className={`group flex items-center gap-0.5 pr-2 py-[5px] rounded-md cursor-pointer transition-all duration-75 ${
        isActive ? "bg-[rgba(38,37,30,0.06)] text-ink font-medium" : "text-body hover:bg-[rgba(38,37,30,0.03)] hover:text-ink"
      }`}
      style={{ paddingLeft: DEPTH_PADDING[depth] ?? 24 }}
      onClick={() => onNavigate(node.id)}
    >
      {/* Icon / Toggle — chevron replaces icon when has children */}
      {hasChildren ? (
        <button
          className="inline-flex items-center justify-center w-[18px] h-[18px] rounded shrink-0 bg-transparent border-none transition-all duration-75 text-muted-soft hover:text-ink cursor-pointer"
          onClick={(e) => onToggle(node.id, e)}
        >
          {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
        </button>
      ) : (
        <span className="shrink-0 leading-none text-center w-[18px] text-[14px]">
          {node.icon || <FileText size={13} strokeWidth={2} className="text-muted-soft" />}
        </span>
      )}

      {/* Title */}
      <span className="flex-1 truncate font-medium leading-snug text-[13px]">{node.title || "Untitled"}</span>

      {/* Actions (on hover) */}
      <div className="flex items-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-75">
        {canNest && (
          <button
            className="inline-flex items-center justify-center w-[22px] h-[22px] bg-transparent border-none cursor-pointer text-muted-soft rounded p-0 hover:text-ink hover:bg-surface-card transition-colors"
            title="Add sub-page"
            onClick={(e) => {
              e.stopPropagation();
              onCreateChild();
            }}
          >
            <Plus size={12} />
          </button>
        )}
        <Dropdown
          menu={{
            items: [
              {
                key: "delete",
                icon: <Trash2 size={12} />,
                label: <span className="text-[12px]">Delete</span>,
                danger: true,
                onClick: (info) => {
                  info.domEvent.stopPropagation();
                  onDelete();
                },
              },
            ],
          }}
          trigger={["click"]}
        >
          <button
            className="inline-flex items-center justify-center w-[22px] h-[22px] bg-transparent border-none cursor-pointer text-muted-soft rounded p-0 hover:text-ink hover:bg-surface-card transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal size={12} />
          </button>
        </Dropdown>
      </div>
    </div>
  );
}
