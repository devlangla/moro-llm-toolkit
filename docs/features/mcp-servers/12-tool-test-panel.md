<feature>
  <meta>
    <id>mcp_tool_test_panel</id>
    <title>Tool test panel</title>
    <group>MCP Servers</group>
    <status>planned</status>
    <priority>p1</priority>
  </meta>

  <overview>
       Panel test nhúng trong trang tool editor. User nhập input params dạng
    JSON, click "Run" → execute tool trong sandbox và hiển thị kết quả ngay trên
    UI. Hỗ trợ debug tool mà không cần AI agent thật.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>nhập test params và click Run trên tool editor page</action>
      <benefit>kiểm tra tool hoạt động đúng trước khi AI agent sử dụng</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [ ] Nút "Run" → gọi API execute tool → hiển thị kết quả.
- [ ] API: POST /api/mcp-servers/:serverId/tools/:toolId/test → { params: object }.
- [ ] Test API chạy code trong sandbox tương tự như khi AI agent gọi, nhưng có thêm detailed logging.

## Web
- [ ] Panel test nằm bên phải hoặc bên dưới code editor (toggle visible).
- [ ] Input: JSON editor cho params (pre-populated từ inputSchema nếu có).
- [ ] Hiển thị: Result (JSON), stdout logs, stderr, execution time.
- [ ] Nếu lỗi → hiển thị error message + stacktrace với highlight dòng lỗi.
- [ ] History: giữ lại 10 lần test gần nhất (trong localStorage).
