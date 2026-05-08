<feature>
  <meta>
    <id>user_session_management</id>
    <title>Session management</title>
    <group>Users</group>
    <status>done</status>
    <priority>p2</priority>
  </meta>

  <overview>
    Quản lý phiên đăng nhập: JWT token với refresh mechanism, auto-logout
    khi hết hạn, và WebSocket authentication.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>đăng nhập và làm việc liên tục</action>
      <benefit>không bị logout đột ngột nhờ token refresh tự động</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] JWT access token TTL 1h, refresh token TTL 7d
- [x] POST /api/auth/refresh → rotate refresh token
- [x] WebSocket connection gửi token khi handshake, server validate
- [x] Khi admin xoá user hoặc reset password → tất cả token bị revoke

## Web
- [x] Client tự động gọi refresh endpoint khi access token sắp hết hạn
- [x] Hết hạn cả access + refresh → redirect về trang login
