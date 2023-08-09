"use client";
import "../public/css/footer.css";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-4">
      <div className="mb-4">
        <a
          href="https://localhost:3000/"
          className="text-blue-500 hover:text-blue-700"
        >
          Luvoost Website
        </a>{" "}
        {new Date().getFullYear()}
        {"."}
      </div>
      <div className="mb-4">
        <a
          href="https://fragrant-pincushion-ccf.notion.site/Final-891596851f8147dc8d81c82eccadcf6f"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          Notion
        </a>{" "}
        |
        <a
          href="https://github.com/mastgm0817/final_frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          Frontend
        </a>{" "}
        |
        <a
          href="https://github.com/mastgm0817/final_backend"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          Backend
        </a>
      </div>
      <div className="mb-4">팀 이름: T2F4</div>
      <div className="mb-4">팀 메일: T2F4@gmail.com</div>
      <div className="mb-4">팀 소개</div>
      <div className="mb-4">고객 문의</div>
      <div className="mb-4">
        <span className="italic">Copyright © Luvoost Website 2023.</span>
      </div>
    </footer>
  );
}
