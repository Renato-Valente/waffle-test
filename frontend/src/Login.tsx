//import React from "react";
import ReactDOM from "react-dom/client";
import loading_icon from '../public/loading.svg'

import { useEffect, useRef, useState } from 'react';
import './login.css'

const Login = () => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    const emailRef = useRef<HTMLInputElement>(null);
    const senhaRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(!emailRef.current || !senhaRef.current) return;
        setEmail(emailRef.current.value);
        setSenha(senhaRef.current.value);
    })
    

    const handleClick = async() => {
        if(!emailRef.current || !senhaRef.current) return;
        setLoading(true);
        emailRef.current.style.border = '0px solid black';
        senhaRef.current.style.border = '0px solid black';
        
        fetch('https://waffle-test.onrender.com/users',{signal: AbortSignal.timeout(10000)}).then((response) => {
            if(!response.ok){
                setLoading(false);
                return;
            }
            return response.json()
        }).then((list) => {
            const user = list.find((item:{email:string, senha:string}) => {
                return item.email == email;
            })
    
            if(!emailRef.current || !senhaRef.current) {
                setLoading(false);
                return;
            }

            if(!user) {
                emailRef.current.style.border = '1px solid red';
                emailRef.current.focus();
                setLoading(false);
                return;
            }
            if(senha != user.senha){
                senhaRef.current.style.border = '1px solid red';
                senhaRef.current.focus();
                setLoading(false);
                return;
            }

            sessionStorage.setItem('waffle_email', email);
            window.location.href = window.location.href.slice(0, -5);

        }).catch(() => {
            console.log('erro ao conectar com o banco');
            setLoading(false);
            return;
        })

    }

    const handleEmail = () => {
        if(!emailRef.current || !senhaRef.current) return;
        //console.log(e.currentTarget.value);
        emailRef.current.style.border = '0px solid black';
        senhaRef.current.style.border = '0px solid black';
        setEmail(emailRef.current.value);
    }

    const handleSenha = () => {
        if(!senhaRef.current || !emailRef.current) return;
        senhaRef.current.style.border = '0px solid black';
        emailRef.current.style.border = '0px solid black';
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
                        <input ref={senhaRef} onChange={handleSenha} type="password" name="" />
                    </div>
                </div>

                <div className="bottom-container">
                    <button onClick={handleClick}>Entrar</button>
                </div>
            </div>
            <div style={{display: loading ? 'flex' : 'none'}} className="loading-container">
                <div className="loading">
                    <img src={loading_icon} />
                    <p>Carregando...</p>
                </div>
            </div>
        </div>
    )
}

export default Login;

ReactDOM.createRoot(document.getElementById("root")!).render(<Login />);
