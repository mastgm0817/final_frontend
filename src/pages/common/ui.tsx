import Link from "next/link"
import './ui.css';

const NavBar = () => {
    return (
        <div className="flex justify-between items-center p-6">
            <div className="flex items-center space-x-4">
            <Link href="#">
                    <img className="logo" src="/logo.svg" alt="Logo" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                커뮤니티
            </Link>

            <Link href="#" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                코스추천
            </Link>
            <Link href="#" className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                프로필
            </Link>
          </div>
        </div>
      );
    }

export default NavBar;