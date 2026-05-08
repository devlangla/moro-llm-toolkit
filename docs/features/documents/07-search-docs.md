<feature>
  <meta>
    <id>doc_search</id>
    <title>Tìm kiếm document</title>
    <group>Documents</group>
    <status>done</status>
    <priority>p1</priority>
  </meta>

  <overview>
    Full-text search document theo title và content trong project.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>nhập keyword vào search bar</action>
      <benefit>tìm nhanh document cần thiết trong project</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] GET /api/projects/:projectId/documents/search?q=keyword → full-text search
- [x] Tìm theo title và content
- [x] Trả về danh sách documents matching

## Web
- [x] Search bar trên sidebar hoặc header
- [x] Debounce 300ms khi gõ
- [x] Hiển thị kết quả matching, click → mở document
