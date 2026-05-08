import { lazy } from "react";
import type { ModuleRoute, ModuleNav } from "src/common/types/router";

const DynamicApisListPage = lazy(() => import("./pages/DynamicApisListPage"));
const DynamicApiDetailPage = lazy(() => import("./pages/DynamicApiDetailPage"));

export const routes: ModuleRoute[] = [
  {
    path: "/dynamic-apis",
    element: DynamicApisListPage,
  },
  {
    path: "/dynamic-apis/:id",
    element: DynamicApiDetailPage,
  },
];

export const nav: ModuleNav = {
  label: "Dynamic APIs",
  icon: "zap",
  order: 7,
};
