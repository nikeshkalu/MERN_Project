import React,{Component} from 'react'
import axios from 'axios'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';

class ProductDetail extends Component{
    
    constructor(props) {
        super(props);
        this.state = { 
           
             products : []
        };


        
      }

    UNSAFE_componentWillMount () {
        const id = this.props.id
        axios.get('http://localhost:4000/products/'+id)
                  .then(response=> {
                    console.log(response.data.product)
                    this.setState({
                        products : response.data.product
                    })
                  })
                  .catch(function (error) {
                    console.log(error);
                  });


    }
     
    

    render(){
        
        return(     
                        <div >
                          <Card >
                            <CardActionArea>
                            <CardHeader
                                  avatar={
                                    <Avatar aria-label="recipe" >
                                      <img src={`http://localhost:4000/${(this.state.products.productImage)}`} alt="productName" height="50" />
                                    </Avatar>
                                  }
                                  
                                  title={this.state.products.name}
                                  
                                />
 
                        
                              <CardMedia
                                title={`${(this.state.products.name)}`}
                              >
                              <img src={`http://localhost:4000/${(this.state.products.productImage)}`} alt="products" height="300" style={{
                                padding: 20
                              }}/>
                                </CardMedia>
                              <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                 Price : {this.state.products.price}
                                 <br/>

                                 This is {this.state.products.name} whose price is {this.state.products.price} per piece
                                  <br/>
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <CardActions>
                            &nbsp;&nbsp;
                           

                              <Button variant="contained" color="primary">
                                Order
                              </Button>
                              
                              
                             

                              <Button
                                variant="contained"
                                color="secondary"
                                // className={classes.button}
                                startIcon={<DeleteIcon />}
                              >
                                Delete
                              </Button>
                            </CardActions>
                          </Card>
                          <br/>
                          <br/>
                        
                        </div>             
               
        
    
           
        )
    }
}

export default ProductDetail
