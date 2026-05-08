<feature>
  <meta>
    <id>table_column_types</id>
    <title>Kiểu dữ liệu cột</title>
    <group>Dynamic Table</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
    Hệ thống hỗ trợ nhiều kiểu dữ liệu (column types) cho các cột trong
    bảng, tương tự Notion properties. Mỗi kiểu có UI input riêng và validation logic.
  </overview>

  <user-stories>
    <story id="US-01">
      <actor>User</actor>
      <action>chọn kiểu dữ liệu khi thêm hoặc đổi type cột</action>
      <benefit>mỗi loại dữ liệu có UI phù hợp (datepicker, dropdown, checkbox...)</benefit>
    </story>
  </user-stories>
</feature>

## Server
- [x] Hỗ trợ column types: Text, Number, Select, Multi-select, Date, Checkbox, URL, Email
- [x] Validate value theo type khi insert/update row
- [x] Đổi column type → dữ liệu cũ chuyển đổi hoặc xoá nếu không tương thích

## Web
- [x] Text: input text thường, hỗ trợ multi-line
- [x] Number: input number, format hiển thị (integer, decimal, currency, percent)
- [x] Select: dropdown single-choice, user tự tạo options với màu sắc
- [x] Multi-select: dropdown multi-choice, tags hiển thị trong cell
- [x] Date: datepicker, tuỳ chọn include time
- [x] Checkbox: toggle boolean
- [x] URL: input text, click → mở tab mới
- [x] Email: input text, validate email format
- [x] Đổi type → confirm dialog nếu dữ liệu không tương thích
