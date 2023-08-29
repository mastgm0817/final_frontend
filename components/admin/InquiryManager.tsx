// pages/inquiry.tsx
"use client"
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'
import { getAllInquiry,createResponse } from '../../app/api/admin/inquiryAdmin/inquiryAdmin';

const InquiryPage: React.FC = () => {
    const session = useSession();
    const token = session.data?.user.id;
    const nickName = session.data?.user.name || "";
    interface Inquiry {
        id: number;
        title: string;
        content: string;
        createdAt: string; // yyyy-mm-dd 형식의 문자열로 가정
        status: string;
        userId: number;
        userName: string;
    }
    
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [commentContent, setCommentContent] = useState("");


    const openModal = (inquiry:any) => {
        setSelectedInquiry(inquiry); // 선택한 문의 저장
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedInquiry(null);
        setShowModal(false);
        setCommentContent(""); // 작성 내용 초기화
    };

    
    const fetchInquiries = async () => {  // useEffect 밖으로 함수를 빼냈습니다.
        if (nickName && token) {
            try {
                const result = await getAllInquiry(token);
                setInquiries(result);
            } catch (error) {
                console.error('Error fetching inquiries:', error);
            }
        }
    };
    
    console.log(inquiries)
    useEffect(() => {
        fetchInquiries();
    }, [nickName, token]);
    
    const submitComment = async () => {
        if (!selectedInquiry || !commentContent) {
            return;
        }

        try {
            const responseRequest = {
                content: commentContent
            };
            
            const response = await createResponse(selectedInquiry.id, responseRequest,token);

            console.log('Response created:', response);
            closeModal(); // 모달 닫기
            // TODO: 답변이 성공적으로 작성되었을 때 필요한 처리 추가
        } catch (error) {
            console.error('Error creating response:', error);
            // TODO: 에러 처리
        }
    };
   return (
        <div>
            <div>
                <h1>문의 내역</h1>
                <ul>
                    {inquiries.map(inquiry => (
                        <li key={inquiry.id}>
                            {inquiry.id} - {inquiry.title} - {inquiry.content} - {inquiry.createdAt} - {inquiry.status} - {inquiry.userId} - {inquiry.userName}
                            <button onClick={() => openModal(inquiry)}>답변하기</button>
                        </li>
                    ))}
                </ul>
            </div>
            {showModal && selectedInquiry && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>문의 내용</h2>
                        <p>{selectedInquiry.content}</p>
                        <h2>답변 작성</h2>
                        <textarea rows={4} cols={50}></textarea>
                        <button onClick={closeModal}>취소</button>
                        <button type="submit" onClick={submitComment}>답변 작성 완료</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InquiryPage;