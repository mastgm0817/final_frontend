// pages/inquiry.tsx
"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'
import InquiryForm from '../../components/inquiry/InquiryForm';
import { createInquiry,getMyInquiry } from '../api/inquiry/inquriyApi';

const InquiryPage: React.FC = () => {
    const session = useSession();
    const token = session.data?.user.id;
    const nickName = session.data?.user.name || "";
    const [inquiries, setInquiries] = useState<any[]>([]);

    const fetchInquiries = async () => {  // useEffect 밖으로 함수를 빼냈습니다.
        if (nickName && token) {
            try {
                const result = await getMyInquiry(nickName, token);
                setInquiries(result);
            } catch (error) {
                console.error('Error fetching inquiries:', error);
            }
        }
    };

    const handleInquirySubmit = async (content: string, title: string) => {
        try {
            const result = await createInquiry(nickName, title, content, token);
            console.log('Inquiry submitted:', result);
            fetchInquiries();  // 문의 제출 후 fetchInquiries를 호출합니다.
        } catch (error) {
            console.error('Error submitting inquiry:', error);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, [nickName, token]);


    return (
        <div>
            <div>
                <h1>문의 생성</h1>
                <InquiryForm onSubmit={handleInquirySubmit} />
            </div>
            <div>
                <h1>문의 내역</h1>
                <ul>
                    {inquiries.map(inquiry => (
                        <li key={inquiry.id}>
                            {inquiry.title} - {inquiry.content} - {inquiry.createdAt} -{inquiry.status}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default InquiryPage;
