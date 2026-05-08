<feature>
  <meta>
    <id>storage_bucket_management</id>
    <title>Bucket management</title>
    <group>Storage</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    Quản lý buckets — container chứa objects (files). Mỗi bucket có name unique,
    visibility setting (public/private), size limit.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>tạo bucket mới để tổ chức files</action>
      <benefit>phân loại files theo project/mục đích</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] POST /api/storage/buckets { name, isPublic? } → tạo bucket
- [x] GET /api/storage/buckets → list all buckets
- [x] PATCH /api/storage/buckets/:id { name?, isPublic? } → update
- [x] DELETE /api/storage/buckets/:id → xoá bucket + all objects bên trong
- [x] Bucket name unique, alphanumeric + dash

## Web
- [x] Trang Storage hiển thị danh sách buckets
- [x] Nút "New Bucket" → dialog: name, visibility
- [x] Click bucket → navigate vào file browser
- [x] Context menu: Edit, Delete bucket
