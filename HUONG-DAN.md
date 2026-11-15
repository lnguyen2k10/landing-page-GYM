# Fit Club 222 — Hướng dẫn triển khai và bàn giao

Website Next.js dành cho nữ, triển khai GitHub + Vercel. Không cần CMS trả phí. Google Sheets + Apps Script có hạn mức và điều khoản riêng; không cam kết dịch vụ luôn miễn phí. Vercel Hobby dành cho mục đích cá nhân, phi thương mại: website kinh doanh cần kiểm tra điều khoản và chọn gói phù hợp, thường là Pro. Chi phí tên miền tính riêng.

## 1. Chạy trên máy

Yêu cầu Node.js 20.9 trở lên.

```
npm ci
npm run dev
```

Mở http://localhost:3000. Kiểm tra production: `npm run check` và `npm run build`.

## 2. Google Sheets — cài một lần bởi người triển khai

1. Chủ cơ sở tạo một Google Sheet thuộc tài khoản của họ. Giữ quyền truy cập Restricted; chỉ mời người được phép sửa. Không cần chia sẻ toàn bộ bảng công khai.
2. Nhập `google-sheets/noi-dung-mau.csv` bằng File → Import. Đổi tên tab thành **Nội dung**. Có 3 cột `key`, `label`, `value`. Không đổi key. Giá trị đều là nội dung công khai trên web; không lưu thông tin khách, mật khẩu hoặc hồ sơ sức khỏe vào đây.
3. Extensions → Apps Script. Dán `google-sheets/Code.gs` vào Code.gs. Tạo file HTML tên **Editor**, dán `google-sheets/Editor.html`.
4. Lưu, chạy `onOpen`, cấp quyền được Google yêu cầu. Tải lại bảng tính. Menu **Fit Club** xuất hiện.
5. Chọn Fit Club → Chỉnh sửa nội dung. Đổi nội dung bằng bảng bên phải. Bấm Lưu bản nháp, rồi Xuất bản lên website.
6. Trong Apps Script chọn Deploy → New deployment → Web app. Execute as **Me**, Who has access **Anyone** (tùy chính sách Workspace, quản trị viên có thể không cho phép). Endpoint chỉ có `doGet` công khai, chỉ trả bản nội dung marketing đã xuất bản. Không có endpoint công khai ghi dữ liệu. Quyền biên tập vẫn do Google Sheets kiểm soát.
7. Sao chép URL kết thúc `/exec`. Mở trong cửa sổ ẩn danh, kiểm tra trả JSON và không đòi đăng nhập.
8. Cấu hình `CONTENT_API_URL` bằng URL này trên Vercel. `GOOGLE_SHEET_EDIT_URL` bằng URL bảng tính. Redeploy.
9. Sửa thử một tiêu đề, lưu và xuất bản. Kiểm tra web sau khoảng một phút; revalidation có thể cần thêm một lượt truy cập. Bản nháp không ảnh hưởng web trước khi xuất bản.

Website dùng nội dung mẫu khi chưa kết nối hoặc nguồn Google lỗi. Khi triển khai thật, nên thay nội dung mẫu đi kèm trong `lib/content.ts` bằng bản đã duyệt để đây cũng là dữ liệu dự phòng chính xác.

## 3. Chủ phòng tập sử dụng hằng ngày

- Mở Google Sheets đã được ghim sẵn → Fit Club → Chỉnh sửa nội dung.
- Thay chữ ở ô tiếng Việt. Tiêu đề có thể xuống dòng.
- Thay ảnh: bấm chọn file ngay dưới ô ảnh. Ảnh JPG/PNG/WebP dưới 5 MB được tải lên thư mục Drive do script tạo, đặt quyền xem công khai và điền đường dẫn tự động. Có thể dán URL HTTPS từ nơi lưu trữ khác. Chỉ tải ảnh đã được phép công bố. Khi dùng upload lần đầu Google sẽ yêu cầu quyền Drive; người triển khai cần chạy thử, cấp quyền trước khi bàn giao. Google Workspace có thể chặn chia sẻ công khai; khi đó dùng URL HTTPS khác.
- Bấm **Lưu bản nháp**. Xem lại nội dung. Bấm **Xuất bản lên website**.
- Mở website kiểm tra sau khoảng một phút.
- Muốn khôi phục: dùng lịch sử phiên bản Google Sheets để khôi phục tab Nội dung, rồi xuất bản lại.

Google Sheets phù hợp sửa chữ, lịch tập, thông tin liên hệ. Sidebar bổ sung chọn ảnh và xem trước ảnh. Ảnh dùng Drive tiêu thụ dung lượng tài khoản và băng thông có giới hạn, không phải CDN ảnh chuyên dụng. Cần thử URL ảnh trong cửa sổ ẩn danh; khi lưu lượng tăng nên chuyển ảnh sang CDN hoặc public/images trên Vercel. Chưa xác minh upload bằng tài khoản Google thật trong phiên này. Không nên hứa rằng chỉ tạo Sheet là mọi phần đã tự kết nối.

