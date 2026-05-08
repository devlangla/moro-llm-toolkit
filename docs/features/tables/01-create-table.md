<feature>
  <meta>
    <id>table_create</id>
    <title>Tạo bảng mới</title>
    <group>Dynamic Table</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    User tạo một bảng (table) mới trong database. Mỗi bảng có tên, mô tả,
    và tập hợp cột tuỳ chỉnh. Bảng mới tạo có sẵn cột "Title" mặc định.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>click "New Table" trên trang Tables</action>
      <benefit>tạo database tuỳ chỉnh để lưu trữ và quản lý dữ liệu có cấu trúc</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] POST /api/databases/:dbId/tables { name, description?, icon? } → tạo table mới
- [x] Table mới tự động có cột "Title" (type: text, primary)
- [x] Tên bảng unique trong database

## Web
- [x] Nút "New Table" trên trang danh sách tables
- [x] Click → dialog: Tên (bắt buộc), Mô tả (optional), Icon (emoji picker)
- [x] Save → bảng mới xuất hiện trong danh sách
- [x] Cancel → đóng dialog, không tạo
