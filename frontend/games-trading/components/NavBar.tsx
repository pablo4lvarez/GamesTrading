import Link from "next/link"
import Image from "next/image"
import { NAV_LINKS } from "@/constants"

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case" href="/">
          <Image src="/next.svg" alt="logo" width={74} height={29}/>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {NAV_LINKS.map((link) => (
            <Link key={link.key} href={link.href} className="px-4 btn btn-ghost normal-case">
              {link.label}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default NavBar