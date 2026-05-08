<feature>
  <meta>
    <id>variable_delete</id>
    <title>Xoá variable</title>
    <group>Dynamic Variables</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    User xoá một hoặc nhiều variables. Hỗ trợ xoá đơn lẻ và flush
    toàn bộ variables trong namespace.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>xoá variable không còn cần</action>
      <benefit>dọn dẹp dữ liệu key-value</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] DELETE /api/variable-namespaces/:namespaceId/variables/:id → xoá single variable
- [x] DELETE /api/variable-namespaces/:namespaceId/variables → flush all variables trong namespace
- [x] Trả 404 nếu variable không tồn tại

## Web
- [x] Nút Delete trên mỗi variable row hoặc context menu
- [x] Click → dialog xác nhận → xoá
- [x] Nút "Flush namespace" → xoá tất cả variables (confirm dialog)
- [x] Toast thông báo sau khi xoá thành công
