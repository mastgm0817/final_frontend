import { useState } from 'react';
import "./../../public/css/inquiry.css";

interface InquiryFormProps {
    onSubmit: (title: string, content: string) => void;
}

const InquiryForm: React.FC<InquiryFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title && content) {
            onSubmit(title, content);
            setTitle('');
            setContent('');
        }
    };

    return (
        <div className='flex flex-col items-center justify-center'>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-4/5">
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="제목을 입력해주세요."
                className="border rounded p-3 w-full focus:outline-none focus:border-pink-500"
            />
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="문의 내용을 입력해주세요."
                className="border rounded p-3 w-full h-40 resize-none focus:outline-none focus:border-pink-500"
            />
            <div className='flex items-center justify-center'>
                <button
                    type="submit"
                    className="bg-pink-500 text-white py-3 px-6 rounded hover:bg-pink-600 focus:outline-none focus:ring focus:border-pink-500"
                >
                문의하기
            </button>
</div>
        </form>
        </div>
)};

export default InquiryForm;
