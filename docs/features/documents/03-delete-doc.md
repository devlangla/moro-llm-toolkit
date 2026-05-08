<feature>
  <meta>
    <id>doc_delete</id>
    <title>Xoá document</title>
    <group>Documents</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    User xoá document. Nếu document có sub-pages, tất cả sub-pages
    cũng bị xoá theo (cascade). Hành động không thể hoàn tác.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>xoá document không còn cần thiết</action>
      <benefit>dọn dẹp project</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] DELETE /api/projects/:projectId/documents/:id → cascade delete children

## Web
- [x] Menu document trong sidebar → "Delete" option
- [x] Click Delete → dialog xác nhận
- [x] Xác nhận → document + sub-pages biến mất khỏi sidebar tree
- [x] Nếu document đang mở → chuyển về trang trống hoặc doc khác
