<feature>
  <meta>
    <id>mcp_toggle_tool</id>
    <title>Toggle tool active/inactive</title>
    <group>MCP Servers</group>
    <status>planned</status>
    <priority>p1</priority>
  </meta>

  <overview>
       User có thể bật/tắt (enable/disable) một tool mà không cần xoá. Tool
    inactive sẽ không được expose cho AI agents khi chúng list tools qua MCP
    protocol.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>toggle switch trên tool row</action>
      <benefit>tạm ẩn tool mà không mất code/config</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [ ] Toggle → gọi API cập nhật isActive → UI phản ánh ngay (optimistic update).
- [ ] Tool inactive → không xuất hiện trong MCP tools/list response.
- [ ] API: PATCH /api/mcp-servers/:serverId/tools/:toolId → { isActive: boolean }.

## Web
- [ ] Toggle switch trên mỗi tool row trong danh sách tools.
- [ ] Tool inactive vẫn hiển thị trên UI với style mờ (dimmed) + badge "Inactive".
- [ ] System tools (builtin) cũng có thể toggle — cho phép admin disable system tool nếu muốn.
