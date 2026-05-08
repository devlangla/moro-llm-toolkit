<feature>
  <meta>
    <id>variable_create</id>
    <title>Tạo variable</title>
    <group>Dynamic Variables</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    User tạo một variable mới (cặp key-value). Key là unique trong
    namespace, value có thể là string, number, boolean, hoặc JSON object.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>click "Add Variable" trên trang Variables</action>
      <benefit>lưu trữ dữ liệu key-value để agents hoặc APIs sử dụng</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] POST /api/variable-namespaces/:namespaceId/variables { key, value, type?, ttl? } → tạo variable
- [x] Key unique trong namespace — nếu key đã tồn tại → upsert (update value)
- [x] Key chỉ chứa alphanumeric, gạch ngang, gạch dưới, dấu chấm, tối đa 255 ký tự
- [x] Auto-detect type nếu không truyền: "123" → number, "true"/"false" → boolean, "{...}" → json
- [x] TTL = 0 hoặc null → persistent (không hết hạn)

## Web
- [x] Nút "Add Variable" trên trang Variable browser
- [x] Click → dialog: Key (bắt buộc), Value (bắt buộc), Type (auto-detect hoặc chọn), TTL (optional, seconds)
- [x] Save → variable xuất hiện trong danh sách
- [x] Variable được tạo trong namespace đang chọn
