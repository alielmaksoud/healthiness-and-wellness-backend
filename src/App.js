import React, {  Fragment} from 'react';
import { Switch, Route } from 'react-router-dom';


// COMPONENTS
import Layout from './layout/Layout';
import Contact from './components/Contact/Contact';
import Blog from './components/BlogSection/Blog';
import Program from './components/ProgramSection/Program';
import About from './components/About/About';
import Event from './components/EventSection/Event';
import Home from './components/Home/Home';

////// user
import Profile from './components/Profile/Profile';
import Signin from './components/Signin/Signin';
import Signup from './components/Signin/Signup';
import Protections from './components/Signin/Protections';



// admin
import Protection from './Dashboard/loginPages/Protection';
import Dashboard from './Dashboard/Dashboard';
import Login from './Dashboard/loginPages/login.js';
import Payment from './components/Payment/Payment';




function App() {

  
    return (
      <Fragment>
        <Switch>
            <Protection path="/admin" >
                <Dashboard  />
            </Protection>
                <Route  path='/health-admin'>
                  <Login />
                </Route>
          <Layout>
            <Route path="/about" component={About} />
            <Route path="/blog" component={Blog} />
            <Route path="/program" component={Program} />
            <Route path="/event" component={Event} />
            <Route path="/contact" component={Contact} />
            <Route path="/signup" component={Signup} />
            <Route path="/payment" component={Payment} />

            <Protections path="/profile" >
                <Profile />
            </Protections>
              <Route  path='/signin'>
                  <Signin />
              </Route>

            <Route path="/" exact component={Home} />
          </Layout>
        </Switch>
         
        
      </Fragment>
    );
  }


export default App;


