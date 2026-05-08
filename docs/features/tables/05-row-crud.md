<feature>
  <meta>
    <id>table_row_crud</id>
    <title>Thêm/sửa/xoá rows</title>
    <group>Dynamic Table</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    User thao tác CRUD trên rows (records) của bảng. Sửa inline trực tiếp
    trên cell. Hỗ trợ multi-select, bulk delete, pagination.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>click "New" hoặc nút "+" ở cuối bảng</action>
      <benefit>thêm record mới nhanh chóng</benefit>
    </story>
    <story id="US-02">
      <actor>User</actor>
      <action>click vào cell và nhập dữ liệu trực tiếp</action>
      <benefit>sửa dữ liệu inline không cần mở dialog</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] POST /api/databases/:dbId/tables/:id/rows { data: { columnId: value } } → thêm row
- [x] PATCH /api/databases/:dbId/tables/:id/rows/:rowId { data } → update row
- [x] DELETE /api/databases/:dbId/tables/:id/rows/:rowId → xoá row
- [x] Dữ liệu row lưu dạng JSON flexible: { columnId: value, ... }
- [x] Pagination: mặc định 50 rows per page

## Web
- [x] Nút "New" hoặc row "+" ở cuối bảng → thêm row trống mới
- [x] Click cell → inline edit mode, auto-save khi blur hoặc Enter
- [x] Right-click row → context menu: Delete
- [x] Checkbox column cho multi-select → nút "Delete selected"
- [x] Scroll để load thêm rows (infinite scroll / pagination)
