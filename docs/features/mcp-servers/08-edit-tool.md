<feature>
  <meta>
    <id>mcp_edit_tool</id>
    <title>Chỉnh sửa tool</title>
    <group>MCP Servers</group>
    <status>planned</status>
    <priority>p0</priority>
  </meta>

  <overview>
       User chỉnh sửa tool đã tạo: cập nhật name, description, input schema,
    hoặc Python code. Thay đổi có hiệu lực ngay — AI agent gọi tool lần sau sẽ
    chạy code mới.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>click vào tool trong danh sách để mở editor</action>
      <benefit>cập nhật logic hoặc mô tả tool mà không cần tạo lại</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [ ] API: PATCH /api/mcp-servers/:serverId/tools/:toolId → { name?, description?, inputSchema?, code? }.

## Web
- [ ] Click tool name → navigate tới trang edit: /mcp-servers/:serverId/tools/:toolId.
- [ ] Trang edit hiển thị tất cả trường giống trang tạo: Name, Description, Input Schema, Code.
- [ ] Code editor giữ nguyên nội dung code hiện tại.
- [ ] Validation cùng rules với tạo mới (name unique, snake_case, etc.).
- [ ] Save → cập nhật tool, toast thành công. Code mới có hiệu lực ngay.
- [ ] Nếu tool không tồn tại → 400 not_found.
- [ ] Không cho edit system tools của built-in server → 403 forbidden.
