<feature>
  <meta>
    <id>dynamic_api_code_editor</id>
    <title>Code editor cho API</title>
    <group>Dynamic API</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
       Monaco editor cho phép viết JavaScript code xử lý API. Hỗ trợ syntax
    highlight, custom auto-complete cho request/context (chỉ hiển thị properties
    của SDK, không hiện gợi ý rác), hover type info, error markers, và example
    snippets.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>viết JS/TS code trong editor với code completion</action>
      <benefit>trải nghiệm coding tốt, giảm lỗi</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] Custom auto-complete: `request.` → method, path, params, query, headers, body. `context.` → log(). Chỉ hiển thị SDK properties, tắt word-based + TS built-in suggestions. Hover hiện type info (HandlerRequest, HandlerContext, HandlerResponse).

## Web
- [x] Monaco editor với JavaScript/TypeScript language mode.
- [x] Syntax highlighting cho JS/TS.
- [x] Ctrl+S / Cmd+S → save code.
- [x] Line numbers, word wrap toggle.
- [x] Error markers hiển thị nếu JS/TS syntax error (lint trước khi save).
- [x] Sidebar reference panel: danh sách available methods của context SDK (bindings).
- [x] Dependencies editor: textarea hoặc JSON editor để nhập npm packages + versions.
