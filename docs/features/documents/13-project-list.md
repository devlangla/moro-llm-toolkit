<feature>
  <meta>
    <id>project_list</id>
    <title>Danh sách projects</title>
    <group>Documents</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    Trang hiển thị danh sách tất cả projects. User click vào project để
    vào workspace documents của project đó.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>xem danh sách projects → chọn project để làm việc</action>
      <benefit>navigate nhanh đến project cần thiết</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] GET /api/projects → list all projects { items, meta: { total } }

## Web
- [x] Trang /projects hiển thị danh sách projects dạng card grid
- [x] Card: name, description (truncated), số documents, updated time
- [x] Click card → navigate vào project, sidebar hiển thị document tree
- [x] Nút "New Project" ở đầu trang
- [x] Sidebar section "Projects" liệt kê tên projects → click để switch
- [x] Empty state khi chưa có project: "Create your first project" CTA
