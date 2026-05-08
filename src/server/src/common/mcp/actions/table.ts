import { z } from "zod";
import type { ActionDefinition } from "../registry.js";

export const databaseActions: ActionDefinition[] = [
  {
    name: "databases.list",
    category: "Databases & Tables",
    description: "List all databases",
    params: [],
    schema: z.object({}),
    example: {},
    handler: async () => {
      const { listDatabases } = await import("../../../modules/databases/database.service.js");
      return listDatabases();
    },
  },
];

export const tableActions: ActionDefinition[] = [
  {
    name: "tables.list",
    category: "Databases & Tables",
    description: "List all tables in a database with column definitions",
    params: [
      { name: "databaseId", type: "string", required: true, description: "Database ID" },
    ],
    schema: z.object({ databaseId: z.string() }),
    example: { databaseId: "db_xxx" },
    handler: async (p) => {
      const { listTables } = await import("../../../modules/databases/table.service.js");
      return listTables(p.databaseId);
    },
  },
  {
    name: "tables.query",
    category: "Databases & Tables",
    description: "Query rows with filters, sorting, and pagination",
    params: [
      { name: "tableId", type: "string", required: true, description: "Table ID" },
      { name: "page", type: "number", required: false, description: "Page number", default: 1 },
      { name: "limit", type: "number", required: false, description: "Items per page", default: 50 },
      { name: "sort", type: "string", required: false, description: "Column ID or name to sort by (or 'created_at', 'updated_at')" },
      { name: "order", type: "string", required: false, description: "Sort order: asc or desc", default: "desc" },
      { name: "filter", type: "string", required: false, description: "JSON array of filter conditions" },
      { name: "filterLogic", type: "string", required: false, description: "Filter logic: and or or", default: "and" },
    ],
    schema: z.object({
      tableId: z.string(),
      page: z.number().optional().default(1),
      limit: z.number().optional().default(50),
      sort: z.string().optional(),
      order: z.enum(["asc", "desc"]).optional().default("desc"),
      filter: z.string().optional(),
      filterLogic: z.enum(["and", "or"]).optional().default("and"),
    }),
    example: { tableId: "tbl_xxx", limit: 10 },
    handler: async (p) => {
      const { listRows } = await import("../../../modules/databases/table.service.js");
      return listRows(p.tableId, { page: p.page, limit: p.limit, sort: p.sort, order: p.order, filter: p.filter, filterLogic: p.filterLogic });
    },
  },
  {
    name: "tables.insert",
    category: "Databases & Tables",
    description: "Insert a new row into a table",
    params: [
      { name: "tableId", type: "string", required: true, description: "Table ID" },
      { name: "data", type: "object", required: true, description: "Row data: { columnId: value, ... }" },
    ],
    schema: z.object({ tableId: z.string(), data: z.record(z.unknown()) }),
    example: { tableId: "tbl_xxx", data: { col_name: "John", col_age: 30 } },
    handler: async (p) => {
      const { createRow } = await import("../../../modules/databases/table.service.js");
      return createRow(p.tableId, { data: p.data }, "usr_mcp_system");
    },
  },
  {
    name: "tables.update",
    category: "Databases & Tables",
    description: "Update an existing row",
    params: [
      { name: "tableId", type: "string", required: true, description: "Table ID" },
      { name: "rowId", type: "string", required: true, description: "Row ID" },
      { name: "data", type: "object", required: true, description: "Partial data: { columnId: newValue }" },
    ],
    schema: z.object({ tableId: z.string(), rowId: z.string(), data: z.record(z.unknown()) }),
    example: { tableId: "tbl_xxx", rowId: "row_xxx", data: { col_name: "Jane" } },
    handler: async (p) => {
      const { updateRow } = await import("../../../modules/databases/table.service.js");
      return updateRow(p.tableId, p.rowId, { data: p.data });
    },
  },
  {
    name: "tables.delete",
    category: "Databases & Tables",
    description: "Delete a row from a table",
    params: [
      { name: "tableId", type: "string", required: true, description: "Table ID" },
      { name: "rowId", type: "string", required: true, description: "Row ID to delete" },
    ],
    schema: z.object({ tableId: z.string(), rowId: z.string() }),
    example: { tableId: "tbl_xxx", rowId: "row_xxx" },
    handler: async (p) => {
      const { deleteRow } = await import("../../../modules/databases/table.service.js");
      await deleteRow(p.tableId, p.rowId);
      return { deleted: true, rowId: p.rowId };
    },
  },
];
