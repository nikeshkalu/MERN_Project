import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom';


const DeleteProduct = (props) =>{
 
      let history = useHistory();

        console.log(props.id)
        let config = {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            Accept: "application/json, text/plain, */*",
            'Content-Type': 'application/json'
          }
        }

  
       axios.delete('http://localhost:4000/products/' + props.id,config)
                    .then(response=> {
                      console.log(response)
                    history.push("/myproducts");
                    })
                    .catch(function (error) {
                      console.log(error);
                    });

      return(
        <div>

        </div>
      )
      }

      
    


export default DeleteProduct