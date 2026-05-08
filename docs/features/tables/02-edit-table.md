<feature>
  <meta>
    <id>table_edit</id>
    <title>Chỉnh sửa bảng (tên, mô tả)</title>
    <group>Dynamic Table</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    User chỉnh sửa metadata của bảng: tên, mô tả, icon.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>click vào tên bảng hoặc icon "Edit" trên header</action>
      <benefit>cập nhật thông tin bảng mà không ảnh hưởng dữ liệu</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] PATCH /api/databases/:dbId/tables/:id { name?, description?, icon? }
- [x] Tên bảng validate unique

## Web
- [x] Click tên bảng trên header → inline edit hoặc dialog
- [x] Chỉnh sửa: tên, mô tả, icon
- [x] Save → cập nhật ngay trên UI
