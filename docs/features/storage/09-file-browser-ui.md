<feature>
  <meta>
    <id>storage_file_browser</id>
    <title>File browser UI</title>
    <group>Storage</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    Giao diện quản lý files trong bucket: danh sách files, upload, download,
    delete, preview. Hỗ trợ folder navigation.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>browse, upload, download files qua web UI</action>
      <benefit>quản lý files trực quan thay vì dùng API</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] GET /api/storage/buckets/:bucketId/objects → list objects (hỗ trợ prefix filter cho folder)

## Web
- [x] Trang file browser hiển thị danh sách files: name, size, type, modified date
- [x] Breadcrumb navigation cho folders
- [x] Nút Upload, nút New Folder
- [x] Per-file actions: Download, Copy URL, Delete
- [x] Image preview inline (thumbnail)
- [x] Empty state khi bucket trống
