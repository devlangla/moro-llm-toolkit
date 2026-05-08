<feature>
  <meta>
    <id>dynamic_api_delete</id>
    <title>Xoá API endpoint</title>
    <group>Dynamic API</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
       User xoá API endpoint. Endpoint ngừng hoạt động ngay, mọi request tới
    path đó trả 404. Warm instance được evict, folder node_modules riêng (nếu
    có) được cleanup.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>xoá API endpoint không còn cần</action>
      <benefit>gỡ bỏ endpoint khỏi hệ thống, giải phóng tài nguyên</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] Nút "Delete" trên API row hoặc editor page.
- [x] Click → dialog xác nhận "Xoá API [name]?".
- [x] Xác nhận → xoá khỏi DB, evict warm instance, xoá folder data/dynamic-apis/{id}/ (nếu có), path trả 404 ngay.
- [x] Sau khi xoá thành công, navigate về trang API management.
- [x] API: DELETE /api/dynamic-apis/:id.

## Web
- [x] Huỷ → không thay đổi.
