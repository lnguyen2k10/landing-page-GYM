import {getContent} from '@/lib/content';
import Landing from '@/components/Landing';
export default async function Page(){return <Landing content={await getContent()} />}
