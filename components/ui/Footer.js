import "./../../public/css/footer.css";

export default function Footer() {
  return (
    <footer className="w-full text-gray-700 body-font bg-gray-100 py-8 bg-opacity-50">
      <div className="flex justify-center items-center mx-auto max-w-4xl px-4 md:px-0">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-f783ac transition-colors"
          >
            이용약관
          </a>
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-f783ac transition-colors"
          >
            개인정보처리방침
          </a>
          <a
            href="https://github.com/mastgm0817/final_frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-f783ac transition-colors"
          >
            Github
          </a>
          <a
            href="https://fragrant-pincushion-ccf.notion.site/e915ada9d84e43a7b5c22b0ad7045d32?v=9d5a99776bbb4d7c973c0bf669108502"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-f783ac transition-colors"
          >
            Contact
          </a>
          <a
            href="https://luvoost.co.kr"
            className="text-sm text-gray-500 hover:text-f783ac transition-colors"
          >
            © Luvoost
          </a>
        </div>
      </div>
    </footer>
  );
}
