import React,{Component} from 'react'
import axios from 'axios'
import MainHome from '../MainHome/mainHome'

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = { 
           
             products : []
        };

        this.UNSAFE_componentWillMount = this.UNSAFE_componentWillMount.bind(this);
      
      }

    UNSAFE_componentWillMount () {
        axios.get('http://localhost:4000/products')
                  .then(response=> {
                    // console.log('Login Succesful');
                    console.log(response.data.products)
                    this.setState({
                        products : response.data.products
                    })
                
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
    }

    render(){
        return(
            <div>
               
                <MainHome products={ this.state.products}/>
                {/* {this.state.products} */}
                
            </div>
        )
    }
}

export default Home