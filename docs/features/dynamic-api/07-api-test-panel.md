<feature>
  <meta>
    <id>dynamic_api_test_panel</id>
    <title>API test panel</title>
    <group>Dynamic API</group>
    <status>done</status>
    <priority>p1</priority>
  </meta>

  <overview>
       Panel test tích hợp trong editor, cho phép gửi request test tới dynamic
    endpoint và xem response. Giống mini Postman. Hiển thị cả captured console
    logs từ handler execution.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>nhấn "Test" trên editor → gửi request test</action>
      <benefit>test API ngay trong app mà không cần Postman/curl</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] Nút "Send" → gọi request tới endpoint.
- [x] Console output: hiển thị captured console.log/error/warn từ handler.

## Web
- [x] Panel test bên phải hoặc bên dưới code editor.
- [x] Form inputs: Method (auto-fill), URL (auto-fill), Headers (editable), Query params, Body (JSON editor).
- [x] Response hiển thị: Status code (colored), Headers, Body (JSON formatted), Execution time.
- [x] History: lưu lại 10 requests gần nhất.
- [x] Copy cURL command.
