import React from 'react';
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
// import DeleteIcon from '@material-ui/icons/Delete';
import Popup from "reactjs-popup";
import ProductDetail from '../Products/productDetai';
import {Link} from 'react-router-dom'

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
  const classes = useStyles();
  
  return (
    <div>
      {props.products.map((item,i) => (
                        <div key={i} className={classes.style}>
                          <Card className={classes.root}>
                            <CardActionArea>
                            <CardHeader
                                  avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                      {/* {item.name} */}
                                      <img src={`http://localhost:4000/${(item.productImage)}`} alt="productName" height="50" />
                                    </Avatar>
                                  }
                                  
                                  title={item.name}
                                  
                                />
 
                              <CardMedia
                                className={classes.media}
                                title={`${(item.name)}`}
                              >
                              <img src={`http://localhost:4000/${(item.productImage)}`} alt="products" height="300" style={{
                                padding: 20
                              }}/>
                                </CardMedia>
                              <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                 Price : {item.price}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <CardActions>
                            &nbsp;&nbsp;
                            <Popup trigger={
                               <Button variant="contained" color="primary">
                               Details
                             </Button>
                            } 
                            position="top left"
                            on="hover"
                            contentStyle={{ padding: "0px", border: "none", width:"400px",height:"500px" }}
                              arrow={false}>
                                   <div><ProductDetail id={item._id}/></div>
                          </Popup>
                           

                              <Button variant="contained"
                                color="primary">
                                   <Link to={{pathname: '/order', state : {item}}} style={{
                                   textDecoration : 'none',
                                   color : 'white'
                                 }}>
                                Order

                                 </Link>
                              </Button>

             
                              {/* <Button variant="contained" href="/myProducts" color="primary">
                                Create
                              </Button>

                              <Button
                                variant="contained"
                                color="secondary"
                                // className={classes.button}
                                startIcon={<DeleteIcon />}
                              >
                                Delete
                              </Button> */}
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