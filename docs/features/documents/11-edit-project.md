<feature>
  <meta>
    <id>project_edit</id>
    <title>Chỉnh sửa project</title>
    <group>Documents</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    User chỉnh sửa thông tin project: đổi name, description.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>mở settings/menu của project → chỉnh sửa thông tin</action>
      <benefit>cập nhật tên, mô tả project cho chính xác</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] PATCH /api/projects/:id { name?, description? }

## Web
- [x] Context menu project → "Edit" / "Settings"
- [x] Dialog: name, description → edit inline
- [x] Save → cập nhật ngay trên sidebar và project header
