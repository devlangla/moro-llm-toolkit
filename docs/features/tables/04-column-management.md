<feature>
  <meta>
    <id>table_column_management</id>
    <title>Quản lý cột (properties)</title>
    <group>Dynamic Table</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    User thêm, sửa, xoá, sắp xếp lại các cột (properties) của bảng.
    Mỗi cột có tên, kiểu dữ liệu, và các tuỳ chọn. Giống Notion property management.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>click "+" trên header bảng để thêm cột mới</action>
      <benefit>mở rộng cấu trúc dữ liệu theo nhu cầu</benefit>
    </story>
    <story id="US-02">
      <actor>User</actor>
      <action>click vào column header → menu chỉnh sửa/xoá/đổi type</action>
      <benefit>tuỳ chỉnh cấu trúc bảng linh hoạt</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] POST /api/databases/:dbId/tables/:id/columns { name, type, options? } → thêm cột
- [x] PATCH /api/databases/:dbId/tables/:id/columns/:colId { name?, type?, options? } → sửa cột
- [x] DELETE /api/databases/:dbId/tables/:id/columns/:colId → xoá cột + dữ liệu tương ứng
- [x] Cột "Title" (primary) không thể xoá

## Web
- [x] Nút "+" trên cột cuối header → menu chọn column type
- [x] Click column header → dropdown: Rename, Edit type, Delete
- [x] Thêm cột → cột mới xuất hiện ngay với tên mặc định
- [x] Rename: inline edit trên header
- [x] Delete cột → confirm dialog
- [x] Drag & drop sắp xếp lại thứ tự cột
