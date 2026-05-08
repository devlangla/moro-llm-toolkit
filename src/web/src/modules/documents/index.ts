import { lazy } from "react";
import type { ModuleRoute, ModuleNav } from "src/common/types/router";

const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const DocumentsLayout = lazy(() => import("./pages/DocumentsLayout"));
const DocumentsWelcome = lazy(() => import("./pages/DocumentsListPage"));
const DocumentEditorPage = lazy(() => import("./pages/DocumentEditorPage"));

export const routes: ModuleRoute[] = [
  {
    path: "/documents",
    element: ProjectsPage,
  },
  {
    // Layout route: sidebar persists, child routes swap in <Outlet />
    path: "/documents/project/:projectId",
    element: DocumentsLayout,
    children: [
      {
        // Index — project welcome screen (no doc selected)
        path: "",
        element: DocumentsWelcome,
      },
      {
        // Editor — specific doc selected
        path: "doc/:id",
        element: DocumentEditorPage,
      },
    ],
  },
];

export const nav: ModuleNav = {
  label: "Documents",
  icon: "file-text",
  order: 2,
};
