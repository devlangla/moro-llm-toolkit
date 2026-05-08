import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import { useShallow } from "zustand/react/shallow";
import { useDocumentsStore } from "../stores/document.store";
import DocumentEditor from "../components/DocumentEditor";

/**
 * Child route rendered inside DocumentsLayout <Outlet />.
 * Only renders the editor — sidebar is handled by the parent layout.
 */
export default function DocumentEditorPage() {
  const { projectId, id: docId } = useParams<{ projectId: string; id: string }>();

  const {
    activeDoc,
    docLoading,
    fetchDocument,
  } = useDocumentsStore(
    useShallow((s) => ({
      activeDoc: s.activeDoc,
      docLoading: s.docLoading,
      fetchDocument: s.fetchDocument,
    })),
  );

  // Load the document when URL param changes
  useEffect(() => {
    if (!docId || !projectId) return;

    // Already loaded
    if (activeDoc?.id === docId) return;

    const load = async () => {
      // Use fetchDocument since we already have projectId from the URL
      await fetchDocument(projectId, docId);
    };
    load();
  }, [docId, projectId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (docLoading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <Spin size="large" />
      </div>
    );
  }

  if (!activeDoc) {
    return (
      <div className="flex items-center justify-center flex-1">
        <Spin size="large" />
      </div>
    );
  }

  return <DocumentEditor />;
}
