import './App.css'
import {Routes,Route} from 'react-router-dom'
import { UserProvider } from './context/UserProvider';
import Login from './components/Login-Page/Login'
import { AllArticles } from './components/View-All-Articles/AllArticles';

function App() {
  return (
      <UserProvider>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          
          <Route exact path="/articles" element={<AllArticles/>} />
        </Routes>
      </UserProvider>
  )
}
export default App