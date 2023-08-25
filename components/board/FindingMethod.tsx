import { useState, FC, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/20/solid';

import './../../public/css/board.css';


  
  function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }
  
  interface boxProps {
    inputFindingMethod:string
    setInputFindingMethod: (value: string) => void;
    list:any
  }
  
  const FindingMethod : FC<boxProps> = ({inputFindingMethod, setInputFindingMethod, list}) => {
    const [selected, setSelected] = useState(list[0])
  
    function handleOnchange(value:any){
      setSelected(value);
      setInputFindingMethod(value.name);
    }
  
    return (
      <Listbox value={selected} onChange={(value)=>handleOnchange(value)}>
        {({ open }) => (
          <>
            {/* <Listbox.Label className="block text-xs font-medium leading-6 text-gray-900">검색방법</Listbox.Label> */}
            <div>
              <Listbox.Button>
                <span className="flex items-center">
                  <span className=" ml-3 block truncate align-middle">&nbsp;&nbsp;{selected.name}&nbsp;&nbsp;&nbsp; | </span>
                </span>
                <div className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <ChevronDownIcon className="h-5 w-5 text-black" />
                </div>
              </Listbox.Button>
  
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {list.map((Method:any) => (
                    <Listbox.Option
                      key={Method.id}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-pink-400 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={Method}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                              {Method.name}
                            </span>
                          </div>
  
                          {selected ? (
                            <span
                                className={classNames(
                                active ? 'text-white' : 'text-pink-200',
                                'absolute inset-y-0 right-0 flex items-center pr-4')}>
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    )
  }

export default FindingMethod;