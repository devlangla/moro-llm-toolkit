<feature>
  <meta>
    <id>storage_s3_api</id>
    <title>S3-compatible API</title>
    <group>Storage</group>
    <status>done</status>
    <priority>p1</priority>
  </meta>

  <overview>
    API tương thích S3 cho phép sử dụng AWS SDK hoặc S3 clients để tương tác
    với Storage. Hỗ trợ các operations cơ bản: ListBuckets, ListObjects,
    GetObject, PutObject, DeleteObject.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>Developer / External Service</actor>
      <action>sử dụng AWS S3 SDK/CLI để tương tác với Storage</action>
      <benefit>tích hợp với hệ thống sẵn có sử dụng S3 protocol</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] S3-compatible endpoints mounted at /s3/
- [x] Hỗ trợ operations: ListBuckets, ListObjects, GetObject, PutObject, DeleteObject
- [x] Auth bằng Access Key ID + Secret Access Key (S3 Signature v4)
- [x] Response format XML giống S3
