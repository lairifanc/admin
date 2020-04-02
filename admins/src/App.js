import React from 'react';
import Longin from './pages/Longin/Longin'
import Admin from './pages/Admin/Admin'
import Goods from './pages/Goods/Goods'
import AdminSte from './pages/AdminSte/AdminSte'
import Administartor from './pages/Administartor/Administartor'
import Audit from './pages/Audit/AuditList/Audit'
import auditAdd from './pages/Audit/AuditAdd/index'
import auditUpdate from './pages/Audit/Auditupdate/index'
import Home from './pages/Home/Home'
import Slideshow from './pages/Slideshow/Slideshow'
import SlideAdd from '@pages/Slideshow/SlideAdd'
import SlideUpdate from '@pages/Slideshow/SlideUpdate'
import {HashRouter,Route,Redirect,Switch} from 'react-router-dom'

function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Redirect exact  from='/' to='/longin'></Redirect>
          <Route path='/longin' component={Longin}></Route>
          <Route path='/admin' component={()=>{
            return (
              <Admin>
                <Route path='/admin/goodsadd' component={Goods}></Route>
                <Route path='/admin/home' component={Home}></Route>
                <Route path='/admin/administartor' component={Administartor}></Route>
                <Route path='/admin/slideshow' component={Slideshow}></Route>
                <Route path='/admin/slideadd' component={SlideAdd}></Route>
                <Route path='/admin/slideupdate/:id' component={SlideUpdate}></Route>
                <Route path='/admin/audit' component={Audit}></Route>
                <Route path='/admin/auditAdd' component={auditAdd}></Route>
                <Route path='/admin/auditUpdate/:id' component={auditUpdate}></Route>
                <Route path='/admin/set' component={AdminSte}></Route>
              </Admin>
            )
            
          }}></Route>
        </Switch> 
      </HashRouter>
    </div>
  );
}

export default App;
