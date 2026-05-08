<feature>
  <meta>
    <id>variable_namespaces</id>
    <title>Namespaces</title>
    <group>Dynamic Variables</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    Variables được tổ chức thành namespaces. Mỗi namespace là một nhóm logic
    chứa tập hợp các variables riêng biệt. Namespace "default" tự động tồn tại
    và không thể xoá.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>tạo namespace để phân tách variables theo dự án/module</action>
      <benefit>tổ chức dữ liệu rõ ràng, tránh xung đột key giữa các context</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] GET /api/variable-namespaces — list tất cả namespaces
- [x] POST /api/variable-namespaces { name, description?, icon? } — tạo namespace mới
- [x] PATCH /api/variable-namespaces/:id { name?, description?, icon? } — cập nhật
- [x] DELETE /api/variable-namespaces/:id — xoá namespace + cascade xoá variables bên trong
- [x] Namespace "default" auto-created, không thể xoá
- [x] Name unique, alphanumeric + dash + underscore

## Web
- [x] Trang /variables hiển thị danh sách namespaces
- [x] Nút "Add Namespace" → dialog: name, description, icon
- [x] Click namespace → navigate vào trang variables chi tiết
- [x] Menu namespace: Rename, Delete (trừ "default")
- [x] Xoá namespace → confirm dialog, cascade xoá all variables
