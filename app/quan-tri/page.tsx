import Editor from '@/components/Editor';
import {getContent} from '@/lib/content';
export const metadata={title:'Quản lý nội dung | Fit Club 222',robots:{index:false,follow:false}};
export default async function Admin(){return <Editor initial={await getContent()} sheetUrl={process.env.GOOGLE_SHEET_EDIT_URL||''} connected={!!process.env.CONTENT_API_URL}/>}
