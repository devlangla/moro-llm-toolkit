<feature>
  <meta>
    <id>mcp_create_server</id>
    <title>Tạo custom MCP server</title>
    <group>MCP Servers</group>
    <status>planned</status>
    <priority>p0</priority>
  </meta>

  <overview>
       User tạo một MCP server mới (loại "custom"). Server này sẽ chứa các Tools
    do user tự định nghĩa. Mỗi custom server có endpoint riêng biệt để AI agents
    kết nối.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>click "New MCP Server" trên trang MCP Management</action>
      <benefit>tạo một MCP server mới để nhóm các tools theo domain/mục đích</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [ ] API: POST /api/mcp-servers → { name, description? }.
- [ ] Response: MCP server object với id, name, description, type, isActive, endpoint URL, createdAt.

## Web
- [ ] Nút "New MCP Server" trên trang MCP Management.
- [ ] Dialog tạo MCP server với các trường: Name (bắt buộc, unique), Description (optional).
- [ ] Name chỉ chứa alphanumeric, dấu gạch ngang, gạch dưới. Tối đa 100 ký tự.
- [ ] Save → MCP server xuất hiện trong danh sách với badge "Custom".
- [ ] Server mới tạo mặc định isActive = true, type = "custom", chưa có tool nào.
