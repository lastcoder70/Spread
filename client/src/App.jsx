import React from "react";
import {BrowserRouter,Route,Routes} from 'react-router-dom'

import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/dashboard'
import Homepage from "./pages/homePage";
import Admin from './pages/admin'
import Repot from "./report"
const App =()=>{
    return (
<>
<BrowserRouter>
<Routes>
<Route path='/' exact Component={Homepage}/>
  <Route path='/login' exact Component={Login}/>
  <Route path='/register' exact Component={Register}/>
  <Route path='/dashboard' exact Component={Homepage}/>
  <Route path='/admin' exact Component={Admin}/>
  {/* <Route path='/upload' exact Component={Admin}/> */}
  <Route path='/report' exact Component={Repot}/>
  
  </Routes>
</BrowserRouter>

</>
    );
    
}
export default App;


