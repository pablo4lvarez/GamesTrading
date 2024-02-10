import '../app/globals.css'

import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'

const Register = () => {

  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    password: '',
    repeatPassword: '',
    location: '',
    email: '',
    phone: '',
  });

  const [alert, setAlert] = useState({
    show: false,
    message: '',
  });

  const [success, setSuccess] = useState(false);

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
    const areEmptyFields = checkEmptyFields();
    const differentPasswords = checkPasswords();

    if (!areEmptyFields && !differentPasswords) {

      // Make the POST request using Axios with the "Content-Type" header
      axios.post(
        process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL + '/users',
        {
          name: formData.name,
          lastname: formData.lastname,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then(response => {
          // Handle successful response
          console.log('Registration successful', response.data);
          setSuccess(true);
          // Add a delay to show the success message before redirecting
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        })
        .catch(error => {
          // Handle error
          console.error('Registration failed', error.response.data);
          setAlert({
            show: true,
            message: 'Ocurrió un error al registrarse. Por favor, intenta nuevamente.',
          });
        });
    }

  };

  const checkEmptyFields = () => {
    const emptyFields = Object.values(formData).some(value => !value);
    if (emptyFields) {
      setAlert({
        show: true,
        message: 'Por favor, completa todos los campos.',
      });
      return true
    } else {
      return false
    }
  }

  const checkPasswords = () => {
    if (formData.password !== formData.repeatPassword) {
      setAlert({
        show: true,
        message: 'Las contraseñas no coinciden.',
      });
      return true
    } else {
      return false
    }
  }

  return (
    <div className='flex items-center justify-center bg-base-primary min-h-screen min-w-screen flex-col'>
      <div className="bg-base-300 w-full md:w-2/3 lg:w-1/3 p-8 rounded-lg flex flex-col items-center justify-center">
        <h2 className='text-2xl py-4'>¡Regístrate ahora!</h2>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">Nombre:</span>
          </label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" required={true} />
        </div>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">Apellido:</span>
          </label>
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" required={true} />
        </div>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">Email:</span>
          </label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" required={true} />
        </div>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">Teléfono:</span>
          </label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" required={true} />
        </div>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">Comuna:</span>
          </label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" required={true} />
        </div>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">Contraseña:</span>
          </label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" required={true} />
        </div>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">Repetir Contraseña:</span>
          </label>
          <input type="password" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" required={true}/>
        </div>

        {alert.show && (
          <div role="alert" className="alert alert-error w-full max-w-xs py-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{alert.message}</span>
          </div>
        )}

        {success && (
          <div role="alert" className="alert alert-success w-full max-w-xs py-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Registro exitoso.</span>
          </div>
        )}

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
