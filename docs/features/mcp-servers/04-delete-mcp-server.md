<feature>
  <meta>
    <id>mcp_delete_server</id>
    <title>Xoá MCP server</title>
    <group>MCP Servers</group>
    <status>planned</status>
    <priority>p0</priority>
  </meta>

  <overview>
       User xoá một custom MCP server. Tất cả tools thuộc server đó cũng bị xoá
    theo (cascade). Built-in server không thể xoá.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>click Delete trên một custom MCP server</action>
      <benefit>gỡ bỏ server và tất cả tools không còn cần thiết</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [ ] API: DELETE /api/mcp-servers/:id.

## Web
- [ ] Nút Delete trên mỗi custom MCP server card/row.
- [ ] Built-in server KHÔNG hiển thị nút Delete.
- [ ] Click Delete → confirmation dialog: "Xoá server [name] sẽ xoá tất cả [N] tools thuộc server này. Hành động này không thể hoàn tác."
- [ ] Confirm → xoá server + cascade xoá tất cả tools thuộc server.
- [ ] Xoá xong → redirect về trang MCP Management, toast thành công.
- [ ] Nếu là builtin → 403 forbidden.
- [ ] Nếu server không tồn tại → 400 not_found.
