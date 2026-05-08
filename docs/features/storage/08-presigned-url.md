<feature>
  <meta>
    <id>storage_presigned_url</id>
    <title>Presigned URL</title>
    <group>Storage</group>
    <status>done</status>
    <priority>p1</priority>
  </meta>

  <overview>
    Tạo URL tạm thời (presigned) cho phép truy cập file private mà không
    cần auth header. URL có thời hạn (TTL).
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User / API</actor>
      <action>tạo presigned URL để share file private</action>
      <benefit>chia sẻ file tạm thời mà không cần cấp quyền vĩnh viễn</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] POST /api/storage/buckets/:bucketId/objects/:key/presign { expiresIn? } → trả signed URL
- [x] URL chứa token + expiry, validate khi truy cập
- [x] Default TTL: 1 giờ, max: 7 ngày

## Web
- [x] Nút "Get Presigned URL" trên file trong private bucket
- [x] Click → copy URL, hiển thị thời hạn
