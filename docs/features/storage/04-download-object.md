<feature>
  <meta>
    <id>storage_download</id>
    <title>Download object</title>
    <group>Storage</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    Download file từ bucket. Trả về binary content với đúng content-type.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>download file từ Storage</action>
      <benefit>lấy file về máy local</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] GET /api/storage/buckets/:bucketId/objects/:key/download → stream file binary
- [x] Set Content-Type, Content-Disposition headers đúng
- [x] Trả 404 nếu object không tồn tại

## Web
- [x] Nút Download trên mỗi file row
- [x] Click → browser download file
- [x] Preview inline cho images (hiển thị thumbnail)
