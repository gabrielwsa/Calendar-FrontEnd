import { useEffect, useState, useCallback } from 'react';
import './LoginPage.css';
import { useForm } from '../../hooks';
import { useAuthStore } from '../../hooks/useAuthStore';
import Swal from 'sweetalert2';

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

export const LoginPage = () => {

    const [showRegister, setShowRegister] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [formKey, setFormKey] = useState(0);
    
    const { startLogin, errorMessage, startRegister } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields);

    const loginSubmit = useCallback((event) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });
    }, [loginEmail, loginPassword, startLogin]);

    const registerSubmit = useCallback((event) => {
        event.preventDefault();
        if (registerPassword !== registerPassword2) {
            Swal.fire('Erro na autenticação', 'As senhas não coincidem', 'error');
            return;
        }
        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }, [registerName, registerEmail, registerPassword, registerPassword2, startRegister]);

    const toggleRegisterForm = useCallback(() => {
        if (isAnimating) return;
        
        setIsAnimating(true);
        
        // Fade out atual
        setTimeout(() => {
            setShowRegister(prev => !prev);
            setFormKey(prev => prev + 1);
            setIsAnimating(false);
        }, 300);
    }, [isAnimating]);

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Erro na autenticação', errorMessage, 'error');
        }
    }, [errorMessage]);

    // Memoize os elementos de formulário para evitar re-renders desnecessários
    const loginForm = (
        <div 
            key={formKey}
            className="col-md-8 col-lg-6 login-form-1 fade-in" 
            style={{ 
                opacity: isAnimating ? 0 : 1, 
                transition: 'opacity 0.3s' 
            }}
        >
            <h3>Acesso</h3>
            <form onSubmit={loginSubmit}>
                <div className="form-group mb-2">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Email" 
                        name="loginEmail" 
                        value={loginEmail} 
                        onChange={onLoginInputChange}
                        autoComplete="email" 
                    /> 
                </div>
                <div className="form-group mb-2">
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Senha" 
                        name="loginPassword" 
                        value={loginPassword} 
                        onChange={onLoginInputChange}
                        autoComplete="current-password" 
                    />
                </div>
                <div className="form-group mb-3">
                    <button type="submit" className="btnSubmit">
                        Entrar
                    </button>
                </div>
                <div className="form-group mb-0 text-center">
                    <p className="mb-2">Não tem uma conta?</p>
                    <button 
                        type="button" 
                        className="btn btn-outline-primary"
                        onClick={toggleRegisterForm}
                        disabled={isAnimating}
                    >
                        Criar conta
                    </button>
                </div>
            </form>
        </div>
    );

    const registerForm = (
        <div 
            key={formKey}
            className="col-md-8 col-lg-6 login-form-2 fade-in" 
            style={{ 
                opacity: isAnimating ? 0 : 1, 
                transition: 'opacity 0.3s' 
            }}
        >
            <h3>Registro</h3>
            <form onSubmit={registerSubmit}>
                <div className="form-group mb-2">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nome" 
                        name="registerName" 
                        value={registerName} 
                        onChange={onRegisterInputChange} 
                        autoComplete="name"
                    />
                </div>
                <div className="form-group mb-2">
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Email" 
                        name="registerEmail" 
                        value={registerEmail} 
                        onChange={onRegisterInputChange}
                        autoComplete="email" 
                    />
                </div>
                <div className="form-group mb-2">
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Senha" 
                        name="registerPassword" 
                        value={registerPassword} 
                        onChange={onRegisterInputChange}
                        autoComplete="new-password" 
                    />
                </div>

                <div className="form-group mb-2">
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Confirme a senha" 
                        name="registerPassword2" 
                        value={registerPassword2} 
                        onChange={onRegisterInputChange}
                        autoComplete="new-password" 
                    />
                </div>

                <div className="form-group mb-3">
                    <button type="submit" className="btnSubmit">
                        Criar conta
                    </button>
                </div>
                <div className="form-group mb-0 text-center">
                    <p className="mb-2">Já tem uma conta?</p>
                    <button 
                        type="button" 
                        className="btn btn-outline-light"
                        onClick={toggleRegisterForm}
                        disabled={isAnimating}
                    >
                        Fazer login
                    </button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="container login-container">
            <div className="row justify-content-center">
                {!showRegister ? loginForm : registerForm}
            </div>
        </div>
    )
}