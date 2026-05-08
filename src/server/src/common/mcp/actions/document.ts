import { z } from "zod";
import type { ActionDefinition } from "../registry.js";

export const projectActions: ActionDefinition[] = [
  {
    name: "projects.list",
    category: "Documents",
    description: "List all document projects",
    params: [],
    schema: z.object({}),
    example: {},
    handler: async () => {
      const { listProjects } = await import("../../../modules/documents/project.service.js");
      return listProjects();
    },
  },
];

export const documentActions: ActionDefinition[] = [
  {
    name: "documents.list",
    category: "Documents",
    description: "List all documents in a project",
    params: [
      { name: "projectId", type: "string", required: true, description: "Project ID" },
    ],
    schema: z.object({ projectId: z.string() }),
    example: { projectId: "prj_xxx" },
    handler: async (p) => {
      const { listDocuments } = await import("../../../modules/documents/document.service.js");
      return listDocuments(p.projectId);
    },
  },
  {
    name: "documents.get",
    category: "Documents",
    description: "Get a document with full content",
    params: [
      { name: "documentId", type: "string", required: true, description: "Document ID" },
      { name: "projectId", type: "string", required: false, description: "Project ID (optional, narrows lookup)" },
    ],
    schema: z.object({ documentId: z.string(), projectId: z.string().optional() }),
    example: { documentId: "doc_xxx" },
    handler: async (p) => {
      const { getDocumentById, getDocumentByIdOnly } = await import("../../../modules/documents/document.service.js");
      const doc = p.projectId
        ? await getDocumentById(p.projectId, p.documentId)
        : await getDocumentByIdOnly(p.documentId);
      if (!doc) throw new Error("Document not found");
      return doc;
    },
  },
  {
    name: "documents.create",
    category: "Documents",
    description: "Create a new document in a project",
    params: [
      { name: "projectId", type: "string", required: true, description: "Project ID" },
      { name: "title", type: "string", required: false, description: "Document title", default: "Untitled" },
      { name: "content", type: "string", required: false, description: "Document content (markdown)", default: "" },
    ],
    schema: z.object({
      projectId: z.string(),
      title: z.string().min(1).max(500).optional().default("Untitled"),
      content: z.string().optional().default(""),
    }),
    example: { projectId: "prj_xxx", title: "Meeting Notes", content: "# Notes\n\n- Item 1" },
    handler: async (p) => {
      const { createDocument } = await import("../../../modules/documents/document.service.js");
      return createDocument(p.projectId, { title: p.title, content: p.content }, "usr_mcp_system");
    },
  },
  {
    name: "documents.update",
    category: "Documents",
    description: "Update a document's title or content",
    params: [
      { name: "projectId", type: "string", required: true, description: "Project ID" },
      { name: "documentId", type: "string", required: true, description: "Document ID" },
      { name: "title", type: "string", required: false, description: "New title" },
      { name: "content", type: "string", required: false, description: "New content" },
    ],
    schema: z.object({ projectId: z.string(), documentId: z.string(), title: z.string().optional(), content: z.string().optional() }),
    example: { projectId: "prj_xxx", documentId: "doc_xxx", title: "Updated Title" },
    handler: async (p) => {
      const { updateDocument } = await import("../../../modules/documents/document.service.js");
      return updateDocument(p.projectId, p.documentId, { title: p.title, content: p.content });
    },
  },
];
