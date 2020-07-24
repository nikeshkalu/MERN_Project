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



export default function Createproduct() {
  const classes = useStyles();
  const [name, setName] = useState('abc');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const [file, setfile] = useState('');
  let history = useHistory();

  const onImageChange = (value) => {
      setImg(URL.createObjectURL(value));
  };
 
  const onSubmit=(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('price',price)
    formData.append('name',name)
    formData.append('productImage',file)
    console.log(formData)
    let config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        Accept: "application/json, text/plain, */*",
        'Content-Type': 'application/json'
      }
    }
    axios.post('http://localhost:4000/products',formData,config)
    .then(function (response) {
      console.log('New Product Created');
      history.push("/myproducts");
  
    })
    .catch(function (error) {
      console.log(error);
    });
  
   
  }
 

  return (
      <div>
          <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          New Product
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
            autoComplete="name"
            autoFocus
            onChange={(event)=>setName(event.target.value)}
            // ref={register}
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
        {/* {console.log(file)} */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Create New Product
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
