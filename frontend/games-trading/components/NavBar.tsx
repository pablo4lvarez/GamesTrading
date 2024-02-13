'use client'

import Link from "next/link"
import Image from "next/image"
import { NAV_LINKS, NAV_LINKS_LOGGED } from "@/constants"
import { signOut, useSession } from "next-auth/react"
import { use, useEffect, useState } from "react"

const NavBar = () => {
  
  const session = useSession();
  const [loggedNavLinks, setLoggedNavLinks] = useState(false);

  useEffect(() => {
    console.log('Session in nav bar:', session);
    if (session.data) {
      setLoggedNavLinks(true);
    }
  });

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case" href="/">
          <Image src="/next.svg" alt="logo" width={74} height={29}/>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">

          {loggedNavLinks ? (
            NAV_LINKS_LOGGED.map((link) => (
              <Link key={link.key} href={link.href} className="px-4 btn btn-ghost normal-case">
                {link.label}
              </Link>
            ))
          ) : (
            NAV_LINKS.map((link) => (
              <>
              <Link key={link.key} href={link.href} className="px-4 btn btn-ghost normal-case">
                {link.label}
              </Link>
              </>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

export default NavBar