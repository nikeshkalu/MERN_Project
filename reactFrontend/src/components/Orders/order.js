import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
const axios = require('axios')



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function Order(props) {
  const classes = useStyles();
  const img = "http://localhost:4000/" + props.location.state.item.productImage
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);

 
  let history = useHistory();
    
  const onSubmit=(e)=>{
    e.preventDefault();
    
    const formDatas = {
      productId : props.location.state.item._id,
      quantity : quantity
      }
      
    let config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        Accept: "application/json, text/plain, */*",
        'Content-Type': 'application/json'
      }
    }

    axios.post('http://localhost:4000/orders/',formDatas,config)
    .then(function (response) {
      console.log('Product ordered');
      history.push("/myOrder");
  
    })
    .catch(function (error) {
      console.log(error);
    });
  
   
  }
 

  return (
      <div>
          {console.log(props.location.state)}

          <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Order Product
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
        <div>
            <img src={img} height="300px" width="410px" alt="."/>
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Product Name"
            name="name"
            type="text"
            autoComplete="name"
            autoFocus
            value={props.location.state.item.name}           
          />
          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="price"
            label="Price"
            id="price"
            autoComplete="current-price"
            value={props.location.state.item.price} 
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="quantity"
            label="Quantity"
            id="quantity"
            autoComplete="Total-Quantity"
            defaultValue={quantity} 
            onChange={(event)=>{
                setQuantity(event.target.value)
                setAmount(event.target.value*props.location.state.item.price)
            }}
          />

        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="amount"
            label="Total Amount"
            id="amount"
            autoComplete="Total-Amount"
            value={amount} 
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Order Product
          </Button>
          
        </form>
      </div>
    </Container>
    
    <br/>
    <br/>
    <br/>

    <hr/>

</div>
    
    
  );
}
