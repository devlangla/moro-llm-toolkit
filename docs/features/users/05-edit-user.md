<feature>
  <meta>
    <id>user_edit</id>
    <title>Chỉnh sửa user</title>
    <group>Users</group>
    <status>done</status>
    <priority>p1</priority>
  </meta>

  <overview>
    Admin chỉnh sửa thông tin user: username, email, role.
    Super admin không thể bị hạ quyền bởi admin thường.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>Admin</actor>
      <action>click vào user trong danh sách → chỉnh sửa thông tin</action>
      <benefit>cập nhật thông tin hoặc thay đổi quyền của user</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] PATCH /api/users/:id { username?, email?, role? } → cập nhật user
- [x] Username/email validate unique (trừ chính user đó)
- [x] Không cho phép thay đổi role của superadmin

## Web
- [x] Click user row → dialog chỉnh sửa với dữ liệu đã điền sẵn
- [x] Các trường: Username, Email, Role
- [x] Role của superadmin → field disabled
- [x] Save → cập nhật ngay trong danh sách
- [x] Cancel → đóng dialog, không thay đổi
