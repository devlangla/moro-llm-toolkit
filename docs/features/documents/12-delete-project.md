<feature>
  <meta>
    <id>project_delete</id>
    <title>Xoá project</title>
    <group>Documents</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    User xoá project. Tất cả documents bên trong project sẽ bị xoá theo
    (cascade delete). Hành động không thể hoàn tác.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>xoá project không còn cần thiết</action>
      <benefit>dọn dẹp workspace, giải phóng tài nguyên</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] DELETE /api/projects/:id → cascade delete tất cả documents bên trong

## Web
- [x] Context menu project → "Delete"
- [x] Dialog xác nhận, hiển thị số documents sẽ bị xoá
- [x] Xác nhận → project biến mất khỏi sidebar
- [x] Nếu đang ở trong project bị xoá → navigate về project list
