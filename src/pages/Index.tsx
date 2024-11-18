import Login from './Index'
import logo from '../assets/logo-1.png'

function Index() {
  return (
    <div className="flex w-full h-screen">
    <div className="w-full flex items-center justify-center lg:w-2/3">
      <Login />
    </div>
    <div className="hidden shadow-sm relative lg:flex h-full w-1/3 items-center justify-center bg-white">
      {/* <div className="w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full" /> */}
      {/* <div className="w-full h-1/2 bg-white/10 backdrop-blur-lg" /> */}
      {/* <div className="w-full h-1/2 bg-white/10 backdrop-blur-lg"/> */}
      <img src={logo} alt="Logo" />
    </div>
  </div>
  )
}

export default Index
