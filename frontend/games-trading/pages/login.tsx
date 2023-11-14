import '../app/globals.css'
import React from 'react'

const Login = () => {
  return (
    <div className='flex items-center justify-center bg-base-primary min-h-screen min-w-screen flex-col'>
      <div className="bg-base-300 w-1/3 h-1/2 rounded-lg flex flex-col items-center justify-center">
        <h2 className='text-2xl py-4'>¡Bienvenido de vuelta!</h2>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">Email:</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">Password:</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
        </div>
        <p className='underline underline-offset-2 text-sm py-0.5'>Olvidé mi contraseña</p>
        <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg my-4 md:my-6">Login</button>
        <div className="divider divider-primary"></div>
        <h2>No tienes una cuenta?</h2>
        <span className='my-4'>Regístrate</span>
      </div>

      <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg my-4 md:my-6">Volver</button>
    </div>
  )
}

export default Login