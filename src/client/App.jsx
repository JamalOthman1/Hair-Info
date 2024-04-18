
import {Routes, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Login from './components/Login';
import NavBar from './components/navbar'
import HomePage from './components/HomePage'
import AllItems from './components/AllItems'
import SingleItem from './components/SingleItem'
import SignUp from './components/SignUp'
import Account from './components/Account'
import lotus from './assets/lotus-logo.png'


import './style.css'
import './single-items.css'

function App() {
 const [token, setToken] = useState('')
console.log('token', token)
 useEffect(() => {
  const loginToken = localStorage.getItem('token')
  if (loginToken)
  setToken(loginToken)
 }, [])

  return (<>
    <div className='navbar'>
      <h1><a className='siteName' href='/'>Hair Haven</a></h1>
      <header>
        <img className='lotus' src={lotus}/>
    </header>
      <div>
      <NavBar />
      </div>
      </div>
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/account' element={<Account token={token} />} />
    <Route path='/login' element={<Login setToken={setToken} />} />
    <Route path='/items' element={<AllItems/>} />
    <Route path ='/items/:id' element={<SingleItem token={token}/>} />
    <Route path ='/login/register' element={<SignUp/>} />
    </Routes>
    
    </>
  );
}

export default App;
