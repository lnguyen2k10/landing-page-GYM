'use client';
import {useEffect,useState} from 'react';
import Landing from '@/components/Landing';
import {safeContent,type Content} from '@/lib/content';
export default function Preview(){const[c,setC]=useState<Content|null>(null);useEffect(()=>{try{setC(safeContent(JSON.parse(sessionStorage.getItem('fitclub-preview')||'{}')))}catch{setC(safeContent({}))}},[]);return c?<Landing content={c} preview/>:<p style={{padding:30}}>Đang tải bản xem trước…</p>}
