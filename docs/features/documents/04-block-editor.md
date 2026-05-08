<feature>
  <meta>
    <id>doc_block_editor</id>
    <title>Markdown editor (Monaco)</title>
    <group>Documents</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    Document editor sử dụng Monaco Editor để soạn thảo markdown.
    Hỗ trợ syntax highlighting, preview, và auto-save.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>mở document → viết nội dung bằng markdown</action>
      <benefit>soạn thảo tài liệu với markdown syntax highlighting</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] Document content lưu dạng markdown text trong DB
- [x] PATCH endpoint nhận content là markdown string

## Web
- [x] Monaco Editor với language = markdown
- [x] Syntax highlighting cho markdown
- [x] Auto-save debounce khi nội dung thay đổi
- [x] Responsive: full-width editor area
- [x] Keyboard shortcuts: Ctrl+S (save manual)
