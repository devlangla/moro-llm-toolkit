<feature>
  <meta>
    <id>mcp_tool_code_editor</id>
    <title>Tool code editor</title>
    <group>MCP Servers</group>
    <status>planned</status>
    <priority>p0</priority>
  </meta>

  <overview>
       Code editor nhúng trong UI cho phép user viết Python code cho tools.
    Editor hỗ trợ syntax highlighting, auto-completion cơ bản, và hiển thị
    context SDK reference.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>viết Python code trong editor trên trang tool</action>
      <benefit>phát triển tool logic trực tiếp trong browser, không cần IDE ngoài</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [ ] (TBD)

## Web
- [ ] Sử dụng code editor library: Monaco Editor hoặc CodeMirror 6.
- [ ] Python syntax highlighting.
- [ ] Line numbers, code folding, bracket matching.
- [ ] Kích thước editor có thể resize (drag border hoặc full-screen toggle).
- [ ] Sidebar/panel hiển thị SDK reference: danh sách context.* functions với mô tả ngắn.
- [ ] Auto-save draft vào localStorage khi user đang edit (tránh mất code khi refresh).
- [ ] Nút "Format Code" (optional) — gọi server format bằng autopep8/black nếu có.
- [ ] Keyboard shortcuts: Ctrl+S / Cmd+S để save.
