import './app.css'
import fire from '../public/fire.svg'
import { useEffect, useRef, useState } from 'react'

const Main = () => {

  const sair = () => {
    
    if(window.location.href.includes('login')) return;
    sessionStorage.removeItem('waffle_email');
    window.location.href = `${window.location.href}login`; 
  }

  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<{
    email:string,
    id:string, titulo:string, data:string
  }[]>();

  const blockerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
    (async() => {
      console.log('ain, ')
      const email = sessionStorage.getItem('waffle_email');
      if(!email) {
        console.log('saindo');
        sair();
        return;
      }

      fetch(`https://waffle-test.onrender.com/?email=${email}`, {signal: AbortSignal.timeout(10000)}).then((response) => {
        if(!response.ok) {
          sair();
          return;
        }
        return response.json()
      }).then((data) => {
        console.log('chegamos')
        setLoading(false);
        setNews(data);
      }).catch(() => {
        sair();
        return;
      })
      
    })()

  },[]);

  return(
    <div className="body">
      <div className="container">
        <div className="header">
          <div className="streak">
            <img src={fire} />
            <p>Streak 5</p>
          </div>
          <button onClick={sair}>Sair</button>
        </div>

        <div className="content">
          <h4>Últimas Leituras</h4>
          {news && news.length > 0 ? news.map((item, index) => {
            return <p key={index}>{item.titulo}</p>
          }) :
            <div style={{
              height: '300px',
              width: '100%',
              display:'flex',
              justifyContent:'center',
              alignItems: 'center',
              //backgroundColor:'red'
            }}>
              <p>Nenhuma Leitura</p>
            </div>
          }
        </div>
      </div>
      <div ref={blockerRef} style={{display: loading ? 'block' : 'none'}} className="blocker"></div>
    </div>
  )
}

export default Main;