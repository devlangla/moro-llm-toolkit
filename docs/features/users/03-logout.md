<feature>
  <meta>
    <id>user_logout</id>
    <title>Đăng xuất (Logout)</title>
    <group>Users</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    User đăng xuất khỏi hệ thống. Token/session bị xoá, user quay về trang login.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>click nút Logout trên navigation/header</action>
      <benefit>thoát phiên làm việc an toàn, bảo vệ tài khoản</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] Server invalidate session/token (nếu dùng token blacklist)

## Web
- [x] Nút Logout hiển thị trên header/user menu khi đã đăng nhập
- [x] Click Logout → xoá token/cookie khỏi client
- [x] Redirect về trang login sau khi logout
- [x] Sau logout, truy cập route yêu cầu auth → redirect về login
