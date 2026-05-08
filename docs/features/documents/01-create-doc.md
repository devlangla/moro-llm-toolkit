<feature>
  <meta>
    <id>doc_create</id>
    <title>Tạo document mới</title>
    <group>Documents</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    User tạo document mới bên trong project hiện tại. Document có thể là
    root-level hoặc sub-page của document khác.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>click "New Page" trên sidebar hoặc nút "+" trong doc tree</action>
      <benefit>tạo tài liệu mới nhanh chóng trong project</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] POST /api/projects/:projectId/documents { title?, parentId?, content? } → 201 + doc object
- [x] Title default "Untitled" nếu không truyền
- [x] parentId optional → tạo sub-page, validate parent thuộc cùng project
- [x] Require auth (JWT hoặc API key)

## Web
- [x] Nút "New Page" trên sidebar doc tree (trong project)
- [x] Click → tạo doc "Untitled", mở editor ngay
- [x] Click "+" trên document → tạo sub-page (child)
- [x] Document xuất hiện ngay trong sidebar tree
