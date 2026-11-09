# Habaki — Bất động sản công nghiệp Thanh Hóa

Bản demo: **https://taingo2112003.github.io/Habaki/**

Demo giao diện tĩnh để duyệt thiết kế và trải nghiệm trước khi triển khai WordPress chính thức. Toàn bộ bảng hàng, giá, thông số và ảnh là minh họa, không phải chào bán chính thức. Trang demo đặt `noindex` và chặn crawler qua `robots.txt` để tránh đưa bảng hàng giả lên công cụ tìm kiếm.

## Chạy tại máy

Yêu cầu Node.js 20 trở lên. Không cần cài dependency.

```sh
npm run dev
npm test
npm run build
npm run preview
```

Mở `http://127.0.0.1:4173`. Không mở trực tiếp `index.html` qua `file://` vì website sử dụng ES modules.

## Có thể trải nghiệm

- Thiết kế responsive cho máy tính và điện thoại, menu di động và thanh liên hệ dưới màn hình.
- 12 mặt bằng minh họa, bộ lọc thuê/chuyển nhượng, loại hình, KCN/khu vực, diện tích, đơn giá và sắp xếp.
- Xem chi tiết, đăng ký khảo sát tự điền mã bất động sản, xem thêm, dạng lưới/danh sách, trạng thái không có kết quả.
- Lưu/bỏ lưu tin bằng localStorage; chỉ lưu mã bất động sản.
- URL lưu bộ lọc để chia sẻ; liên kết chi tiết hỗ trợ dạng `#mat-bang-HB-001`.
- Form có kiểm tra số điện thoại Việt Nam, honeypot và giới hạn gửi thử. Đây chỉ là mô phỏng UI, không thay thế chống spam trên máy chủ.
- Sự kiện mẫu trong `window.dataLayer`: `search_properties`, `view_property`, `save_property`, `open_lead_form`, `demo_lead_validated`. Không tải pixel và không đẩy thông tin cá nhân.
- Font và ảnh tải từ thư mục assets; không tải iframe TikTok hoặc JS thư viện bên ngoài.

**Form không gửi và không lưu dữ liệu lead.** SO9, Google Sheets, hotline, Zalo OA, TikTok, Turnstile và pixel thật chưa được cấu hình.

## Xuất bản GitHub Pages

Nhánh `main` chứa mã nguồn. Nhánh `gh-pages` chứa nội dung `dist/` sau khi build. Pages được cấu hình đọc nhánh `gh-pages`, đường dẫn `/`. Các asset dùng đường dẫn tương đối để hoạt động dưới `/Habaki/`.

Khi cập nhật: chạy test và build, commit/push `main`, sau đó đồng bộ nội dung `dist/` sang nhánh `gh-pages` và push. Không đưa khóa API hay dữ liệu khách hàng vào repo công khai.

## Triển khai WordPress chính thức

Xem [docs/wordpress-handover.md](docs/wordpress-handover.md) để biết cấu trúc đề xuất, phần việc còn lại và thông tin kết nối cần bổ sung. Repo hiện tại **chưa phải theme/plugin WordPress**.

## Ảnh & tham khảo

Ảnh từ Unsplash, chỉ minh họa loại hình và không thể hiện vị trí thực tế tại Thanh Hóa:

- [Brian Wangenheim — không gian nhà xưởng](https://unsplash.com/photos/D7A6CiIFVk8)
- [Nhà xưởng trống](https://unsplash.com/photos/gShNPSeylho), [không gian nhiều cửa sổ](https://unsplash.com/photos/hhPuHY2DlHs)
- [Kho vận](https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d), [kệ kho](https://images.unsplash.com/photo-1587293852726-70cdb56c2866), [dây chuyền sản xuất](https://images.unsplash.com/photo-1567789884554-0b844b597180), [đất cảnh quan](https://images.unsplash.com/photo-1500382017468-9049fed747ef).
- Font Be Vietnam Pro từ Google Fonts (SIL Open Font License).

Tham khảo cấu trúc danh mục và bộ lọc theo yêu cầu: [Batdongsan.com.vn](https://batdongsan.com.vn/ban-kho-nha-xuong-thanh-hoa), [IIP Vietnam](https://iipvietnam.com/), [Kho Xưởng Đẹp](https://khoxuongdep.com.vn/). Không sao chép bảng hàng, logo hoặc dữ liệu của các website này.
