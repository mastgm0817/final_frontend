import { Menu, Transition } from "@headlessui/react";
import exp from "constants";
import { Fragment } from "react";

const DotIcon=() =>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
        </svg>
    )
}

function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}

function MenuButton(props:any) {
  
        return (
          <Menu as="div" className={`relative inline-block text-center z-0`}>
            <div>
              <Menu.Button className="inline-flex rounded-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100">
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
                          active ? 'bg-gray-100 text-black' : 'text-black',
                          'block px-4 py-2 text-sm'
                        )}>수정</a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a 
                        href="#" 
                        onClick={(event) => {event.stopPropagation();props.DeleteBoard(props.selectedBoard);}}
                        className={classNames(
                          active ? 'bg-gray-100 text-black' : 'text-black',
                          'block py-2 px-4 text-sm'
                        )}>삭제</a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        );
      }

      export default MenuButton;