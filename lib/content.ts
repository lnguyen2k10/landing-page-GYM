export const defaults = {
  brand: 'Fit Club 222',
  logoImage: '/images/fitclub-logo.jpg',
  galleryIllustrative: 'false',
  gallery1Image: '/images/daily-training.jpg',
  gallery1Caption: 'Cùng nhau tập luyện mỗi ngày',
  gallery1Category: 'Tập luyện',
  gallery2Image: '/images/members-standing.jpg',
  gallery2Caption: 'Rạng rỡ cùng Fit Club 222',
  gallery2Category: 'Hội viên',
  gallery3Image: '/images/members-together.jpg',
  gallery3Caption: 'Một cộng đồng cùng tiến bộ',
  gallery3Category: 'Hội viên',
  gallery4Image: '/images/community-event.jpg',
  gallery4Caption: 'Gặp gỡ và kết nối tại câu lạc bộ',
  gallery4Category: 'Cộng đồng',
  gallery5Image: '/images/entrance.jpg',
  gallery5Caption: 'Chào mừng bạn đến Fit Club 222',
  gallery5Category: 'Không gian',
  gallery6Image: '/images/ecosystem.jpg',
  gallery6Caption: 'Giới thiệu hệ sinh thái',
  gallery6Category: 'Giới thiệu',
  phone: '038 648 5470',
  zalo: '0386485470',
  address: 'Tòa D2CT2, Tây Nam Linh Đàm, Hà Nội',
  facebook: 'https://www.facebook.com/profile.php?id=61582343026619',
  heroEyebrow: 'KHÔNG GIAN TẬP LUYỆN DÀNH CHO NỮ',
  heroTitle: 'Yêu cơ thể.\nNâng tầm chính mình.',
  heroDescription: 'Một chút nỗ lực mỗi ngày. Một phiên bản tự tin hơn của bạn. Khám phá hành trình giảm mỡ, tăng cơ và cải thiện vóc dáng cùng Fit Club 222.',
  heroImage: '/images/members-standing.jpg',
  heroSlide2Image: '/images/members-together.jpg',
  heroSlide3Image: '/images/daily-training.jpg',
  heroSlide1Caption: 'Tỏa sáng từ\nchính bên trong.',
  heroSlide2Caption: 'Cùng nhau tập.\nCùng nhau rạng rỡ.',
  heroSlide3Caption: 'Năng lượng mới.\nMỗi ngày khỏe hơn.',
  aboutImage: '/images/members-together.jpg',
  service1Image: '/images/daily-training.jpg',
  service2Image: '/images/members-standing.jpg',
  service3Image: '/images/members-together.jpg',
  spaceImage: '/images/daily-training.jpg',
  communityImage: '/images/community-event.jpg',
  aboutTitle: 'Nơi bạn tìm thấy\nphiên bản rạng rỡ hơn.',
  aboutDescription: 'Không chỉ là một buổi tập. Đây là khoảng thời gian bạn dành riêng cho bản thân — để vận động, tái tạo năng lượng và kết nối cùng những người phụ nữ có chung mong muốn sống khỏe.',
  service1Title: 'Giảm mỡ & săn chắc',
  service1Text: 'Bắt đầu từ mục tiêu của bạn, xây dựng thói quen vận động đều đặn và từng bước cải thiện vóc dáng.',
  service2Title: 'Tăng cơ & sức mạnh',
  service2Text: 'Khám phá khả năng của cơ thể với các bài tập sức mạnh, chú trọng kỹ thuật và sự tiến bộ theo từng buổi.',
  service3Title: 'Vóc dáng toàn diện',
  service3Text: 'Kết hợp vận động, nghỉ ngơi và thói quen sống tích cực để hướng tới một cơ thể khỏe khoắn, cân đối.',
  hours: 'Liên hệ để được tư vấn khung giờ phù hợp',
  trialText: 'Cùng tìm cách tập phù hợp với bạn.',
  notice: 'Lịch tập, chương trình cụ thể và học phí được tư vấn trực tiếp. Hình ảnh do Fit Club 222 cung cấp.',
};
export type Content = typeof defaults;
export const labels: Record<keyof Content, string> = {
 heroSlide2Image:'Ảnh hero slide 2',heroSlide3Image:'Ảnh hero slide 3',heroSlide1Caption:'Thông điệp hero slide 1',heroSlide2Caption:'Thông điệp hero slide 2',heroSlide3Caption:'Thông điệp hero slide 3',logoImage:'Logo thương hiệu',galleryIllustrative:'Thư viện đang dùng ảnh minh họa (true/false)',
 gallery1Image:'Ảnh thư viện 1',gallery1Caption:'Chú thích ảnh 1',gallery1Category:'Nhóm ảnh 1',gallery2Image:'Ảnh thư viện 2',gallery2Caption:'Chú thích ảnh 2',gallery2Category:'Nhóm ảnh 2',gallery3Image:'Ảnh thư viện 3',gallery3Caption:'Chú thích ảnh 3',gallery3Category:'Nhóm ảnh 3',gallery4Image:'Ảnh thư viện 4',gallery4Caption:'Chú thích ảnh 4',gallery4Category:'Nhóm ảnh 4',gallery5Image:'Ảnh thư viện 5',gallery5Caption:'Chú thích ảnh 5',gallery5Category:'Nhóm ảnh 5',gallery6Image:'Ảnh thư viện 6',gallery6Caption:'Chú thích ảnh 6',gallery6Category:'Nhóm ảnh 6',
 service1Image:'Ảnh chương trình 1',service2Image:'Ảnh chương trình 2',service3Image:'Ảnh chương trình 3',brand:'Tên phòng tập', phone:'Số điện thoại', zalo:'Số Zalo (chỉ nhập số)', address:'Địa chỉ', facebook:'Đường dẫn Facebook',heroEyebrow:'Dòng chữ nhỏ đầu trang',heroTitle:'Tiêu đề đầu trang',heroDescription:'Giới thiệu đầu trang',heroImage:'Ảnh đầu trang',aboutImage:'Ảnh giới thiệu',spaceImage:'Ảnh không gian',communityImage:'Ảnh cộng đồng',aboutTitle:'Tiêu đề giới thiệu',aboutDescription:'Nội dung giới thiệu',service1Title:'Tên chương trình 1',service1Text:'Mô tả chương trình 1',service2Title:'Tên chương trình 2',service2Text:'Mô tả chương trình 2',service3Title:'Tên chương trình 3',service3Text:'Mô tả chương trình 3',hours:'Giờ hoạt động',trialText:'Lời mời tư vấn',notice:'Ghi chú nội dung mẫu (xóa khi đã xác nhận)',
};
export function safeContent(raw: unknown): Content {
 const result = {...defaults};
 if (!raw || typeof raw !== 'object') return result;
 for (const key of Object.keys(defaults) as (keyof Content)[]) {
  const value = (raw as Record<string, unknown>)[key];
  if (typeof value !== 'string' || value.length > 6000) continue;
  if (key.endsWith('Image') && value !== '' && !(/^https:\/\//.test(value) || /^\/images\/[a-zA-Z0-9._-]+$/.test(value))) continue;
  if (key === 'facebook' && !/^https:\/\/(www\.)?facebook\.com\//.test(value)) continue;
  if (key === 'zalo' && !/^\d{9,15}$/.test(value)) continue;
  result[key] = value;
 }
 return result;
}
export async function getContent(): Promise<Content> {
 const endpoint = process.env.CONTENT_API_URL;
 if (!endpoint) return {...defaults};
 try {
  const response = await fetch(endpoint, {next:{revalidate:60}, signal: AbortSignal.timeout(8000)});
  if (!response.ok) throw new Error('Content unavailable');
  return safeContent(await response.json());
 } catch { console.warn('Using bundled Fit Club content: content service unavailable.'); return {...defaults}; }
}
