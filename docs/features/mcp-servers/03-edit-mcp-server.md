<feature>
  <meta>
    <id>mcp_edit_server</id>
    <title>Chỉnh sửa MCP server</title>
    <group>MCP Servers</group>
    <status>planned</status>
    <priority>p0</priority>
  </meta>

  <overview>
       User chỉnh sửa thông tin của một custom MCP server (name, description).
    Built-in server không thể chỉnh sửa.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>click Edit trên một custom MCP server</action>
      <benefit>cập nhật tên hoặc mô tả của server</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [ ] API: PATCH /api/mcp-servers/:id → { name?, description? }.

## Web
- [ ] Nút Edit trên mỗi custom MCP server card/row.
- [ ] Built-in server KHÔNG hiển thị nút Edit (trừ description).
- [ ] Dialog chỉnh sửa: Name (editable), Description (editable).
- [ ] Validation: Name unique, cùng rules như tạo mới.
- [ ] Save → danh sách cập nhật, toast thành công.
- [ ] Nếu server không tồn tại → 400 not_found.
- [ ] Nếu là builtin → 403 forbidden (không cho sửa name).
