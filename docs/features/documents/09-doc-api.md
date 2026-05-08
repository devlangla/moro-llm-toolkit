<feature>
  <meta>
    <id>doc_api</id>
    <title>API CRUD cho documents</title>
    <group>Documents</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    RESTful API đầy đủ cho CRUD operations trên documents, scoped theo project.
    API này được sử dụng bởi frontend UI và MCP tools.
    Base: /api/projects/:projectId/documents
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>Frontend / MCP Tool</actor>
      <action>gọi API để đọc/ghi documents trong project</action>
      <benefit>tương tác với Documents qua HTTP</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] GET /api/projects/:projectId/documents — list all documents trong project
- [x] POST /api/projects/:projectId/documents { title?, parentId?, content? } → create
- [x] GET /api/projects/:projectId/documents/:id — get document detail
- [x] PATCH /api/projects/:projectId/documents/:id { title?, content?, icon?, cover? } → update
- [x] DELETE /api/projects/:projectId/documents/:id → cascade delete children
- [x] GET /api/projects/:projectId/documents/search?q=keyword → full-text search
- [x] GET /api/documents/resolve/:id → resolve document by ID (không cần projectId)
- [x] Tất cả endpoints yêu cầu auth (JWT hoặc API key)
- [x] Validate projectId tồn tại trước khi thao tác document
