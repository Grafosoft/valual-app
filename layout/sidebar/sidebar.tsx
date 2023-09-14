import {
  Accordion,
  AccordionItem,
  Avatar,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, {
  useRef,
  useState,
  useContext,
  createContext,
  FC,
  ReactNode
} from 'react'
import { TbUser } from 'react-icons/tb'
import { useOnClickOutside } from 'usehooks-ts'
import { CgPushChevronLeft, CgPushChevronRight } from 'react-icons/cg'
const SidebarContext = createContext(false)

interface Props {
  children: ReactNode
  open: boolean
  setOpen(open: boolean): void
}

export const Sidebar: FC<Props> = ({ children, open, setOpen }) => {
  const [expanded, setExpanded] = useState(true)
  const { data } = useSession()
  const { push } = useRouter()

  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, e => {
    setOpen(false)
  })
  return (
    <div className="flex flex-col border-r dark:border-none shadow-sm">
      <div
        style={{ width: expanded ? '250px' : '75px' }}
        className={`z-20 flex flex-col justify-between
        md:bg-inherit bg-gray-50 md:h-screen md:sticky dark:bg-black
        md:dark:bg-inherit top-0 fixed  h-full transition-transform
        .3s ease-in-out md:-translate-x-0 ${!open ? '-translate-x-full ' : ''}`}
        ref={ref}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <div></div>
          <button
            onClick={() => setExpanded(curr => !curr)}
            className="p-1.5 rounded-lg dark:bg-transparent hover:bg-gray-100 "
          >
            {expanded ? (
              <CgPushChevronLeft className="hidden md:flex" size={20} />
            ) : (
              <CgPushChevronRight className="hidden md:flex" size={20} />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={expanded}>
          <ul className=" flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div
          className=" cursor-pointer  border-t dark:border-none flex p-3"
          onClick={() =>
            push(
              `/usuario/${localStorage.getItem(
                'apikey'
              )}?&apikey=${localStorage.getItem('apikey')}`
            )
          }
        >
          <Avatar
            showFallback
            fallback={<TbUser size={25} />}
            size="md"
            radius="sm"
            src={data?.user.image || ''}
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}
          `}
          >
            <div className="leading-4">
              <h4 className="font-medium">{data?.user.name || ''}</h4>
              <span className="text-xs text-gray-400">
                {data?.user.email || ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Sidebar


interface SidebarItemProps {
  icon: ReactNode
  text: string
  active?: boolean
  dropdown?: boolean
  sidebarList?: React.JSX.Element[]
  urlPath?: string
}

export const SidebarItem: FC<SidebarItemProps> = ({
  icon,
  text,
  active,
  dropdown,
  sidebarList,
  urlPath = '/'
}) => {
  const expanded = useContext(SidebarContext)
  const { push } = useRouter()

  const children = (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? 'bg-gradient-to-tr from-sky-200 to-sky-100 text-sky-800'
            : 'hover:bg-sky-50 hover:text-sky-800'
        }
    `}
      onClick={() => {
        const urlApikey = urlPath.replace(
          '$apikey',
          localStorage.getItem('apikey') || ''
        )
        const urlCompanyId = urlApikey.replace(
          '$companyId',
          localStorage.getItem('companyId') || ''
        )

        if (!dropdown) {
          push(urlCompanyId)
        }
      }}
    >
      <div className="">{icon}</div>
      <span
        className={`font-medium text-md overflow-hidden transition-all ${
          expanded ? 'w-52 ml-3' : 'w-0'
        }`}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-sky-100 text-sky-800 text-sm
          md:invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )



  return dropdown && expanded ? (
    <Accordion className="px-0" isCompact>
      <AccordionItem

        aria-label={text}
        isCompact
        title={text}
        startContent={icon}
        className="py-2 px-3"
      >

        {sidebarList}
      </AccordionItem>
    </Accordion>
  ) : dropdown && !expanded ? (
    <Popover placement="right" showArrow offset={25}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">{sidebarList}</div>
      </PopoverContent>
    </Popover>
  ) : (
    children
  )
}


