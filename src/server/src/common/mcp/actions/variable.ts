import { z } from "zod";
import type { ActionDefinition } from "../registry.js";

export const variableActions: ActionDefinition[] = [
  {
    name: "variables.list",
    category: "Variables",
    description: "List all variables in a namespace",
    params: [
      { name: "namespaceId", type: "string", required: true, description: "Variable namespace ID" },
      { name: "search", type: "string", required: false, description: "Filter by key name" },
      { name: "page", type: "number", required: false, description: "Page number", default: 1 },
      { name: "limit", type: "number", required: false, description: "Items per page", default: 50 },
    ],
    schema: z.object({
      namespaceId: z.string(),
      search: z.string().optional(),
      page: z.number().optional().default(1),
      limit: z.number().optional().default(50),
    }),
    example: { namespaceId: "ns_xxx" },
    handler: async (p) => {
      const { listVariables } = await import("../../../modules/variables/variable/variable.service.js");
      return listVariables(p.namespaceId, { search: p.search, page: p.page, limit: p.limit });
    },
  },
  {
    name: "variables.get",
    category: "Variables",
    description: "Get a single variable by key",
    params: [
      { name: "namespaceId", type: "string", required: true, description: "Variable namespace ID" },
      { name: "key", type: "string", required: true, description: "Variable key" },
    ],
    schema: z.object({ namespaceId: z.string(), key: z.string() }),
    example: { namespaceId: "ns_xxx", key: "API_KEY" },
    handler: async (p) => {
      const { getVariableByKey } = await import("../../../modules/variables/variable/variable.service.js");
      const v = await getVariableByKey(p.namespaceId, p.key);
      if (!v) throw new Error(`Variable "${p.key}" not found`);
      return v;
    },
  },
  {
    name: "variables.set",
    category: "Variables",
    description: "Create or update (upsert) a variable",
    params: [
      { name: "namespaceId", type: "string", required: true, description: "Variable namespace ID" },
      { name: "key", type: "string", required: true, description: "Variable key" },
      { name: "value", type: "string", required: true, description: "Value (string, number, boolean, or JSON)" },
      { name: "type", type: "string", required: false, description: "Type: string, number, boolean, json (auto-detected if omitted)" },
      { name: "ttl", type: "number", required: false, description: "TTL in seconds (0 = no expiry)" },
    ],
    schema: z.object({
      namespaceId: z.string(),
      key: z.string(),
      value: z.string(),
      type: z.enum(["string", "number", "boolean", "json"]).optional(),
      ttl: z.number().optional(),
    }),
    example: { namespaceId: "ns_xxx", key: "API_KEY", value: "sk-abc123" },
    handler: async (p) => {
      const { getVariableByKey, createVariable, updateVariable } = await import(
        "../../../modules/variables/variable/variable.service.js"
      );
      const existing = await getVariableByKey(p.namespaceId, p.key);
      if (existing) {
        const updated = await updateVariable(existing.id, { value: p.value, type: p.type, ttl: p.ttl });
        return { action: "updated", variable: updated };
      }
      const created = await createVariable(p.namespaceId, { key: p.key, value: p.value, type: p.type, ttl: p.ttl });
      return { action: "created", variable: created };
    },
  },
  {
    name: "variables.delete",
    category: "Variables",
    description: "Delete a variable by key",
    params: [
      { name: "namespaceId", type: "string", required: true, description: "Variable namespace ID" },
      { name: "key", type: "string", required: true, description: "Variable key to delete" },
    ],
    schema: z.object({ namespaceId: z.string(), key: z.string() }),
    example: { namespaceId: "ns_xxx", key: "OLD_KEY" },
    handler: async (p) => {
      const { getVariableByKey, deleteVariable } = await import("../../../modules/variables/variable/variable.service.js");
      const v = await getVariableByKey(p.namespaceId, p.key);
      if (!v) throw new Error(`Variable "${p.key}" not found`);
      await deleteVariable(v.id);
      return { deleted: true, key: p.key };
    },
  },
];

export const variableNamespaceActions: ActionDefinition[] = [
  {
    name: "variable_namespaces.list",
    category: "Variable Namespaces",
    description: "List all variable namespaces",
    params: [],
    schema: z.object({}),
    example: {},
    handler: async () => {
      const { listVariableNamespaces } = await import("../../../modules/variables/variable-namespace/variable-namespace.service.js");
      return listVariableNamespaces();
    },
  },
  {
    name: "variable_namespaces.create",
    category: "Variable Namespaces",
    description: "Create a new namespace",
    params: [
      { name: "name", type: "string", required: true, description: "Namespace name" },
      { name: "description", type: "string", required: false, description: "Optional description" },
      { name: "icon", type: "string", required: false, description: "Optional icon emoji" },
    ],
    schema: z.object({ name: z.string().min(1).max(255), description: z.string().max(1000).optional(), icon: z.string().max(64).optional() }),
    example: { name: "Production Config" },
    handler: async (p) => {
      const { createVariableNamespace } = await import("../../../modules/variables/variable-namespace/variable-namespace.service.js");
      return createVariableNamespace({ name: p.name, description: p.description, icon: p.icon }, "usr_mcp_system");
    },
  },
  {
    name: "variable_namespaces.update",
    category: "Variable Namespaces",
    description: "Update a namespace",
    params: [
      { name: "namespaceId", type: "string", required: true, description: "Namespace ID" },
      { name: "name", type: "string", required: false, description: "New name" },
      { name: "description", type: "string", required: false, description: "New description" },
      { name: "icon", type: "string", required: false, description: "New icon" },
    ],
    schema: z.object({ namespaceId: z.string(), name: z.string().min(1).max(255).optional(), description: z.string().max(1000).optional().nullable(), icon: z.string().max(64).optional().nullable() }),
    example: { namespaceId: "ns_xxx", name: "Staging Config" },
    handler: async (p) => {
      const { getVariableNamespaceById, updateVariableNamespace } = await import("../../../modules/variables/variable-namespace/variable-namespace.service.js");
      const ns = await getVariableNamespaceById(p.namespaceId);
      if (!ns) throw new Error(`Namespace "${p.namespaceId}" not found`);
      return updateVariableNamespace(p.namespaceId, { name: p.name, description: p.description, icon: p.icon });
    },
  },
  {
    name: "variable_namespaces.delete",
    category: "Variable Namespaces",
    description: "Delete a namespace and all its variables",
    params: [
      { name: "namespaceId", type: "string", required: true, description: "Namespace ID to delete" },
    ],
    schema: z.object({ namespaceId: z.string() }),
    example: { namespaceId: "ns_xxx" },
    handler: async (p) => {
      const { getVariableNamespaceById, deleteVariableNamespace } = await import("../../../modules/variables/variable-namespace/variable-namespace.service.js");
      const ns = await getVariableNamespaceById(p.namespaceId);
      if (!ns) throw new Error(`Namespace "${p.namespaceId}" not found`);
      await deleteVariableNamespace(p.namespaceId);
      return { deleted: true, namespaceId: p.namespaceId };
    },
  },
];
