import "./../../public/css/footer.css";
import Head from "next/head";

export default function Footer() {
  return (
    <>
      <Head>
        <title>러부스트 Luvoost - 완벽한 데이트 코스 찾기</title>
        <meta
          name="description"
          content="러부스트 Luvoost에서 사랑하는 연인과 완벽한 데이트를 계획해보세요."
        />
        <meta
          name="keywords"
          content="데이트, 연인, 커플, 로맨틱, 러부스트, Luvoost"
        />
        <meta
          property="og:title"
          content="러부스트 Luvoost - 사랑하는 연인과의 완벽한 데이트 코스"
        />
        <meta
          property="og:description"
          content="참신하고 아름다운 데이트 아이디어를 러부스트 Luvoost에서 찾아보세요. 여기서 당신의 이상적인 데이트를 계획해보세요."
        />
        <meta property="og:image" content="URL_OF_YOUR_IMAGE_HERE" />
      </Head>

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
    </>
  );
}
