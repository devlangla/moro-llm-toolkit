<feature>
  <meta>
    <id>storage_delete</id>
    <title>Delete object</title>
    <group>Storage</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    Xoá file khỏi bucket. Xoá cả file trên disk và metadata trong DB.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>xoá file không cần thiết</action>
      <benefit>giải phóng dung lượng storage</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] DELETE /api/storage/buckets/:bucketId/objects/:key → xoá file + metadata
- [x] Trả 404 nếu object không tồn tại

## Web
- [x] Nút Delete trên mỗi file row
- [x] Click → dialog xác nhận
- [x] Xác nhận → file biến mất khỏi danh sách
