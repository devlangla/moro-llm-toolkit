<feature>
  <meta>
    <id>storage_public_url</id>
    <title>Public file URL</title>
    <group>Storage</group>
    <status>done</status>
    <priority>p1</priority>
  </meta>

  <overview>
    Files trong public bucket có thể truy cập qua URL trực tiếp mà không
    cần authentication. URL format: /storage/{bucket}/{key}
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>share link trực tiếp đến file trong public bucket</action>
      <benefit>embed images, share files mà không cần auth</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] GET /storage/:bucketName/:key → serve file trực tiếp (no auth required cho public bucket)
- [x] Private bucket → trả 403 hoặc yêu cầu auth
- [x] Set Content-Type header đúng

## Web
- [x] Copy URL button trên mỗi file trong public bucket
- [x] Preview inline cho images
