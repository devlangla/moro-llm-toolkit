<feature>
  <meta>
    <id>mcp_connection_endpoint</id>
    <title>MCP server connection endpoint</title>
    <group>MCP Servers</group>
    <status>planned</status>
    <priority>p0</priority>
  </meta>

  <overview>
       Mỗi MCP server (builtin + custom) có một HTTP endpoint hỗ trợ MCP
    protocol. AI agents kết nối tới endpoint này qua SSE (Server-Sent Events)
    transport để discover và gọi tools. Endpoint yêu cầu authentication (API key
    hoặc JWT).
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>AI Agent</actor>
      <action>kết nối tới MCP endpoint URL</action>
      <benefit>discover available tools và gọi chúng theo MCP protocol chuẩn</benefit>
    </story>
    <story id="US-02">
      <actor>User</actor>
      <action>copy MCP endpoint URL từ UI</action>
      <benefit>cấu hình AI agent để kết nối tới server</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [ ] Endpoint URL format: /api/mcp/:serverId/sse (SSE transport).
- [ ] Authentication: Bearer token (JWT) hoặc API key qua header x-api-key.
- [ ] Khi AI agent kết nối → trả về danh sách tools available trong server đó.
- [ ] Nếu server isActive = false → reject connection, trả lỗi.
- [ ] UI hiển thị endpoint URL dạng copyable input trên server detail page.

## Web
- [ ] Hỗ trợ MCP protocol qua SSE transport (Server-Sent Events).
- [ ] Khi AI agent gọi tool → execute tool và stream kết quả.
- [ ] Hỗ trợ Streamable HTTP transport (mới hơn SSE, theo MCP spec mới).
