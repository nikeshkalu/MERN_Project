import React,{Component} from 'react'
import axios from 'axios'
import MyProducts from './myProduct';
import CreateProduct from './createProduct';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = { 
           
             products : []
        };
        this.UNSAFE_componentWillMount = this.UNSAFE_componentWillMount.bind(this);
      }

    UNSAFE_componentWillMount () {
      let config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          Accept: "application/json, text/plain, */*",
          'Content-Type': 'application/json'
        }
      }

     axios.get('http://localhost:4000/products/myProducts',config)
                  .then(response=> {
                    console.log(response.data)
                    this.setState({
                        products : response.data
                    })
                
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
    }

    render(){
        return(
            <div>
                <CreateProduct/>
               <MyProducts products={ this.state.products}/>               
            </div>
        )
    }
}

export default Home