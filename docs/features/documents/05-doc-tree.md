<feature>
  <meta>
    <id>doc_tree</id>
    <title>Document tree (sidebar)</title>
    <group>Documents</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    Sidebar hiển thị cây thư mục documents của project hiện tại.
    Hỗ trợ expand/collapse, nested levels. Document tree chỉ hiển thị
    khi user đang ở trong context của một project.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>browse qua cây document ở sidebar</action>
      <benefit>nhanh chóng navigate đến document cần thiết</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] GET /api/projects/:projectId/documents trả về flat list với parentId → client build tree

## Web
- [x] Sidebar hiển thị documents dạng tree (indent cho sub-pages), scoped theo project
- [x] Click arrow icon → expand/collapse children
- [x] Click document name → mở document đó trên editor
- [x] Hover row → hiện icon "+" (thêm sub-page), "..." (menu: Delete)
- [x] Document đang mở → highlight trong sidebar
- [x] Header sidebar hiển thị tên project hiện tại
