<feature>
  <meta>
    <id>doc_edit</id>
    <title>Chỉnh sửa document</title>
    <group>Documents</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    User chỉnh sửa nội dung document bằng editor. Hỗ trợ inline title edit
    và markdown content. Auto-save sau mỗi thay đổi.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>click vào document trong sidebar → mở editor</action>
      <benefit>chỉnh sửa nội dung tài liệu</benefit>
    </story>
  </user-stories>
</feature>

## Server

- [x] PATCH /api/projects/:projectId/documents/:id { title?, content?, icon?, cover? }
- [x] Trả về updated document object

## Web

- ✅ Click document trong sidebar → mở editor ở main area
- ✅ Title inline edit ở đầu trang
- ✅ Content area: markdown editor
- ✅ Auto-save: debounce sau mỗi thay đổi, gọi API PATCH
- ⬜️ Hiển thị trạng thái "Saving..." / "Saved" trên header
