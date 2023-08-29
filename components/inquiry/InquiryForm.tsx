import { useState } from 'react';

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
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="제목을 입력해주세요."
                className="border rounded p-3 w-full focus:outline-none focus:ring focus:border-blue-500"
            />
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="문의 내용을 입력해주세요."
                className="border rounded p-3 w-full h-40 resize-none focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
            >
                문의하기
            </button>
</form>
)};

export default InquiryForm;
