<feature>
  <meta>
    <id>variable_browser</id>
    <title>Variable browser UI</title>
    <group>Dynamic Variables</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    Giao diện quản lý variables theo 2 cấp: trang danh sách namespaces
    và trang chi tiết variables trong mỗi namespace. Hỗ trợ search,
    hiển thị key, value (truncated), type, TTL remaining, timestamps.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>mở trang Variables để browse và quản lý key-value pairs</action>
      <benefit>nhìn tổng quan tất cả variables trong hệ thống</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] GET /api/variable-namespaces — list namespaces (name, description, variable count)
- [x] GET /api/variable-namespaces/:namespaceId/variables — list variables (query: search, sort, order, page, limit)
- [x] Auto-filter expired variables (không trả về variable đã hết TTL)

## Web
- [x] Trang /variables hiển thị danh sách namespaces: Name, Description, Icon, số lượng variables
- [x] Click namespace → /variables/namespace/:namespaceId → bảng variables
- [x] Bảng variables: Key, Value (truncated 100 chars), Type, TTL remaining, Updated At
- [x] Search bar: tìm theo key (debounce 300ms)
- [x] Sort theo: key, type, updated_at
- [x] Click row → expand hiển thị full value (JSON formatted nếu type=json)
- [x] Badge hiển thị TTL remaining (countdown hoặc "No expiry")
- [x] Toolbar: Add Variable, Flush namespace
