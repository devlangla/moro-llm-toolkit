<feature>
  <meta>
    <id>storage_access_keys</id>
    <title>Access keys management</title>
    <group>Storage</group>
    <status>done</status>
    <priority>p1</priority>
  </meta>

  <overview>
    Quản lý Access Key ID + Secret Access Key cho S3-compatible API.
    Mỗi key pair có quyền truy cập Storage qua S3 protocol.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>Admin</actor>
      <action>tạo access key pair cho service/developer</action>
      <benefit>cấp quyền truy cập S3 API mà không dùng JWT</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] POST /api/storage/access-keys → tạo key pair, trả secret 1 lần duy nhất
- [x] GET /api/storage/access-keys → list all (masked secret)
- [x] DELETE /api/storage/access-keys/:id → revoke key
- [x] S3 auth middleware validate access key + compute signature v4

## Web
- [x] Trang Access Keys trong Storage settings
- [x] Tạo key → hiển thị Access Key ID + Secret (1 lần), copy button
- [x] Danh sách keys: ID, created, last used
- [x] Revoke key → confirm dialog
