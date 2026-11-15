export const defaults = {
  brand: 'Fit Club 222',
  phone: '038 648 5470',
  zalo: '0386485470',
  address: 'Tòa D2CT2, Tây Nam Linh Đàm, Hà Nội',
  facebook: 'https://www.facebook.com/profile.php?id=61582343026619',
  heroEyebrow: 'KHÔNG GIAN TẬP LUYỆN DÀNH CHO NỮ',
  heroTitle: 'Yêu cơ thể.\nNâng tầm chính mình.',
  heroDescription: 'Một chút nỗ lực mỗi ngày. Một phiên bản tự tin hơn của bạn. Khám phá hành trình giảm mỡ, tăng cơ và cải thiện vóc dáng cùng Fit Club 222.',
  heroImage: '/images/hero.jpg',
  aboutImage: '/images/about.jpg',
  service1Image: '/images/program-1.jpg',
  service2Image: '/images/program-2.jpg',
  service3Image: '/images/program-3.jpg',
  spaceImage: '/images/space.jpg',
  communityImage: '/images/community.jpg',
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
  notice: 'Bản giới thiệu: hình ảnh minh họa và nội dung chương trình cần được phòng tập xác nhận. Lịch tập, gói tập và phí trải nghiệm được tư vấn trực tiếp.',
};
export type Content = typeof defaults;
export const labels: Record<keyof Content, string> = {
 service1Image:'Ảnh chương trình 1',service2Image:'Ảnh chương trình 2',service3Image:'Ảnh chương trình 3',brand:'Tên phòng tập', phone:'Số điện thoại', zalo:'Số Zalo (chỉ nhập số)', address:'Địa chỉ', facebook:'Đường dẫn Facebook',heroEyebrow:'Dòng chữ nhỏ đầu trang',heroTitle:'Tiêu đề đầu trang',heroDescription:'Giới thiệu đầu trang',heroImage:'Ảnh đầu trang',aboutImage:'Ảnh giới thiệu',spaceImage:'Ảnh không gian',communityImage:'Ảnh cộng đồng',aboutTitle:'Tiêu đề giới thiệu',aboutDescription:'Nội dung giới thiệu',service1Title:'Tên chương trình 1',service1Text:'Mô tả chương trình 1',service2Title:'Tên chương trình 2',service2Text:'Mô tả chương trình 2',service3Title:'Tên chương trình 3',service3Text:'Mô tả chương trình 3',hours:'Giờ hoạt động',trialText:'Lời mời tư vấn',notice:'Ghi chú nội dung mẫu (xóa khi đã xác nhận)',
};
export function safeContent(raw: unknown): Content {
 const result = {...defaults};
 if (!raw || typeof raw !== 'object') return result;
 for (const key of Object.keys(defaults) as (keyof Content)[]) {
  const value = (raw as Record<string, unknown>)[key];
  if (typeof value !== 'string' || value.length > 6000) continue;
  if (key.endsWith('Image') && !(/^https:\/\//.test(value) || /^\/images\/[a-zA-Z0-9._-]+$/.test(value))) continue;
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
