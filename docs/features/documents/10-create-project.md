<feature>
  <meta>
    <id>project_create</id>
    <title>Tạo project mới</title>
    <group>Documents</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    User tạo project mới. Project là container cho Documents. Mỗi project
    có name (required) và description (optional).
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>click "New Project" trên sidebar hoặc trang project list</action>
      <benefit>tạo workspace mới để tổ chức documents</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] POST /api/projects { name, description? } → 201 + project object

## Web
- [x] Nút "New Project" trên sidebar (phần Projects) và trang project list
- [x] Click → dialog: name (required), description (optional)
- [x] Submit → project xuất hiện trong sidebar và project list
- [x] Sau tạo → navigate vào project (trang trống "No documents yet")
