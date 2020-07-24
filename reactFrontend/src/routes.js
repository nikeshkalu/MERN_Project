import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import Layout from './layout/layout'
import Home from './components/Home/home'
import SignUp from './components/SignUp/signUp';
import Login from './components/SignIn/login'
import Order from './components/Orders/order';
import Products from './components/Products/products';
import UpdateProduct from './components/Products/updateProduct';
import myOrder from './components/Orders/myOrder';


class Routes extends Component {
    render(){
        return(
            // <Layout>
                <Switch>
                     <Route path="/" exact component={Login}></Route>
                     <Route path="/signUp" exact component={SignUp}></Route>
                     <Layout>
                     <Route path="/home" exact component={Home}></Route>
                     <Route path="/order" exact component={Order}></Route>
                     <Route path="/myOrder" exact component={myOrder}></Route>
                     <Route path="/myProducts" exact component={Products}></Route>
                     <Route path="/update" exact component={UpdateProduct}></Route>


                     </Layout>
                     
                </Switch>
            // </Layout>
        )
        
    }
}

export default Routes
