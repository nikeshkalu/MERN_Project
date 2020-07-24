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



export default function UpdateProduct(props) {
  const classes = useStyles();
  const [name, setName] = useState(props.location.state.item.name);
  const [price, setPrice] = useState(props.location.state.item.price);
  const temp = "http://localhost:4000/" + props.location.state.item.productImage
  const [img, setImg] = useState(temp);
  const [file, setfile] = useState('');
  let history = useHistory();
  console.log(name)
    
  const onImageChange = (value) => {
      setImg(URL.createObjectURL(value));
  };
 
  const onSubmit=(e)=>{
    e.preventDefault();
    console.log(file)
    console.log(name)
    console.log(price)
    // const formDatas = new FormData();
    // formDatas.set('price',price)
    // formDatas.set('name',name)
    // formDatas.append('productImage',file)
    
    const formDatas = [
      {
      name : name,
      price : price
      // productImage:file
      }
      
    ];

    // console.log(formDatas.name)

    let config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        Accept: "application/json, text/plain, */*",
        'Content-Type': 'application/json'
      }
    }
    // console.log(formData)
    axios.patch('http://localhost:4000/products/'+props.location.state.item._id,formDatas,config)
    .then(function (response) {
      console.log('Product Updated');
      history.push("/myproducts");
  
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
          Update Product
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
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
            defaultValue={props.location.state.item.name}
            onChange={(event)=>setName(event.target.value)}
            // ref={register}
          />
          {/* {console.log(name)} */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="price"
            label="Price"
            id="price"
            autoComplete="current-price"
            defaultValue={props.location.state.item.price} 
            onChange={(event)=>setPrice(event.target.value)}
          />
          
          <div>
            <h1>Select Image</h1>
            <img src={img} height="300px" width="410px" alt="."/>
            <input type="file" name="myImage" onChange={(event)=>{
              setfile(event.target.files[0])
              onImageChange(event.target.files[0])
              }} />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Update Product
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
