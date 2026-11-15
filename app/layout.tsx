import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:'Fit Club 222 | Không gian tập luyện dành cho nữ',description:'Giảm mỡ, tăng cơ và cải thiện vóc dáng cùng Fit Club 222 tại Tòa D2CT2, Tây Nam Linh Đàm, Hà Nội. Liên hệ 038 648 5470.',robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="vi"><body>{children}</body></html> }
