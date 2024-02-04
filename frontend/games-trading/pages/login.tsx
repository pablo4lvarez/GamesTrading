import '../app/globals.css'
import React from 'react'
import Link from "next/link"

const Login = () => {
  const handleLogin = () => {
    console.log('Login')
  };

  return (
    <div className='flex items-center justify-center bg-base-primary min-h-screen min-w-screen flex-col'>
      <div className="bg-base-300 w-full md:w-2/3 lg:w-1/3 p-8 rounded-lg flex flex-col items-center justify-center">
        <h2 className='text-2xl py-4'>¡Bienvenido de vuelta!</h2>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">📧 Email:</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">🔑 Password:</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
        </div>
        <p className='underline underline-offset-2 text-sm py-0.5 self-end pr-4 md:pr-14'>Olvidé mi contraseña</p>
        <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg my-4 md:my-6" onClick={handleLogin}>
          Login
        </button>
        <div className="divider divider-primary"></div>
        <h2 className='my-4'>No tienes una cuenta aún?</h2>
        <span className='underline underline-offset-2'>
          <Link href='register'>
            Regístrate
          </Link>
        </span>
      </div>

      <div className='flex-direction-row my-8'>
        🔙
        <span className='text-white pl-2'>
          <Link href='/'>
            Volver al inicio
          </Link>
        </span>
      </div>
    </div>
  )
}

export default Login