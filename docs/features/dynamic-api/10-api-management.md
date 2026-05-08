<feature>
  <meta>
    <id>dynamic_api_management</id>
    <title>API management page</title>
    <group>Dynamic API</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
       Trang quản lý tổng quan tất cả dynamic API endpoints. Hiển thị danh sách
    APIs với method, path, status, execution mode, dependencies count, thống kê
    gọi.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>mở trang API Management để quản lý tất cả endpoints</action>
      <benefit>nhìn tổng quan và quản lý mọi dynamic endpoints</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] Toolbar: New API, Delete selected.

## Web
- [x] Trang hiển thị bảng: Name, Method (badge màu), Path, Status (Active/Inactive), Mode (Fast/Isolated), Deps count, Last Called, Created At.
- [x] Search bar: tìm theo name hoặc path.
- [x] Filter: theo method, status, execution mode.
- [x] Click row → navigate tới editor page.
- [x] Method badge color: GET=green, POST=blue, PUT=orange, PATCH=purple, DELETE=red.
- [x] Quick actions trên row: Edit, Toggle, Delete, Copy URL.
- [x] Mode indicator: ⚡ Fast (no deps) | 📦 Isolated (has deps).
