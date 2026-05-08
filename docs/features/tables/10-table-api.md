<feature>
  <meta>
    <id>table_api</id>
    <title>API CRUD cho table data</title>
    <group>Dynamic Table</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    RESTful API đầy đủ cho CRUD operations trên databases, tables, columns, và rows.
    API này được sử dụng bởi frontend UI, MCP tools, và Dynamic APIs.
    Base: /api/databases
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>Frontend / MCP Tool / Dynamic API</actor>
      <action>gọi API để đọc/ghi dữ liệu bảng</action>
      <benefit>tương tác với structured data qua HTTP</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] Database CRUD: GET /api/databases (list), POST (create), GET /:dbId, PATCH /:dbId, DELETE /:dbId
- [x] Table CRUD: GET /api/databases/:dbId/tables, POST, GET /:id, PATCH /:id, DELETE /:id
- [x] Column CRUD: POST .../columns, PATCH .../columns/:colId, DELETE .../columns/:colId
- [x] Row CRUD: GET .../rows (list + pagination + sort + filter), POST, PATCH .../rows/:rowId, DELETE .../rows/:rowId
- [x] Query params: sort, order, filter, filterLogic, page, limit
- [x] Tất cả endpoints yêu cầu auth (JWT hoặc API key)
