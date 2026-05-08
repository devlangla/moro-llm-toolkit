<feature>
  <meta>
    <id>table_delete</id>
    <title>Xoá bảng</title>
    <group>Dynamic Table</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    User xoá một bảng và toàn bộ dữ liệu (rows) bên trong.
    Hành động không thể hoàn tác.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>xoá bảng không còn sử dụng</action>
      <benefit>dọn dẹp workspace, giải phóng dữ liệu không cần thiết</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] DELETE /api/databases/:dbId/tables/:id → cascade delete all rows

## Web
- [x] Nút Delete trên bảng row hoặc context menu
- [x] Click Delete → dialog xác nhận "Xoá bảng [tên]? Tất cả [N] rows sẽ bị xoá."
- [x] Xác nhận → bảng biến mất khỏi danh sách
- [x] Toast thông báo thành công
