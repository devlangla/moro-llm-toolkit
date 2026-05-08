<feature>
  <meta>
    <id>project_api</id>
    <title>API CRUD cho projects</title>
    <group>Documents</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    RESTful API đầy đủ cho CRUD operations trên projects.
    API này được sử dụng bởi frontend UI và MCP tools.
    Base: /api/projects
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>Frontend / MCP Tool</actor>
      <action>gọi API để quản lý projects</action>
      <benefit>tương tác với Projects qua HTTP</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] GET /api/projects — list all projects { items, meta: { total } }
- [x] POST /api/projects { name, description? } → create
- [x] GET /api/projects/:id — get project detail
- [x] PATCH /api/projects/:id { name?, description? } → update
- [x] DELETE /api/projects/:id → cascade delete all documents
- [x] Tất cả endpoints yêu cầu auth (JWT hoặc API key)
