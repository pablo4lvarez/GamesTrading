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
          <li><a>Intercambiar</a></li>
          <li><a>Perfil</a></li>
          <li><Link href="/pages/login">Iniciar sesión</Link></li>
          
        </ul>
      </div>
    </div>
  )
}

export default NavBar