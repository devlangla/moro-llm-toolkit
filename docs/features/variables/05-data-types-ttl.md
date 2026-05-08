<feature>
  <meta>
    <id>variable_data_types_ttl</id>
    <title>Kiểu dữ liệu & TTL</title>
    <group>Dynamic Variables</group>
    <status>done</status>
    <priority>p1</priority>
  </meta>

  <overview>
    Variables hỗ trợ nhiều kiểu dữ liệu và có thể cấu hình TTL (Time To Live).
    Khi hết TTL, variable tự động bị xoá hoặc đánh dấu expired.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User / Agent</actor>
      <action>tạo variable với TTL để lưu cache tạm thời</action>
      <benefit>dữ liệu tự cleanup sau thời gian nhất định</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] Kiểu dữ liệu: string, number, boolean, json (object/array)
- [x] Value lưu dạng text trong DB, type metadata dùng để parse/validate khi đọc
- [x] TTL: số giây, 0 hoặc null = persistent (không hết hạn)
- [x] expiresAt trong DB = createdAt + TTL seconds, null nếu persistent
- [x] Lazy check: API trả 404 nếu variable đã expired (dù chưa xoá physical)
- [x] Auto-detect type: "123" → number, "true"/"false" → boolean, "{...}" → json

## Web
- [x] TTL hiển thị dạng countdown hoặc "No expiry" trên mỗi variable row
- [x] Type hiển thị badge (string/number/boolean/json)
- [x] Variables expired → ẩn khỏi danh sách (hoặc hiển thị strikethrough)
