import { useEffect, useState } from "react";
import { Outlet, useMatch, useNavigate, useParams } from "react-router-dom";
import { Spin } from "antd";
import { useShallow } from "zustand/react/shallow";
import { useDocumentsStore } from "../stores/document.store";
import DocSidebar from "../components/DocSidebar";

/**
 * Persistent layout for the documents module.
 * Renders: [DocSidebar | <Outlet />]
 *
 * The sidebar stays mounted while child routes (project welcome / editor) swap in the Outlet.
 * This prevents the sidebar from re-mounting (and re-fetching) on every doc navigation.
 */
export default function DocumentsLayout() {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  // Get active doc ID from URL (not from store — store may hold stale ref)
  const docMatch = useMatch("/documents/project/:projectId/doc/:id");
  const activeDocId = docMatch?.params.id;

  const {
    activeProject,
    fetchDocuments,
    fetchProject,
    setActiveProject,
  } = useDocumentsStore(
    useShallow((s) => ({
      activeProject: s.activeProject,
      fetchDocuments: s.fetchDocuments,
      fetchProject: s.fetchProject,
      setActiveProject: s.setActiveProject,
    })),
  );

  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Load project when layout mounts or projectId changes
  useEffect(() => {
    if (!projectId) return;
    const load = async () => {
      if (!activeProject || activeProject.id !== projectId) {
        const project = await fetchProject(projectId);
        if (project) {
          setActiveProject(project);
          fetchDocuments(project.id);
        } else {
          navigate("/documents", { replace: true });
        }
      } else {
        fetchDocuments(projectId);
      }
    };
    load();
  }, [projectId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!activeProject && !projectId) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden bg-canvas">
      {/* Persistent sidebar */}
      <DocSidebar
        activeDocId={activeDocId}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        width={sidebarWidth}
        onWidthChange={setSidebarWidth}
      />

      {/* Child route content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
