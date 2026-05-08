<feature>
  <meta>
    <id>user_create</id>
    <title>Thêm user mới</title>
    <group>Users</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    Super admin hoặc admin tạo tài khoản user mới trong hệ thống.
    User mới được gán role và nhận thông tin đăng nhập.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>Admin</actor>
      <action>click "Add User" trên trang User Management</action>
      <benefit>thêm thành viên mới vào hệ thống</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] POST /api/users { username, email, password, name, role } → tạo user mới
- [x] Username và email phải unique, trả lỗi nếu trùng
- [x] Password hash trước khi lưu DB
- [x] Chỉ admin/superadmin mới được gọi endpoint này

## Web
- [x] Nút "Add User" chỉ hiển thị cho admin/superadmin
- [x] Click → dialog: Username (bắt buộc), Email (bắt buộc), Password (bắt buộc, min 8 ký tự), Name (bắt buộc), Role (dropdown: admin/member)
- [x] Save → user mới xuất hiện trong danh sách
- [x] Cancel → đóng dialog, không thay đổi
- [x] Toast thông báo thành công sau khi tạo
