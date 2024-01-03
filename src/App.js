import './App.css';

import React,{useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =(props)=> {

  const apiKey=process.env.REACT_APP_NEWS_API

  const [progress,setProgress]=useState(0)

    return (
      <BrowserRouter>  
      <div>
        <Navbar/>

        <LoadingBar
        color='#f11946'
        height={2}
        progress={progress}
        
      />

      <Routes>
          <Route path='/' element={<News  setProgress={setProgress} apiKey={apiKey} key="general" country="in" category="general" />} />
          <Route path='/business' element={<News  setProgress={setProgress} apiKey={apiKey} key="business" country="in" category="business" />} />
          <Route path='/entertainment' element={<News  setProgress={setProgress} apiKey={apiKey} key="entertainment" country="in" category="entertainment" />} />
          <Route path='/health' element={<News  setProgress={setProgress} apiKey={apiKey} key="health" country="in" category="health" />} />
          <Route path='/science' element={<News  setProgress={setProgress} apiKey={apiKey} key="science" country="in" category="science" />} />
          <Route path='/sports' element={<News  setProgress={setProgress} apiKey={apiKey} key="sports" country="in" category="sports" />} />
          <Route path='/technology' element={<News  setProgress={setProgress} apiKey={apiKey} key="technology" country="in" category="technology" />} />
      </Routes>
      </div>
      </BrowserRouter>
    )
  
}

export default App