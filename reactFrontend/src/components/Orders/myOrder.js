import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { green } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

// import Popup from "reactjs-popup";
// import ProductDetail from '../Products/productDetai';
// import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  style:{
    padding: 30,
    float: "left"
    
  },
  root: {
    maxWidth: 425,
  },
  media: {
    height: 330,
  },
  avatar: {
    backgroundColor: green[600],
    width: 45
  }
});



const MainHome = (props) => {
 let history = useHistory();

  const classes = useStyles();
  const [orders, setOrders] = useState([]);

  const deleteOrder = (id) =>{
    console.log(id)
    let config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          Accept: "application/json, text/plain, */*",
          'Content-Type': 'application/json'
        }
      }


     axios.delete('http://localhost:4000/orders/' + id,config)
                  .then(response=> {
                  history.push("/myOrder");
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
  }

  useEffect(()=>{
    let config = {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          Accept: "application/json, text/plain, */*",
          'Content-Type': 'application/json'
        }
      }

      axios.get('http://localhost:4000/orders',config)
      .then(response=> {
        // console.log('Login Succesful');
        console.log(response.data.orders)
        setOrders(response.data.orders)
        
    
      })
      .catch(function (error) {
        console.log(error);
      });


  },[])
  




                  
  
  return (
  <div>
      {orders.map((item,i) => (
                        <div key={i} className={classes.style}>
                          <Card className={classes.root}>
                            <CardActionArea>
                            <CardHeader
                                  avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                      {/* {item.name} */}
                                      <img src={`http://localhost:4000/${(item.productId.productImage)}`} alt="productName" height="50" />
                                    </Avatar>
                                  }
                                  
                                  title={item.productId.name}
                                  
                                />
 
                              <CardMedia
                                className={classes.media}
                                title={`${(item.productId.name)}`}
                              >
                              <img src={`http://localhost:4000/${(item.productId.productImage)}`} alt="products" height="300" style={{
                                padding: 20
                              }}/>
                                </CardMedia>
                              <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                 Price : {item.productId.price}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                 Quantity : {item.quantity}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                 Amount : {item.quantity*item.productId.price}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <CardActions>
                            &nbsp;&nbsp;
                        
            
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={()=>deleteOrder(item._id)}
                                startIcon={<DeleteIcon />}
                              >
                                Cancel Order
                              </Button>
                            </CardActions>
                          </Card>
                          <br/>
                          <br/>
                          
                        </div>             
                ))}
                 
      
    </div>
    
  );
}

export default MainHome