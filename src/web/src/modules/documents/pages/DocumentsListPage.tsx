import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Form, Input, Spin, Dropdown, message } from "antd";
import {
  Plus,
  FolderOpen,
  Pencil,
  Settings,
  Trash2,
} from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useDocumentsStore } from "../stores/document.store";

const { confirm } = Modal;

/**
 * Child route rendered inside DocumentsLayout <Outlet />.
 * Shows project welcome state when no document is selected.
 */
export default function DocumentsListPage() {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  const {
    activeProject,
    documents,
    docsLoading,
    createDocument,
    deleteProject,
  } = useDocumentsStore(
    useShallow((s) => ({
      activeProject: s.activeProject,
      documents: s.documents,
      docsLoading: s.docsLoading,
      createDocument: s.createDocument,
      deleteProject: s.deleteProject,
    })),
  );

  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleCreate = useCallback(async () => {
    if (!projectId) return;
    const doc = await createDocument(projectId);
    if (doc) {
      navigate(`/documents/project/${projectId}/doc/${doc.id}`);
    }
  }, [projectId, createDocument, navigate]);

  const handleDeleteProject = useCallback(() => {
    if (!activeProject) return;
    confirm({
      title: <span className="font-mono text-[14px]">Delete Project</span>,
      content: "All documents will be permanently deleted.",
      okText: "Delete",
      okType: "danger",
      async onOk() {
        await deleteProject(activeProject.id);
        navigate("/documents", { replace: true });
        message.success("Project deleted");
      },
    });
  }, [activeProject, deleteProject, navigate]);

  const projectName = activeProject?.name ?? "...";

  if (docsLoading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8">
      <div className="w-16 h-16 rounded-2xl bg-surface-card border border-hairline flex items-center justify-center mb-6">
        {activeProject?.icon || <FolderOpen size={28} className="text-muted-soft" strokeWidth={1.2} />}
      </div>
      <h1 className="font-display text-[28px] font-normal text-ink tracking-[-0.5px] m-0 mb-2">
        {projectName}
      </h1>
      {activeProject?.description && (
        <p className="text-[14px] text-muted mb-0 max-w-[400px] text-center">
          {activeProject.description}
        </p>
      )}
      <div className="text-[13px] text-muted-soft mt-2 mb-8">
        {documents.length} {documents.length === 1 ? "page" : "pages"}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-ink text-canvas font-medium text-[13px] hover:bg-opacity-90 transition-opacity cursor-pointer border-none"
        >
          <Plus size={16} />
          New Page
        </button>
        <Dropdown
          menu={{
            items: [
              {
                key: "edit",
                icon: <Pencil size={14} />,
                label: <span className="font-mono text-[12px]">Configure</span>,
                onClick: () => setEditModalOpen(true),
              },
              { type: "divider" },
              {
                key: "delete",
                icon: <Trash2 size={14} />,
                label: <span className="font-mono text-[12px]">Delete Project</span>,
                danger: true,
                onClick: handleDeleteProject,
              },
            ],
          }}
          trigger={["click"]}
        >
          <button className="flex items-center justify-center w-[38px] h-[38px] border border-hairline rounded-md text-muted bg-canvas hover:bg-surface-card transition-colors cursor-pointer">
            <Settings size={16} />
          </button>
        </Dropdown>
      </div>

      {documents.length === 0 && (
        <div className="mt-12 text-[13px] text-muted-soft text-center max-w-[320px]">
          Select a page from the sidebar or create a new one to get started.
        </div>
      )}

      {/* Edit Project Modal */}
      {activeProject && (
        <EditProjectModal
          open={editModalOpen}
          project={activeProject}
          onClose={() => setEditModalOpen(false)}
          onSaved={() => setEditModalOpen(false)}
        />
      )}
    </div>
  );
}

// ── Edit Project Modal ──────────────────────────────────────────────────────────

function EditProjectModal({
  open,
  project,
  onClose,
  onSaved,
}: {
  open: boolean;
  project: { id: string; name: string; description: string | null };
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const updateProject = useDocumentsStore((s) => s.updateProject);

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        name: project.name,
        description: project.description ?? "",
      });
    }
  }, [open, project, form]);

  const handleSubmit = async (values: { name: string; description?: string }) => {
    setLoading(true);
    try {
      const updated = await updateProject(project.id, {
        name: values.name,
        description: values.description || null,
      });
      if (updated) {
        onSaved();
        message.success("Project updated");
      }
    } catch {
      message.error("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Configuration"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      width={420}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        style={{ marginTop: 24 }}
      >
        <Form.Item
          name="name"
          label={<span className="font-mono text-[11px] text-muted tracking-wide uppercase">Project Name</span>}
          rules={[{ required: true, message: "Required" }]}
        >
          <Input autoFocus className="font-mono text-[13px] bg-canvas border-hairline focus:border-ink rounded-md py-2" />
        </Form.Item>
        <Form.Item name="description" label={<span className="font-mono text-[11px] text-muted tracking-wide uppercase">Description</span>}>
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            className="text-[13px] bg-canvas border-hairline focus:border-ink rounded-md"
          />
        </Form.Item>
        <div className="flex justify-end gap-3 pt-4 border-t border-hairline mt-6">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-hairline text-[13px] font-medium text-ink bg-transparent rounded-md cursor-pointer hover:bg-canvas">Cancel</button>
          <button type="submit" disabled={loading} className="px-5 py-2 border border-transparent text-[13px] font-medium text-canvas bg-ink rounded-md cursor-pointer hover:bg-opacity-90 transition-opacity">
            Commit Changes
          </button>
        </div>
      </Form>
    </Modal>
  );
}
