<feature>
  <meta>
    <id>dynamic_api_create</id>
    <title>Tạo API endpoint mới</title>
    <group>Dynamic API</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
       User tạo một API endpoint mới bằng cách định nghĩa: HTTP method, path, mô
    tả, dependencies (npm packages), và JavaScript/TypeScript code xử lý. Code
    được lưu vào DB và sẵn sàng nhận request.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>click "New API" trên trang API Management</action>
      <benefit>tạo custom HTTP endpoint mà không cần sửa source code hoặc redeploy</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] Nút "New API" trên trang API Management.
- [x] Dialog/page tạo API với các trường: Name (bắt buộc), Method (GET/POST/PUT/PATCH/DELETE), Path (bắt buộc, bắt đầu bằng /), Description (optional).
- [x] Dependencies field (optional): nhập npm packages, ví dụ: { "axios": "^1.7.0", "cheerio": "^1.0.0" }. Nếu không có dependencies → chạy Fast mode (in-process). Nếu có → chạy Isolated mode (subprocess).
- [x] Template code: ```javascript export default async function handler(request, context) { /** * request: { method, path, params, query, headers, body } * context: { variables, tables, docs, files, log } */ return { status: 200, body: { message: "Hello World" } }; } ```
- [x] Save → nếu có dependencies → hệ thống chạy `bun install` vào folder riêng của endpoint → API endpoint active ngay, có thể gọi qua /api/dynamic/[path].
- [x] DB schema: id, name, method, path, description, code, dependencies (JSON), isActive, isPublic, timeout, createdBy, createdAt, updatedAt. Execution mode (fast|isolated) được auto-detect từ code imports tại runtime, không lưu vào DB.

## Web
- [x] Path phải unique trong cùng method. Hỗ trợ path params: /users/:id.
- [x] Code editor mở ra với template JavaScript mặc định:
