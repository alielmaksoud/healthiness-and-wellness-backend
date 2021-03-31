import React from 'react'
import Sidebar from './Components/Sidebar/sidebar.js'
import items from './Components/Sidebar/SidebarData.js'
import Navbar from './Components/Navbar/Navbar.js'
import useVisible from './Service/useVisible'
import Protection from './loginPages/Protection';

import NewAdmin from './Pages/Admins/NewAdmin.js';
import ManageAdmin from './Pages/Admins/ManageAdmin';

import ManageUser from './Pages/Users/ManageUser';

import ManageBlog from './Pages/Blog/ManageBlog';
import NewBlog from './Pages/Blog/NewBlog';

import ManageProgram from './Pages/Program/ManageProgram';
import NewProgram from './Pages/Program/NewProgram';

import ManageClass from './Pages/Class/ManageClass';
import NewClass from './Pages/Class/NewClass';

import ManageEvent from './Pages/Event/ManageEvent';
import NewEvent from './Pages/Event/NewEvent';

import ManageTestimonial from "./Pages/Testimonials/ManageTestimonial";
import NewTestimonial from "./Pages/Testimonials/NewTestimonial";

import ManageMessages from "./Pages/Messages/ManageMessages";

import ManageCategory from './Pages/Categories/ManageCategory';
import NewCategory from './Pages/Categories/NewCategory';


import HomeDash from './Pages/HomeDash';


import { 
  BrowserRouter as
   Router,
  Route,
   Switch }
from 'react-router-dom';


function Dashboard() {
  const { ref, ref2, isVisible, setIsVisible } = useVisible(false);
  
    
    const CheckSidebar = () => {
        setIsVisible(!isVisible);
    };



  return (
    <>
    <Router>

      <Navbar items={items} CheckSidebar={CheckSidebar}  isVisible={isVisible} forwardedRef={ref2}/>
      <Sidebar items={items}  CheckSidebar={CheckSidebar} forwardedRef={ref}
                isVisible={isVisible}/>
      <Switch>
      <Protection>
        <Route path='/admin/NewAdmin'>
            <NewAdmin />
        </Route>
        <Route path='/admin/ManageAdmin'>
            <ManageAdmin />
        </Route>

        <Route path='/admin/ManageUser'>
            <ManageUser />
        </Route>

        <Route path='/admin/ManageBlog'>
            <ManageBlog />
        </Route>
        <Route path='/admin/NewBlog'>
            <NewBlog />
        </Route>

        <Route path='/admin/ManageClass'>
            <ManageClass />
        </Route>
        <Route path='/admin/NewClass'>
            <NewClass />
        </Route>

       <Route path='/admin/ManageProgram'>
            <ManageProgram />
        </Route>
        <Route path='/admin/NewProgram'>
            <NewProgram />
        </Route>

        <Route path='/admin/ManageEvent'>
            <ManageEvent />
        </Route>
        <Route path='/admin/NewEvent'>
            <NewEvent />
        </Route>
       
        <Route path='/admin/ManageMessages'>
            <ManageMessages/>
        </Route>

        <Route path='/admin/NewCategory'>
            <NewCategory />
        </Route>
        <Route path='/admin/ManageCategory'>
            <ManageCategory />
        </Route>

        <Route path='/admin/ManageTestimonials'>
            <ManageTestimonial/>
        </Route>
        <Route path='/admin/NewTestimonials'>
            <NewTestimonial/>
        </Route>

        <Route path='/admin/HomeDash'>
            <HomeDash/>
        </Route>

         </Protection>
      </Switch>
    </Router>
  
    </>
  )
}

export default Dashboard;

