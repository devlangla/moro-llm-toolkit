<feature>
  <meta>
    <id>dynamic_api_logs</id>
    <title>API logs & monitoring</title>
    <group>Dynamic API</group>
    <status>done</status>
    <priority>p2</priority>
  </meta>

  <overview>
       Ghi log mọi request tới dynamic endpoints: timestamp, method, path,
    status code, execution time, execution mode (fast/isolated), captured
    console output, error (nếu có). Hiển thị trong UI để debug và monitor.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>xem logs của API endpoint để debug</action>
      <benefit>phát hiện và sửa lỗi nhanh chóng</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] Tab "Logs" trong API editor page hiển thị request logs.
- [x] Retention: giữ logs 7 ngày (configurable), tự động cleanup.

## Web
- [x] Mỗi log entry: timestamp, method, path, status code, execution time (ms), execution mode (fast/isolated), IP.
- [x] Click log entry → expand: request headers/body, response body, captured console output, error stacktrace (nếu có).
- [x] Filter: theo status (success/error), date range (startDate/endDate epoch ms).
- [x] Auto-refresh hoặc real-time (WebSocket).
