import { BrowserRouter,Route, Routes } from 'react-router-dom'
import './App.css'
import LoginContainer from './containers/LoginContainer'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginContainer/>}/>
        
          <Route path='/dashboard' element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>}/>
        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
