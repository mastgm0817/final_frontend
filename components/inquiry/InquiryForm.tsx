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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="제목을 입력해주세요."
            />
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="문의 내용을 입력해주세요."
            />
            <button type="submit">문의하기</button>
        </form>
    );
};

export default InquiryForm;
