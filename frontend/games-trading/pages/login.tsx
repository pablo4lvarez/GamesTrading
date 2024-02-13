import '../app/globals.css'
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

const Login = () => {

  const router = useRouter();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [alert, setAlert] = useState({
    show: false,
    message: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const checkEmptyFields = () => {
    const emptyFields = Object.values(loginData).some(value => !value);
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

  const handleLogin = async () => {
    const emptyData = checkEmptyFields();
  
    if (!emptyData) {
      try {
        const response = await signIn('credentials', {
          email: loginData.email,
          password: loginData.password,
          redirect: false,
        });

        console.log('Login response:', response);

        // Check if there is an error
        if (response?.error) {
          // Handle error, show alert, etc.
          if (response.status === 401) {
            setAlert({
              show: true,
              message: 'Credenciales incorrectas.',
            });
          }
        } else {
          // Successful login
          console.log('Successful login:', response);
          router.push('/');
        }
      } catch (error) {
        console.error('Login error:', error);
        setAlert({
          show: true,
          message: 'Ocurrió un error al iniciar sesión. Por favor, intenta nuevamente.',
        });
      }
    }
  };


  return (
    <div className='flex items-center justify-center bg-base-primary min-h-screen min-w-screen flex-col'>
      <div className="bg-base-300 w-full md:w-2/3 lg:w-1/3 p-8 rounded-lg flex flex-col items-center justify-center">
        <h2 className='text-2xl py-4'>¡Bienvenido de vuelta!</h2>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">📧 Email:</span>
          </label>
          <input type="text" placeholder="Type here" name='email' value={loginData.email} onChange={handleChange} className="input input-bordered input-primary w-full max-w-xs" required={true} />
        </div>
        <div className="form-control w-full max-w-xs py-4">
          <label className="label">
            <span className="label-text">🔑 Password:</span>
          </label>
          <input type="password" placeholder="Type here" name='password' value={loginData.password} onChange={handleChange} className="input input-bordered input-primary w-full max-w-xs" required={true} />
        </div>
        <p className='underline underline-offset-2 text-sm py-0.5 self-end pr-4 md:pr-14'>Olvidé mi contraseña</p>
        <button className="btn btn-primary btn-xs sm:btn-sm md:btn-md lg:btn-lg my-4 md:my-6" onClick={handleLogin}>
          Login
        </button>

        {alert.show && (
          <div role="alert" className="alert alert-error w-full max-w-xs py-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{alert.message}</span>
          </div>
        )}

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