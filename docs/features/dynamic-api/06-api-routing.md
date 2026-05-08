<feature>
  <meta>
    <id>dynamic_api_routing</id>
    <title>API request routing</title>
    <group>Dynamic API</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
       Router catch-all cho prefix /apis/* → match với dynamic API endpoints đã
    đăng ký. Hỗ trợ path params, method matching, và fallback 404. Route table
    cached trong memory, invalidate khi CRUD dynamic-apis.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>External client</actor>
      <action>gọi GET /apis/my-endpoint</action>
      <benefit>request được route tới JS/TS handler tương ứng</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] Mọi request /apis/* được catch bởi dynamic router.
- [x] Router match theo: method + path pattern (exact match hoặc param match).
- [x] Chỉ route tới endpoints có isActive = true.
- [x] Không match → trả 404 { error: "Endpoint not found" }.
- [x] Method không match (path match nhưng method khác) → trả 405 Method Not Allowed.
- [x] Route table cached in memory, invalidate khi CRUD dynamic-apis.
- [x] Tuỳ chọn auth: mỗi API endpoint có thể cấu hình yêu cầu JWT hoặc public.

## Web
- [x] Path params: /users/:id → request.params = { id: "123" }.
