# Kế hoạch chuyển từ demo sang WordPress

## Phạm vi bản demo

GitHub Pages chỉ phục vụ HTML/CSS/JavaScript tĩnh và không chạy PHP hay cơ sở dữ liệu WordPress. Bản này dùng để duyệt giao diện và luồng khách hàng; chưa có kết nối lead thật. Sau khi duyệt, giao diện cần được chuyển thành theme WordPress, và phần nghiệp vụ được triển khai trong plugin riêng.

## Cấu trúc dữ liệu

- CPT `habaki_property`: mã duy nhất, tiêu đề, nội dung, thư viện ảnh/video, giao dịch thuê/chuyển nhượng, diện tích, đơn giá, đơn vị tiền, vị trí, thông số kỹ thuật, tình trạng sẵn sàng, thông tin pháp lý đã kiểm tra.
- Taxonomy: loại hình (xưởng/kho/đất), KCN/khu kinh tế, trong/ngoài KCN, khu vực. Tên/địa giới hành chính cần kiểm tra theo hồ sơ hiện hành trước khi nhập dữ liệu thật.
- Metabox hoặc trường tùy chỉnh cho thông số, tọa độ đã xác thực, chủ tài sản và người phụ trách. Dữ liệu liên hệ nội bộ không xuất ra REST công khai.
- Trang lưu trữ và trang chi tiết có URL chuẩn, nội dung riêng, canonical, sitemap và liên kết theo khu vực. Bỏ noindex chỉ khi dữ liệu thật đã kiểm tra.

## Luồng lead thật

1. Khách nhập họ tên, SĐT Zalo và nhu cầu/mã xưởng trong một form. Điền sẵn mã và nhu cầu khi đi từ bảng hàng.
2. Máy chủ kiểm tra Turnstile token/reCAPTCHA, giới hạn tốc độ, honeypot, độ dài, định dạng, quyền đồng ý và chống gửi trùng. Không tin tưởng kiểm tra ở trình duyệt.
3. Ghi lead và UUID vào bảng riêng WordPress **trước** khi gọi dịch vụ bên ngoài; phản hồi trạng thái tiếp nhận rõ ràng.
4. Hàng đợi gửi hai tác vụ riêng tới SO9 Inbox và webhook Google Sheets CRM. Lưu trạng thái từng đích, số lần thử, thời gian, mã phản hồi và lỗi đã loại bỏ thông tin nhạy cảm.
5. Retry có backoff và tính idempotent theo UUID. WP-Cron cần được kích hoạt bằng cron máy chủ; có màn hình kiểm tra lỗi và gửi lại có phân quyền. Một đích thành công không bị gửi trùng khi đích còn lại thất bại.
6. Khóa, URL webhook và thông tin xác thực chỉ nằm trên máy chủ. Endpoint đích phải được giới hạn để tránh SSRF; webhook Sheets phải được xác thực, không công khai khóa trong JavaScript.

Không giả định endpoint hay payload SO9. Cần tài liệu API/webhook chính thức và tài khoản có quyền tích hợp để xác nhận cơ chế tạo hội thoại Inbox, người nhận, trường mã xưởng, xác thực, giới hạn tần suất, retry và tính năng đăng bài tự động. Kiểm thử thực tế cả thành công, timeout, lỗi xác thực, trùng lead và khôi phục lỗi trước khi đưa vào vận hành.

## Tracking & SEO

Thiết lập GTM/GA4 và pixel theo mã tài khoản được cung cấp; ánh xạ sự kiện xem chi tiết, tìm kiếm, mở form, lead đã được máy chủ ghi nhận và click kênh liên hệ. Không dùng sự kiện demo làm conversion thật. Không đẩy số điện thoại thô, họ tên hoặc nhu cầu vào dataLayer, URL hay log công khai. Chính sách đồng ý theo dõi và dữ liệu khách hàng cần được xác nhận trước khi bật pixel.

Thiết kế schema theo nội dung và loại hình được xác thực (Organization/WebSite/BreadcrumbList/Offer khi phù hợp), không gắn giá giả, đánh giá giả hay vị trí chưa xác nhận. Dùng ảnh WebP/AVIF, cache, kích thước ảnh phù hợp thiết bị và lazy load phần dưới. TikTok chỉ tải trình phát khi người dùng chủ động mở.

## Cần cung cấp khi triển khai thật

- Hosting hỗ trợ WordPress/PHP/HTTPS, quyền quản lý DNS Habaki.vn và môi trường staging.
- Logo thương hiệu chính thức, bảng hàng/giá/ảnh được phép sử dụng, thông tin pháp nhân và chính sách quyền riêng tư.
- Hotline, URL Zalo OA và kênh TikTok chính thức.
- Tài liệu kết nối/tài khoản SO9 và quyền dùng Inbox, đăng bài tự động.
- Google Sheets CRM và endpoint đã xác thực hoặc service account giới hạn quyền.
- ID GTM/GA4/Google Ads/Meta/TikTok/Zalo cần dùng, khóa Turnstile và chính sách đồng ý.

## Nghiệm thu sản phẩm chính thức

CRUD bảng hàng trong WordPress; bộ lọc đúng dữ liệu; layout mobile không tràn; gửi lead thật tới cả hai đích kèm mã xưởng; lưu lead khi mạng lỗi; retry không tạo trùng; hạn chế spam; kiểm tra phân quyền và log; chứng minh conversion bằng công cụ debug; kiểm tra SEO và hiệu năng bằng dữ liệu thật. Chưa có hạng mục này được nghiệm thu từ bản demo tĩnh.
