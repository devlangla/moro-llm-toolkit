<feature>
  <meta>
    <id>dynamic_api_runtime</id>
    <title>JS/TS runtime cho API (Bun)</title>
    <group>Dynamic API</group>
    <status>done</status>
    <priority>p0</priority>
  </meta>

  <overview>
       Khi request gọi tới dynamic endpoint (`/apis/*`), hệ thống lấy JS/TS code
    từ DB và thực thi trên Bun runtime. Kiến trúc lấy cảm hứng từ Cloudflare
    Workers: warm instances, bindings pattern, console capture, execution
    limits. Hai chế độ thực thi: - **Fast mode**: Không có external dependencies
    → chạy in-process (AsyncFunction constructor). Cold start ~1-5ms. -
    **Isolated mode**: Có npm dependencies → chạy subprocess riêng (Bun.spawn)
    với node_modules riêng per endpoint. Cold start ~20-50ms.
  </overview>

</feature>

## Server
- [x] (TBD)

## Web
- [x] (TBD)
