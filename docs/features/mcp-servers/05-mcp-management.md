<feature>
  <meta>
    <id>mcp_management_page</id>
    <title>MCP server management page</title>
    <group>MCP Servers</group>
    <status>planned</status>
    <priority>p0</priority>
  </meta>

  <overview>
       Trang quản lý tập trung cho tất cả MCP servers. Hiển thị danh sách
    servers (builtin + custom), số lượng tools trong mỗi server, trạng thái
    active/inactive, và actions CRUD.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>navigate tới trang MCP Servers từ sidebar</action>
      <benefit>xem toàn bộ MCP servers và quản lý tools</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [ ] Route: /mcp-servers. Sidebar menu item "MCP Servers" với icon phù hợp.
- [ ] Danh sách hiển thị dạng cards hoặc list: - Server name - Badge: "System" (builtin) hoặc "Custom" - Description - Số lượng tools - Status: Active / Inactive - MCP endpoint URL (copyable) - Actions: Edit, Delete (chỉ custom), Toggle active
- [ ] API: GET /api/mcp-servers → { items: McpServer[], meta: { total } }.

## Web
- [ ] Built-in server luôn hiển thị đầu tiên, pinned on top.
- [ ] Nút "New MCP Server" ở góc trên phải.
- [ ] Click vào server → navigate tới trang detail: /mcp-servers/:id (hiển thị danh sách tools của server đó).
- [ ] Empty state khi chưa có custom server: hướng dẫn tạo server đầu tiên.
