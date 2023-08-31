import { Menu, Transition } from "@headlessui/react";
import exp from "constants";
import { Fragment } from "react";
import Head from "next/head";

const DotIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
      />
    </svg>
  );
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function MenuButton(props: any) {
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

      <Menu as="div" className={`relative inline-block text-center z-0`}>
        <div>
          <Menu.Button className="inline-flex justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 rounded-full">
            <DotIcon aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-20 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => props.ToggleUpdateForm(props.selectedBoard)}
                    className={classNames(
                      active ? "bg-gray-100 text-black" : "text-black",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    수정
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={(event) => {
                      event.stopPropagation();
                      props.DeleteBoard(props.selectedBoard);
                    }}
                    className={classNames(
                      active ? "bg-gray-100 text-black" : "text-black",
                      "block py-2 px-4 text-sm"
                    )}
                  >
                    삭제
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}

export default MenuButton;
