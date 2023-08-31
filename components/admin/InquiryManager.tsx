// pages/inquiry.tsx
"use client";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  getAllInquiry,
  createResponse,
} from "../../app/api/admin/inquiryAdmin/inquiryAdmin";

const InquiryAdmin: React.FC = () => {
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
  const [expandedResponseId, setExpandedResponseId] = useState<number | null>(
    null
  );
  const openModal = (inquiry: any) => {
    setSelectedInquiry(inquiry); // 선택한 문의 저장
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedInquiry(null);
    setShowModal(false);
    setCommentContent(""); // 작성 내용 초기화
  };

  const fetchInquiries = useCallback(async () => {
    if (nickName && token) {
      try {
        const result = await getAllInquiry(token);
        setInquiries(result);
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      }
    }
  }, [nickName, token]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const submitComment = async (e: any) => {
    e.preventDefault(); // 기본 제출 동작 막기
    if (!selectedInquiry || !commentContent) {
      return;
    }

    try {
      const responseRequest = {
        comment: commentContent,
      };

      const response = await createResponse(
        selectedInquiry.id,
        responseRequest,
        token
      );
      closeModal(); // 모달 닫기
      // TODO: 답변이 성공적으로 작성되었을 때 필요한 처리 추가
      fetchInquiries();
    } catch (error) {
      console.error("Error creating response:", error);
      // TODO: 에러 처리
    }
  };
  const [filter, setFilter] = useState("ALL"); // "ALL", "WAITING", "COMPLETED" 중 하나를 저장

  const filteredInquiries = inquiries.filter((inquiry) => {
    if (filter === "WAITING") {
      return inquiry.status === "WAITING"; // Use the correct status value here
    }
    if (filter === "COMPLETED") {
      return inquiry.status === "COMPLETED"; // Use the correct status value here
    }
    return true; // "ALL"일 때는 모든 문의를 표시
  });

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">문의 내역</h1>
        <div className="mt-2 space-x-2">
          <button
            className={`border px-2 py-1 ${
              filter === "ALL" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setFilter("ALL")}
          >
            전체
          </button>
          <button
            className={`border px-2 py-1 ${
              filter === "WAITING" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setFilter("WAITING")}
          >
            답변 대기 중
          </button>
          <button
            className={`border px-2 py-1 ${
              filter === "COMPLETED" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setFilter("COMPLETED")}
          >
            답변 완료
          </button>
        </div>
      </div>
      <ul>
        {filteredInquiries.map((inquiry) => (
          <li key={inquiry.id} className="mb-4 p-4 border rounded">
            {/* Display inquiry information */}
            {inquiry.id} - {inquiry.title} - {inquiry.content} -{" "}
            {inquiry.createdAt} - {inquiry.status} - {inquiry.userId} -{" "}
            {inquiry.userName}
            {/* Check inquiry status and show appropriate action */}
            {inquiry.status === "WAITING" && (
              <button onClick={() => openModal(inquiry)}>답변하기</button>
            )}
            {inquiry.status === "COMPLETED" && (
              <span
                onClick={() =>
                  setExpandedResponseId((prevId) =>
                    prevId === inquiry.id ? null : inquiry.id
                  )
                }
              >
                답변 완료됨
              </span>
            )}
            {/* Display expanded response if applicable */}
            {expandedResponseId === inquiry.id && (
              <div>
                <h2
                  className="text-xl font-semibold mb-2"
                  onClick={() => setExpandedResponseId(null)}
                >
                  답변 내용
                </h2>
                <p>{JSON.parse(inquiry.responseDTO.comment).comment}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
      {showModal && selectedInquiry && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="text-xl font-semibold mb-2">문의 내용</h2>
            <p className="mb-4">{selectedInquiry.content}</p>
            <form onSubmit={submitComment}>
              <h2 className="text-xl font-semibold mb-2">답변 작성</h2>
              <textarea
                rows={4}
                cols={50}
                className="border p-2 w-full mb-4"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              ></textarea>
              <div className="flex justify-end space-x-4">
                <button
                  className="border px-3 py-1 rounded text-gray-600 hover:bg-gray-100"
                  onClick={closeModal}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-600"
                >
                  답변 작성 완료
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryAdmin;
