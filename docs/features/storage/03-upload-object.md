<feature>
  <meta>
    <id>storage_upload</id>
    <title>Upload object</title>
    <group>Storage</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    Upload file vào bucket. Hỗ trợ single file upload, multi-file,
    folder upload, và drag-drop.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>upload files vào bucket</action>
      <benefit>lưu trữ files trên server</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] POST /api/storage/buckets/:bucketId/objects (multipart/form-data) → upload file
- [x] Lưu file lên disk + metadata vào DB
- [x] Hỗ trợ path/folder structure: key = "folder/subfolder/file.txt"
- [x] Trả về object metadata sau upload

## Web
- [x] Nút "Upload" trên file browser → file picker
- [x] Drag & drop files vào browser area
- [x] Progress bar khi upload
- [x] Toast thông báo upload thành công
