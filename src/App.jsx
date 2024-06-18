import './App.css'
import {Routes,Route} from 'react-router-dom'
import { UserProvider } from './context/UserProvider';
import Login from './components/Login-Page/Login'
import { AllArticles } from './components/View-All-Articles/AllArticles';
import { ArticleId } from './components/View-ArticleI-By-d/ArticleId';
import { Header } from './components/Header';

function App() {
  return (
      <UserProvider>
        <Header/>
        <Routes>
            <Route index element={<Login/>} />
              {/* CREATE /HOME PAGE HERE WITH ARTICLES WITH MOST COMMENTS/VOTES */}
            <Route path="/articles" element={<AllArticles/>} />
            <Route path="/articles/:article_id" element={<ArticleId/>} />
        </Routes>
      </UserProvider>
  )
}
export default App