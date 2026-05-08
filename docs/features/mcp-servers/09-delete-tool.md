<feature>
  <meta>
    <id>mcp_delete_tool</id>
    <title>Xoá tool</title>
    <group>MCP Servers</group>
    <status>planned</status>
    <priority>p0</priority>
  </meta>

  <overview>
       User xoá một tool khỏi custom MCP server. Tool bị xoá sẽ không còn
    available cho AI agents. System tools (built-in) không thể xoá.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>click Delete trên một tool</action>
      <benefit>gỡ bỏ tool không còn cần thiết</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [ ] Confirm → xoá tool khỏi DB, cập nhật danh sách.
- [ ] Xoá tool đồng thời xoá sandbox cache (venv) liên quan nếu có.
- [ ] API: DELETE /api/mcp-servers/:serverId/tools/:toolId.

## Web
- [ ] Nút Delete trên mỗi custom tool (icon hoặc dropdown menu).
- [ ] System tools KHÔNG có nút Delete.
- [ ] Click Delete → confirmation dialog.
- [ ] Nếu là system tool → 403 forbidden.
- [ ] Nếu tool không tồn tại → 400 not_found.
