import Link from "next/link"
import Image from "next/image"

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
          <li><a>Perfil</a></li>
          <li><a>Iniciar sesión</a></li>
          {/* <li>
            <details>
              <summary>
                Profile
              </summary>
              <ul className="p-2 bg-base-100">
                <li><a>Link 1</a></li>
                <li><a>Link 2</a></li>
              </ul>
            </details>
          </li> */}
        </ul>
      </div>
    </div>
  )
}

export default NavBar