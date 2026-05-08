<feature>
  <meta>
    <id>doc_nested</id>
    <title>Nested documents (sub-pages)</title>
    <group>Documents</group>
    <status>done</status>
    <priority>p1</priority>
  </meta>

  <overview>
    Documents hỗ trợ nested structure: mỗi document có thể có sub-pages (children).
    Tạo cây tài liệu nhiều cấp, giống Notion.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>tạo sub-page bên trong document hiện tại</action>
      <benefit>tổ chức tài liệu theo cấu trúc phân cấp</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] Document schema có field `parentId` (nullable) → tham chiếu document cha
- [x] POST /api/projects/:projectId/documents { parentId } → tạo sub-page
- [x] DELETE cascade: xoá parent → xoá tất cả children đệ quy
- [x] GET list trả về flat list với parentId → client build tree

## Web
- [x] Sidebar tree hiển thị nested levels (indent)
- [x] Click "+" trên document → tạo sub-page
- [x] Expand/collapse children trong sidebar
