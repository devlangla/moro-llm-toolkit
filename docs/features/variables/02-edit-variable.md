<feature>
  <meta>
    <id>variable_edit</id>
    <title>Chỉnh sửa variable</title>
    <group>Dynamic Variables</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    User chỉnh sửa value, type, TTL của một variable. Key không thể đổi
    (xoá và tạo lại nếu muốn đổi key).
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>click vào variable trong danh sách → chỉnh sửa value</action>
      <benefit>cập nhật giá trị runtime mà không cần xoá tạo lại</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] PATCH /api/variable-namespaces/:namespaceId/variables/:id { value?, type?, ttl? }
- [x] Key hiển thị read-only, không thể sửa
- [x] Reset TTL countdown nếu TTL thay đổi

## Web
- [x] Click variable row → inline edit hoặc dialog chỉnh sửa
- [x] Chỉnh sửa được: Value, Type, TTL
- [x] Key hiển thị read-only
- [x] Value editor thay đổi theo type: text input (string), number input (number), toggle (boolean), JSON editor (json)
- [x] Save → cập nhật ngay trong danh sách
