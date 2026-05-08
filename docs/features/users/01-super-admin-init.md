<feature>
  <meta>
    <id>user_super_admin_init</id>
    <title>Super admin init (migration)</title>
    <group>Users</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    Khi cài đặt ứng dụng lần đầu, hệ thống tự động tạo tài khoản super admin
    thông qua database migration. Thông tin đăng nhập mặc định được in ra console.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>System</actor>
      <action>chạy migration lần đầu khi cài đặt app</action>
      <benefit>tạo super admin account sẵn sàng để quản trị</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] Migration tạo bảng `users`: id, username, email, password_hash, role, created_at, updated_at
- [x] Seed record super admin: username `admin`, password ngẫu nhiên (hoặc từ env `ADMIN_PASSWORD`)
- [x] Password hash bằng bcrypt/argon2 trước khi lưu DB
- [x] Console in ra username + password mặc định sau migration thành công
- [x] Nếu super admin đã tồn tại → không tạo trùng
- [x] Role `superadmin` không thể bị xoá hoặc hạ quyền
