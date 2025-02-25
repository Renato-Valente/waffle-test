import './App.css'
import fire from '../public/fire.svg'
import logo from '../public/logo.avif'
import { useEffect, useRef, useState } from 'react'

const Main = () => {

  const [streak, setStreak] = useState(0);

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
      const email = sessionStorage.getItem('waffle_email');
      if(!email) {
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
        setLoading(false);
        if(news) {
          //console.log('news', news);
          //extraindo o valor das datas
          const dates: Date[] = [];
          for(const item of news){
            dates.push(new Date(item.data));
          }
          //organizar as datas em orderm crescente
          for(let i = 0; i < dates.length; i++){
            for(let j = i; j < dates.length; j++){
              if(i == j) continue;
              if(dates[i] > dates[j]) {
                const temp = dates[i];
                dates[i] = dates[j];
                dates[j] = temp;
              }
            }
          }
          //calculando o valor de streak
          let count = news.length > 0 ? 1 : 0;
          for(let i = 0; i < dates.length - 1; i++){
            if(dates[i] == dates[i+1]) continue;
            const diff = dates[i+1].getTime() - dates[i].getTime(); //diferença em milisegundos
            const days = diff / (1000 * 60 * 60 * 24); //diferença em dias
            //mesmo dia
            if(days == 0) continue;
            if(days != 1) {
              count = 1;
              continue;
            } 
            count++;
          }
          setStreak(count);
          return;
        }
        setNews(data);
      }).catch(() => {
        sair();
        return;
      })
      
    })()

  },[news]);

  return(
    <div className="body">
      <div className="container">
        <div className="header">
          <div className="streak">
            <img src={fire} />
            <p>Streak {streak}</p>
          </div>
          <button onClick={sair}>Sair</button>
        </div>

        <div className="content">
          <h4>Últimas Leituras</h4>
          {news && news.length > 0 ? 
            <div>
              {(() => {
                //organizando os itens de news por data
                const list = [...news];

                for(let i = 0; i < list.length; i++){
                  for(let j = i; j < list.length; j++){
                    if(new Date(list[i].data) > new Date(list[j].data)){
                      const temp = list[i];
                      list[i] = list[j];
                      list[j] = temp;
                    }
                  }
                }
                
                return list;
              })().reverse().map((item, index) => {
            return <div className='cell' key={index}>
              <div className="title">{item.titulo.length > 27 ? `${item.titulo.slice(0, 23)}...` : item.titulo}</div>
              <div className="date">{item.data}</div>
            </div>
          })}
            </div>
          :
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
      <div ref={blockerRef} style={{display: loading ? 'flex' : 'none'}} className="blocker">
          <img src={logo} />
      </div>
    </div>
  )
}

export default Main;