import { Fragment, useState, FC } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

const findingMethods = [
  {
    id: 1,
    name: 'nickname',
  },
  {
    id: 2,
    name: 'title',
  },
  {
    id: 3,
    name: 'content',
  }]


function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

interface boxProps {
  inputFindingMethod:string
  setInputFindingMethod: (value: string) => void;
}

const FindingMethod : FC<boxProps> = ({inputFindingMethod, setInputFindingMethod}) => {
  const [selected, setSelected] = useState(findingMethods[0])

  function handleOnchange(value:any){
    setSelected(value);
    setInputFindingMethod(value.name);
  }

  return (
    <Listbox value={selected} onChange={(value)=>handleOnchange(value)}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-xs font-medium leading-6 text-gray-900">검색방법</Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {findingMethods.map((findingMethod) => (
                  <Listbox.Option
                    key={findingMethod.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-pink-400 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={findingMethod}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                            {findingMethod.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-pink-200',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
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