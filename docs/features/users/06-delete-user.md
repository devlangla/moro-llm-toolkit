<feature>
  <meta>
    <id>user_delete</id>
    <title>Xoá user</title>
    <group>Users</group>
    <status>done</status>
    <priority>p1</priority>
  </meta>

  <overview>
    Admin xoá tài khoản user khỏi hệ thống. Super admin không thể bị xoá.
    Xoá user sẽ invalidate mọi session/token của user đó.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>Admin</actor>
      <action>xoá tài khoản user không còn cần thiết</action>
      <benefit>quản lý danh sách user gọn gàng, thu hồi quyền truy cập</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] DELETE /api/users/:id → xoá user, invalidate sessions
- [x] Không cho phép xoá superadmin
- [x] Không cho phép tự xoá chính mình

## Web
- [x] Nút Delete trên mỗi user row (trừ superadmin)
- [x] Click Delete → dialog xác nhận "Xoá user [username]?"
- [x] Xác nhận → user biến mất khỏi danh sách
- [x] Huỷ → không thay đổi
- [x] Toast "Đã xoá user [username]" sau khi thành công
