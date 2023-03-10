import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActionFunctionArgs, Form, Link, redirect, useLocation, useNavigate, useSubmit } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext';
import { getTokenData } from '../../util/auth';
import { requestBackendLogin } from '../../util/request';
import { saveAuthData } from '../../util/storage';
import './styles.css';

type FormData = {
  username: string,
  password: string,
  from: string
}

const LoginForm = () => {

  const { setAuthContextData } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [ wasSubmited, setWasSubmited ] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const from = state ? state.from : '/animes';


  const onSubmit = (formData: FormData) => {
     console.log(formData);
     requestBackendLogin(formData)
        .then((response) => {
          saveAuthData(response.data);
          setAuthContextData({
            authenticated: true,
            tokenData: getTokenData()
          });
          toast.success('Login with success');
          navigate(from, {
            replace: true
          });
        })
        .catch((e) => {
          console.log(e);
          toast.error('Error in login');
        })
  }

  return (
    <div className="container py-3" id="login-form-container">
      <div className="row">
        <div className="col-12 mb-5">
          <h1>Faça o seu login</h1>
        </div>
        <form method='post' onSubmit={handleSubmit(onSubmit)} id="login-form">
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="username">Email</label>
            <input
              { ...register("username", {
                required: 'Campo obrigatório',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email inválido'
                }

              }) }
              type="email"
              name="username"
              id="username"
              className={`form-control ${ errors.username ? 'is-invalid' : wasSubmited ? 'is-valid' : ''}`}
              placeholder="exemplo@gmail.com"></input>
            <div className="invalid-feedback">
              { errors.username?.message }
            </div>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="password">Senha</label>
            <input
              { ...register("password", {
                required: 'Campo obrgatório',
                minLength: {
                  value: 6,
                  message: 'Senha deve possuir pelo menos 6 caracteres'
                }
              }) }
              type="password"
              name="password"
              id="password"
              className={`form-control ${ errors.password ? 'is-invalid' : wasSubmited ? 'is-valid' : ''}`}
            ></input>
            <div className="invalid-feedback">
              { errors.password?.message }
            </div>
          </div>
          <div className="d-none">
            <input
              { ...register('from') }
              type="text"
              id="from"
              name="from"
              className="form-control"
              defaultValue={from}
            />
          </div>
          <div className="col-12 mb-3">
            <button
              onClick={() => setWasSubmited(true)}
              type="submit" className="btn btn-primary">Entrar</button>
          </div>
          <p>Doesn't have an account? <Link to="/auth">Click here</Link></p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