`/quan-tri` là công cụ soạn thử công khai: thay đổi chỉ ở trình duyệt, có xem trước và tải CSV; không cho khách lạ xuất bản. Quyền xuất bản thật chỉ trong bảng tính riêng. Để nhập CSV cập nhật: File → Import → Replace current sheet trong tab Nội dung, kiểm tra key/label/value rồi xuất bản lại.

## 4. GitHub và Vercel

1. Tạo repo trên GitHub, push toàn bộ thư mục này trừ node_modules/.next/.env.
2. Trong Vercel: Add New Project → chọn repo → framework Next.js → thêm biến từ `.env.example` → Deploy.
3. Nếu chưa cài Sheets có thể deploy bản nháp trước, website vẫn chạy bằng dữ liệu mẫu.
4. Kết nối domain, DNS theo hướng dẫn Vercel; cập nhật NEXT_PUBLIC_SITE_URL nếu dùng sau này. Metadata hiện tại không gắn tên miền mẫu.
5. Mỗi lần push GitHub, Vercel build lại. Thay nội dung Sheets không cần sửa code hay push GitHub.
6. Không đưa thông tin đăng nhập, token hoặc khóa bí mật vào repo. Tài khoản GitHub, Vercel và Google nên do khách sở hữu; nhà phát triển được mời quyền phù hợp.

## 5. Nội dung và ảnh cần xác nhận

Đã dùng: Fit Club 222 (tên đọc từ ảnh), dành cho nữ, giảm mỡ/tăng cơ/vóc dáng toàn diện, Tòa D2CT2 Tây Nam Linh Đàm Hà Nội, 038 648 5470. Zalo tạm dùng số này; cần thử thực tế xem tài khoản có hoạt động.

- Bỏ hoàn toàn cam kết hoàn phí.
- Chưa có giá, lịch lớp, tên/chứng chỉ huấn luyện viên, đánh giá xác thực. Không tạo giá, thông tin PT hoặc lời chứng thực giả. Các mục này hiện được diễn đạt bằng hướng dẫn liên hệ và hành trình tham gia.
- Ảnh hiện tại là ảnh minh họa tải từ Unsplash, chưa phải ảnh Fit Club. Ghi chú bản nháp trên chân trang thể hiện rõ. Kiểm tra giấy phép Unsplash và quyền sử dụng người mẫu trước khi dùng quảng cáo; nên thay ảnh thật do chủ cơ sở cung cấp trước khi public chính thức.
- Ảnh người dùng đã gửi trong cuộc trò chuyện không có file cục bộ truy cập được trong workspace ở thời điểm dựng. Logo thật đã lấy từ trang Facebook chính thức và nhúng ở đầu/cuối trang cùng favicon; các ảnh hoạt động vẫn đang chờ file tải được. Muốn thay ảnh chỉ cần đặt file vào public/images hoặc dùng URL ảnh công khai trong Sheet. Không sửa ảnh để giả mạo cơ sở.
- Ảnh hero gợi ý 1600×2000; ảnh chương trình 1000×1200; ảnh không gian 1800×1200. Dùng JPG/WebP, ưu tiên dưới 500 KB, giữ chủ thể ở giữa khi cắt trên mobile.
- Không có form thu dữ liệu khách; CTA gọi điện, Zalo và Facebook hoạt động bằng liên kết trực tiếp. Không có thông báo gửi thành công giả, không có phí trải nghiệm mặc định, không tự nhận là miễn phí.
- Sau khi xác minh toàn bộ, sửa/xóa trường notice trong Sheet.

## 6. Kiểm tra bàn giao

- Kiểm tra số điện thoại, mở Zalo, Facebook, đường đi trên thiết bị thật.
- Kiểm tra mobile 390px, tablet 768px, desktop 1440px; menu, FAQ, nút liên hệ.
- Sửa nội dung trong Sheets và xác nhận xuất bản; người không có quyền Google không được sửa.
- Nếu cần SEO địa phương sâu hơn: thêm tên chính thức/giờ mở cửa đã xác nhận và dữ liệu có cấu trúc phù hợp.
- Hiệu ứng có hỗ trợ prefers-reduced-motion; ảnh lazy load trừ hero, mục điều hướng bàn phím và focus rõ ràng.

## Thư viện ảnh

Giao diện dùng vàng #fff20b làm màu chủ đạo, xanh lá/xanh dương theo logo. Các ô gallery1Image đến gallery6Image chứa đường dẫn ảnh; galleryNCaption là chú thích và galleryNCategory là nhóm (Tập luyện/Không gian/Cộng đồng). Để trống ảnh để ẩn ô đó. Chỉnh được trong /quan-tri hoặc sidebar Google Sheets sau khi kết nối. Khi đã thay toàn bộ ảnh minh họa, đổi galleryIllustrative thành false để bỏ nhãn minh họa. Không tắt nhãn trước khi đã thay ảnh thật. Thư viện hỗ trợ lọc, bấm xem lớn, phím trái/phải, Escape để đóng và điều hướng bàn phím trong hộp thoại.
