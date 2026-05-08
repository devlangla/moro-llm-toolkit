<feature>
  <meta>
    <id>table_sort_filter</id>
    <title>Sort & Filter</title>
    <group>Dynamic Table</group>
    <status>done</status>
    <priority>p1</priority>
  </meta>

  <overview>
    User sort và filter dữ liệu bảng theo các cột. Hỗ trợ multi-sort,
    multi-filter với điều kiện logic AND/OR.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>click "Sort" → chọn cột và thứ tự ASC/DESC</action>
      <benefit>sắp xếp dữ liệu theo tiêu chí mong muốn</benefit>
    </story>
    <story id="US-02">
      <actor>User</actor>
      <action>click "Filter" → thêm điều kiện lọc theo cột</action>
      <benefit>chỉ hiển thị các rows phù hợp</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] GET .../rows hỗ trợ query: ?sort=col&order=asc&filter=[...]&filterLogic=and
- [x] Filter operators: is, is not, contains, >, <, is empty, is not empty

## Web
- [x] Nút "Sort" trên toolbar → dropdown chọn cột + ASC/DESC
- [x] Multi-sort: thêm nhiều cấp sort
- [x] Nút "Filter" → form: cột, operator, giá trị
- [x] Multi-filter: AND/OR logic giữa các điều kiện
- [x] Filter/Sort áp dụng real-time khi thay đổi
- [x] Badge hiển thị số lượng sort/filter đang active
