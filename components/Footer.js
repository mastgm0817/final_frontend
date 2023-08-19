import * as React from "react";
import "../public/css/footer.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">

      <div class="flex-grow flex md:w-5/6 w-full px-4">
      <div className="w-full md:w-1/4 md:mx-0 mx-auto text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start">
            <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <Image src="./image/logo.svg" alt="Logo" width={90} height={40} />
              <span class="ml-3 text-xl">Luvoost</span>
            </a>
          </div>
          <p class="mt-2 text-sm text-gray-500">
            세상의 모든 연인을 응원합니다💕
          </p>
        </div>

        <div class="lg:w-1/4 md:w-1/2 w-full">
          <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
            CATEGORIES
          </h2>
          <nav class="list-none mb-5">
            <li>
              <a class="text-gray-600 hover:text-gray-800">First Link</a>
            </li>
            <li>
              <a class="text-gray-600 hover:text-gray-800">Second Link</a>
            </li>
            <li>
              <a class="text-gray-600 hover:text-gray-800">Third Link</a>
            </li>
            <li>
              <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
            </li>
          </nav>
        </div>
          <div class="lg:w-1/6 md:w-1/2 w-full px-4">
            <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav class="list-none mb-5">
              <li>
                <a class="text-gray-600 hover:text-gray-800">First Link</a>
              </li>
              <li>
                <a class="text-gray-600 hover:text-gray-800">Second Link</a>
              </li>
              <li>
                <a class="text-gray-600 hover:text-gray-800">Third Link</a>
              </li>
              <li>
                <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
              </li>
            </nav>
          </div>
          <div class="lg:w-1/6 md:w-1/2 w-full px-4">
            <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav class="list-none mb-5">
              <li>
                <a class="text-gray-600 hover:text-gray-800">First Link</a>
              </li>
              <li>
                <a class="text-gray-600 hover:text-gray-800">Second Link</a>
              </li>
              <li>
                <a class="text-gray-600 hover:text-gray-800">Third Link</a>
              </li>
              <li>
                <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
              </li>
            </nav>
          </div>
          <div class="lg:w-1/6 md:w-1/2 w-full px-4">
            <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav class="list-none mb-5">
              <li>
                <a class="text-gray-600 hover:text-gray-800">First Link</a>
              </li>
              <li>
                <a class="text-gray-600 hover:text-gray-800">Second Link</a>
              </li>
              <li>
                <a class="text-gray-600 hover:text-gray-800">Third Link</a>
              </li>
              <li>
                <a class="text-gray-600 hover:text-gray-800">Fourth Link</a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div class="bg-gray-100">
        <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row justify-between">
          <p class="text-gray-500 text-sm text-center sm:text-left">
            © 2023 Luvoost — @T2F4
            <Image src="./image/github.svg" alt="github" width={24} height={24} />
          </p>
        </div>
      </div>
    </footer>
  );
}
