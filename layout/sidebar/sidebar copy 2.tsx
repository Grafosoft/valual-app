import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useOnClickOutside } from "usehooks-ts";



type Props = {
  open: boolean;
  setOpen(open: boolean): void;
};
const Sidebar = ({ open , setOpen }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, (e) => {
    setOpen(false);
  });
  return (
    <div
    className={`flex flex-col justify-between 
    bg-indigo-700 text-zinc-50 
    md:w-full md:sticky md:top-16 md:z-0 top-0 z-20 fixed 
    md:h-[calc(100vh_-_64px)] h-full w-[300px]
    transition-transform 
    .3s ease-in-out md:-translate-x-0
    -translate-x-full${!open ? " " : "-translate-x-full"}` }
  
     

      ref={ref}
    >
       <nav className="md:sticky top-0 md:top-16">
       
       
       </nav>
      
       <div className="border-t border-t-indigo-800 p-4">
         
       </div>
     </div>
  );
};
export default Sidebar;
