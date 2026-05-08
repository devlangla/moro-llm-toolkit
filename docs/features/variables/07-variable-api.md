<feature>
  <meta>
    <id>variable_api</id>
    <title>API CRUD cho variables</title>
    <group>Dynamic Variables</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    RESTful API đầy đủ cho CRUD operations trên variable namespaces và variables.
    API này được sử dụng bởi frontend UI, MCP tools, và Dynamic APIs.
    Base: /api/variable-namespaces, /api/variable-namespaces/:namespaceId/variables
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>Frontend / MCP Tool / Dynamic API</actor>
      <action>gọi API để đọc/ghi variables</action>
      <benefit>tương tác với key-value store qua HTTP</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] Namespace CRUD: GET (list), POST (create), GET /:id, PATCH /:id, DELETE /:id
- [x] GET /api/variable-namespaces/:namespaceId/variables — list (query: search, sort, order, page, limit), auto-filter expired
- [x] GET .../variables/by-key/:key — get by key (404 nếu expired)
- [x] GET .../variables/:id — get by ID
- [x] POST .../variables { key, value, type?, ttl? } — create/upsert
- [x] POST .../variables/bulk { variables: [...] } — batch create/upsert
- [x] PATCH .../variables/:id { value?, type?, ttl? } — update
- [x] DELETE .../variables/:id — delete single
- [x] DELETE .../variables — flush all in namespace
- [x] Tất cả endpoints yêu cầu auth (JWT hoặc API key)
