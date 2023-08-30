"use client"
import { useEffect, useState,useCallback  } from 'react';
import { useSession } from 'next-auth/react'
import InquiryForm from '../../components/inquiry/InquiryForm';
import { createInquiry,getMyInquiry } from '../api/inquiry/inquriyApi';
import "./../../public/css/board.css";

const InquiryPage: React.FC = () => {
    const session = useSession();
    const token = session.data?.user.id;
    const nickName = session.data?.user.name || "";
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [showMyInquiries, setShowMyInquiries] = useState<boolean>(false);

    const fetchInquiries = useCallback(async () => {
        if (nickName && token) {
            try {
                const result = await getMyInquiry(nickName, token);
                setInquiries(result);
            } catch (error) {
                console.error('Error fetching inquiries:', error);
            }
        }
    }, [nickName, token]);

    const handleInquirySubmit = async (title: string, content: string) => {
        try {
            const result = await createInquiry(nickName, title, content, token);
            console.log('Inquiry submitted:', result);
            fetchInquiries();
        } catch (error) {
            console.error('Error submitting inquiry:', error);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, [fetchInquiries]); // Include fetchInquiries in the dependency array


    return (
        <div>
            <div>
                <h1 className='font-bold text-2xl text-center mt-20 mb-5'>문의하기</h1>
                <div className='text-sm text-gray-600 text-center mb-7'>버그, 기타 질문 사항 등에 대해 알려주세요.</div>
                <hr/><br/>
                <InquiryForm onSubmit={handleInquirySubmit} />
            </div>
            <div>
                <div className={`mt-10 text-${showMyInquiries?"pink-500":"blue-400"} text-center`}
                    onClick={()=>setShowMyInquiries(!showMyInquiries)}>{showMyInquiries?"닫기":"문의 내역 확인하기"}</div>
                <ul className='mt-10 justify-center px-32'>
                    
                    {showMyInquiries && 
                        <div>
                        <hr></hr>
                            <div className='justify-center mt-2'>
                            {inquiries.map(inquiry => (
                                    <div key={inquiry.id} className='py-4'>
                                        <div className='flex'>
                                            <div className='text-lg font-bold flex'>{inquiry.title}</div>
                                            <div className='text-xs text-gray-500 ml-2 pt-2'>{inquiry.createdAt} 등록 </div>
                                            <div className={`${inquiry.status==="WAITING"?"text-pink-600":"text-blue-500"} font-bold text-xs pl-2 pt-2`}>{inquiry.status}</div>
                                        </div>
                                        <div className='my-2'>{inquiry.content}</div>
                                        
                                    </div>
                            ))}</div>
                        </div>
                    }
                    
                </ul>
                <br/><br/>
            </div>
        </div>
    );
};
export default InquiryPage;
