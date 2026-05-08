<feature>
  <meta>
    <id>storage_engine</id>
    <title>Local storage engine</title>
    <group>Storage</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    Engine lưu trữ file trên local filesystem. File được tổ chức theo bucket,
    mỗi file có metadata (name, size, content-type). Là foundation cho toàn bộ
    tính năng Storage.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>System</actor>
      <action>lưu trữ và quản lý file trên local disk</action>
      <benefit>không phụ thuộc cloud service, dữ liệu nằm trên server</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] Storage directory configurable qua env `STORAGE_PATH` (default: ./data/storage)
- [x] File lưu theo cấu trúc: {STORAGE_PATH}/{bucketName}/{objectKey}
- [x] Metadata lưu trong DB: id, bucketId, key, size, contentType, createdAt
- [x] Support binary files (image, pdf, zip, etc.)
