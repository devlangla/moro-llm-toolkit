<feature>
  <meta>
    <id>api_keys</id>
    <title>API Keys Management</title>
    <group>User Management</group>
    <status>in_progress</status>
    <priority>p0</priority>
  </meta>

  <overview>
    Quản lý API keys cho phép người dùng tạo/thu hồi keys để truy cập API
    mà không cần login (JWT). Dùng cho AI agents, MCP tools, và bên thứ ba.
    Key format: ltk_xxxx, hash bằng SHA-256 trước khi lưu vào DB.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>Admin/Superadmin</actor>
      <action>tạo API key với tên gợi nhớ và quyền tuỳ chọn</action>
      <benefit>cấp phát key cho agent/service</benefit>
    </story>
    <story id="US-02">
      <actor>Admin/Superadmin</actor>
      <action>xem danh sách API keys, revoke key không dùng</action>
      <benefit>quản lý bảo mật, thu hồi key bị lộ</benefit>
    </story>
    <story id="US-03">
      <actor>AI Agent / External Service</actor>
      <action>gọi API bằng header Authorization: Bearer ltk_xxx hoặc X-API-Key: ltk_xxx</action>
      <benefit>truy cập API mà không cần username/password</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] GET /api/api-keys — list all API keys (masked, không trả key gốc). Chỉ admin+
- [x] POST /api/api-keys { name, permissions?, expiresAt? } — tạo key mới. Trả key gốc 1 lần duy nhất
- [x] DELETE /api/api-keys/:id — revoke (xoá) API key
- [x] Middleware resolveAuth hỗ trợ xác thực bằng API key (Bearer ltk_xxx hoặc X-API-Key)
- [x] API key hash bằng SHA-256, chỉ lưu hash + prefix 8 chars vào DB
- [x] Hỗ trợ expiration — key hết hạn tự động bị từ chối
- [x] Cập nhật last_used_at khi key được dùng

## Web
- [x] Trang quản lý API keys trong settings
- [x] Tạo key → hiển thị key gốc 1 lần, copy button
- [x] Danh sách keys: name, prefix, created, last used, expiry
- [x] Revoke key → confirm dialog → xoá
