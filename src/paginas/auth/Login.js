import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import APIInvoke from '../../archivoAPI/APIInvoke.js'
import swal from 'sweetalert'

const Login = () => {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    email: '',
    password: ''
  });

  const { email, password } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario, [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    document.getElementById('email').focus();
  }, [])

  const iniciarSesion = async () => {
    if (password.length < 10) {
      const msg = 'La contraseña debe tener al menos 10 caracteres';
      swal({
        title: 'Error',
        text: msg,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'Ok',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      const msg = 'Por favor, introduzca un correo electrónico válido';
      swal({
        title: 'Error',
        text: msg,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'Ok',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      });
    } else {
      const data = {
        email: usuario.email,
        password: usuario.password
      }

      try {
        const response = await APIInvoke.invokePOST('/api/auth', data);
        const mensaje = response.msg

        if (mensaje === 'El usuario no existe') {
          const msg = 'El usuario no existe';
          swal({
            title: 'Error',
            text: msg,
            icon: 'error',
            buttons: {
              confirm: {
                text: 'Ok',
                value: true,
                visible: true,
                className: 'btn btn-danger',
                closeModal: true
              }
            }
          });
        } else if (mensaje === 'La contraseña no es valida') {
          const msg = 'La contraseña no es válida';
          swal({
            title: 'Error',
            text: msg,
            icon: 'error',
            buttons: {
              confirm: {
                text: 'Ok',
                value: true,
                visible: true,
                className: 'btn btn-danger',
                closeModal: true
              }
            }
          });
        } else {
          const msg = 'Inicio de sesión exitoso';
          swal({
            title: 'Éxito',
            text: msg,
            icon: 'success',
            buttons: {
              confirm: {
                text: 'Ok',
                value: true,
                visible: true,
                className: 'btn btn-success',
                closeModal: true
              }
            }
          });

          const jwt = response.token;

          //Se guarda el token
          localStorage.setItem('token', jwt);

          navigate('/Home')
        }
      } catch (error) {
        console.error(error);
        const msg = 'Hubo un error al iniciar sesión';
        swal({
          title: 'Error',
          text: msg,
          icon: 'error',
          buttons: {
            confirm: {
              text: 'Ok',
              value: true,
              visible: true,
              className: 'btn btn-danger',
              closeModal: true
            }
          }
        });
      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    iniciarSesion();
  }


  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <Link to={'#'}><b>Iniciar</b>Sesion</Link>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">
              Bienvenido, Puede loguearse
            </p>

            <form onSubmit={onSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id='email'
                  name='email'
                  value={email}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  id='password'
                  name='password'
                  value={password}
                  onChange={onChange}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>

              <div className="social-auth-links text-center mb-3">
                <button type='submit' className='btn btn-block btn-primary'>Ingresar</button>
                <Link to={'/Registro'} className='btn btn-block btn-danger'>Crear Cuenta</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
