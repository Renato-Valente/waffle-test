import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const [data, setData] = useState<{text:string}>();

  useEffect(() => {
    fetch('http://localhost:5000/').then((res) => res.json()).then((data) => setData(data));
  }, [])
  
  if(!data) return;
  return(
    <h1>{data.text}</h1>
  )
}

export default App
