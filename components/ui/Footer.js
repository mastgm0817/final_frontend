import * as React from "react";
import "./../../public/css/footer.css";

export default function Footer() {
  return (
    <footer
      className="w-full text-gray-700 body-font"
      style={{ marginTop: "20px", marginBottom: "20px" }}
    >
      <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
        <a className="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start"></a>
        <div className="flex justify-center mt-2 space-x-4">
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-f783ac transition-colors"
            style={{ marginRight: "8px", fontSize: "12px" }}
          >
            <p>이용약관</p>
          </a>

          <a
            href="#"
            className="text-sm text-gray-500 hover:text-f783ac transition-colors"
            style={{ marginRight: "8px", fontSize: "12px" }}
          >
            개인정보처리방침
          </a>
          <a
            href="https://github.com/mastgm0817/final_frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-f783ac transition-colors"
            style={{ marginRight: "8px", fontSize: "12px" }}
          >
            Github
          </a>
          <a
            href="https://fragrant-pincushion-ccf.notion.site/e915ada9d84e43a7b5c22b0ad7045d32?v=9d5a99776bbb4d7c973c0bf669108502"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-f783ac transition-colors"
            style={{ marginRight: "8px", fontSize: "12px" }}
          >
            Contact
          </a>
          <a
            href="https://luvoost.co.kr"
            className="text-sm text-gray-500 hover:text-f783ac transition-colors"
            style={{ marginRight: "8px", fontSize: "11px" }}
          >
            © Luvoost
          </a>
        </div>
      </div>
    </footer>
  );
}