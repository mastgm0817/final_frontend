import * as React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ fontFamily: "BMHANNAAir_ttf" }} className="rounded-lg shadow dark:bg-gray-900 m-4 mt-8">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://localhost:3000/"
            className="flex items-center mb-4 sm:mb-0 text-2xl font-semibold dark:text-white"
          >
            Luvoost Website
          </a>
        </div>
        <div className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          <div className="mb-4 font-semibold">T2F4</div>
          <div className="mb-4 text-blue-400 hover:underline cursor-pointer">고객 문의</div>
          <div className="mb-4 flex items-center space-x-4">
            <a
              href="https://fragrant-pincushion-ccf.notion.site/Final-891596851f8147dc8d81c82eccadcf6f"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500"
            >
              <Image src="/image/notion.png" alt="notion" width={30} height={30} />
            </a>
            <a
              href="https://github.com/mastgm0817/final_frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500"
            >
              <Image src="/image/github.png" alt="github_frontend" width={30} height={30} />
            </a>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 mb-8" />
        <div className="mb-4 text-center">Copyright Luvoost Website 2023.</div>
      </div>
    </footer>
  );
}