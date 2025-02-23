import { useRef, useState } from 'react';
import './login.css'

const Login = () => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const emailRef = useRef<HTMLInputElement>(null);
    const senhaRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if(!emailRef.current) return;
        if(email != 'renatinho') {
            emailRef.current.style.border = '1px solid red';
            emailRef.current.focus();
            return;
        }
        if(senha != '1234'){
            if(!senhaRef.current) return;
            senhaRef.current.style.border = '1px solid red';
            senhaRef.current.focus();
        }
    }


    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!emailRef.current) return;
        //console.log(e.currentTarget.value);
        emailRef.current.style.border = '0px solid black';
        setEmail(emailRef.current.value);
    }

    const handleSenha = () => {
        if(!senhaRef.current) return;
        senhaRef.current.style.border = '0px solid black';
        setSenha(senhaRef.current.value);
    }

    return(
        
        <div className="body">
            <div className="container">
                <div className="header-container">
                    <h2>Faça Login</h2>
                </div>

                <div className="input-container">
                    <div className="input">
                        <p>Email</p>
                        <input ref={emailRef} onChange={handleEmail} type="email" name="" id="" />
                    </div>

                    <div className="input">
                        <p>Senha</p>
                        <input ref={senhaRef} onChange={handleSenha} type="email" name="" id="" />
                    </div>
                </div>

                <div className="bottom-container">
                    <button onClick={handleClick}>Entrar</button>
                </div>
            </div>
        </div>
    )
}

export default Login;