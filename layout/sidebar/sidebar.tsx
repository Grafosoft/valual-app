import { Avatar } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import {
  useContext,
  createContext,
  useState,
  PropsWithChildren,
  FC,
  ReactNode
} from 'react'
import { CgPushChevronLeft, CgPushChevronRight } from 'react-icons/cg'
import { TbUser } from 'react-icons/tb'

const SidebarContext = createContext(false)

export const Sidebar: FC<PropsWithChildren> = ({ children }) => {
  const [expanded, setExpanded] = useState(true)
  const { data } = useSession()
  const { push } = useRouter()

  return (
    <div className="hidden lg:flex">
      <div style={{ minWidth: expanded ? '250px' : '75px' }}></div>
      <aside
        className={`h-screen fixed`}
        style={{ maxWidth: expanded ? '250px' : '75px', zIndex: '5' }}
      >
        <nav className="h-full flex flex-col border-r dark:border-none shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <div></div>
            <button
              onClick={() => setExpanded(curr => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 dark:bg-transparent hover:bg-gray-100"
            >
              {expanded ? (
                <CgPushChevronLeft size={20} />
              ) : (
                <CgPushChevronRight size={20} />
              )}
            </button>
          </div>

          <SidebarContext.Provider value={expanded}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>


          <div className=" cursor-pointer  border-t dark:border-none flex p-3"
          onClick={() => push( `/usuario/${localStorage.getItem('apikey')}?&apikey=${localStorage.getItem('apikey')}`)}> 
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
        </nav>
      </aside>
    </div>
  )
}

interface SidebarItemProps {
  icon: ReactNode
  text: string
  active?: boolean
  alert?: boolean
  urlPath?: string
}

export const SidebarItem: FC<SidebarItemProps> = ({
  icon,
  text,
  active,
  alert,
  urlPath = '/'
}) => {
  const expanded = useContext(SidebarContext)
  const { push } = useRouter()

  return (
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
        if (urlPath === '/catalogo') {
          push(
            `/catalogo?apikey=${localStorage.getItem(
              'apikey'
            )}&companyId=${localStorage.getItem('companyId')}&page=0`
          )
        } else if (urlPath === '/contactos') {
          push(
            `/contactos?apikey=${localStorage.getItem(
              'apikey'
            )}&companyId=${localStorage.getItem('companyId')}&page=0`
          )
        } else if (urlPath === '/numeracion') {
            push(
              `/numeracion?apikey=${localStorage.getItem(
                'apikey'
              )}&companyId=${localStorage.getItem('companyId')}`
            )
          }else {
          push(urlPath)
        }
      }}
    >
      {icon}
      <span
        className={`font-medium text-md overflow-hidden transition-all ${
          expanded ? 'w-52 ml-3' : 'w-0'
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-sky-400 ${
            expanded ? '' : 'top-2'
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-sky-100 text-sky-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}