import { NavLink } from "@remix-run/react";
import type { ReactNode } from "react";

type FilterLinkProps = {
    to: string;
    children: ReactNode;
}

export default function FilterLink({to, children}: FilterLinkProps){
    return(
        <NavLink to={to} className="text-cyan-500 background-transparent font-bold uppercase px-8 py-3 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" >{children}</NavLink>
    )
}