<feature>
  <meta>
    <id>table_views</id>
    <title>Table views (Table/Board/List)</title>
    <group>Dynamic Table</group>
    <status>planned</status>
    <priority>p2</priority>
  </meta>

  <overview>
    Mỗi bảng có thể hiển thị dưới nhiều dạng view: Table (spreadsheet),
    Board (kanban), List. Mỗi view lưu riêng sort/filter/column visibility.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>chuyển đổi giữa các view (Table / Board / List)</action>
      <benefit>xem cùng dữ liệu dưới các góc nhìn khác nhau</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [ ] API lưu trữ view config (sort, filter, column visibility, column order) per view
- [ ] CRUD endpoints cho views: POST, GET, PATCH, DELETE

## Web
- [ ] Tab bar view trên header bảng: click để chuyển view
- [ ] Table view: dạng spreadsheet (mặc định)
- [ ] Board view: kanban theo cột Select, drag-drop card giữa columns
- [ ] List view: danh sách compact, title + vài cột chính
- [ ] Thêm view mới: nút "+" → chọn loại view
