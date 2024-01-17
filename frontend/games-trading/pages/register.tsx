import '../app/globals.css'

import React, { useState } from 'react'
import Link from 'next/link'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    password: '',
    repeatPassword: '',
    location: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = () => {
    // Implement your registration logic here using formData
    console.log('Registration data:', formData);
  };

  return (
    <div className='flex items-center justify-center bg-base-primary min-h-screen min-w-screen flex-col'>
      <div className="bg-base-300 w-full md:w-2/3 lg:w-1/3 p-8 rounded-lg flex flex-col items-center justify-center">
        <h2 className='text-2xl py-4'>¡Regístrate ahora!</h2>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">Nombre:</span>
          </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">Apellido:</span>
          </label>
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">Email:</span>
          </label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">Teléfono:</span>
          </label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">Comuna:</span>
          </label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">Contraseña:</span>
          </label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">Repetir Contraseña:</span>
          </label>
          <input type="password" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
        </div>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">Comuna:</span>
          </label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
        </div>
        <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg my-4 md:my-6" onClick={handleRegister}>
          Registrarse
        </button>
        <div className="divider divider-primary"></div>
        <h2 className='my-4'>¿Ya tienes una cuenta?</h2>
        <span className='underline underline-offset-2'>
          <Link href='/login'>
            Iniciar Sesión
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

export default Register;
