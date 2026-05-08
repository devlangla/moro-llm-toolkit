<feature>
  <meta>
    <id>dynamic_api_edit</id>
    <title>Chỉnh sửa API endpoint</title>
    <group>Dynamic API</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
       User chỉnh sửa thông tin, code, và dependencies của API endpoint. Thay
    đổi code có hiệu lực ngay lập tức — warm instance được invalidate và
    rebuild. Nếu dependencies thay đổi, hệ thống tự chạy `bun install` lại cho
    endpoint đó.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>click vào API endpoint → chỉnh sửa code hoặc metadata</action>
      <benefit>cập nhật logic xử lý API tại runtime</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] Click API row → mở editor page/dialog.
- [x] Save (Ctrl+S) → code cập nhật trong DB, warm instance invalidated, có hiệu lực ngay request tiếp theo.
- [x] Nếu dependencies thay đổi → hệ thống chạy `bun install --cwd data/dynamic-apis/{id}/` → cập nhật node_modules riêng.
- [x] API: PATCH /api/dynamic-apis/:id.

## Web
- [x] Chỉnh sửa được: Name, Method, Path, Description, Code, Dependencies.
- [x] Code editor (Monaco) với JavaScript/TypeScript syntax highlight, autocomplete.
- [x] Dirty check: cảnh báo nếu rời trang khi có thay đổi chưa save.
