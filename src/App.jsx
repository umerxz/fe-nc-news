import './App.css'
import {Routes,Route} from 'react-router-dom'
import { UserProvider } from './context/UserProvider';
import About from './components/About-Page/About'
import { AllArticles } from './components/View-All-Articles/AllArticles';
import { ArticleId } from './components/View-ArticleI-By-d/ArticleId';
import { Header } from './components/Header';
import { LandingPage } from './components/Landing-Page/LandingPage';
import Login from './components/Login'
import Signup from './components/Signup'
import { useState } from 'react';
import { Profile } from './components/Profile';
import { MyArticles } from './components/MyArticles';

function App() {
    const [accountCreated,setAccountCreated] = useState(false)
  return (
      <UserProvider>
        <Header/>
        <Routes>
          <Route index element={<LandingPage/>} />
            {/* CREATE /HOME PAGE HERE WITH ARTICLES WITH MOST COMMENTS/VOTES */}
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login accountCreated={accountCreated}/>} />
          <Route path="/signup" element={<Signup setAccountCreated={setAccountCreated} />} />
          <Route path="/profile/:username" element={<Profile/>} />
          <Route path="/articles" element={<AllArticles/>} />
          <Route path="/my-articles" element={<MyArticles />} />
          <Route path="/topics/:topic" element={<AllArticles/>} />
          <Route path="/articles/:article_id" element={<ArticleId/>} />
        </Routes>
      </UserProvider>
  )
}
export default App