import React from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useEffect } from 'react'

const defaultValue = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    birthday: ''
}

function FormUser({getAllUser, updateInfo, setUpdateInfo}) {
    //para llenar el form
    useEffect(() => {
      if(updateInfo){
        reset(updateInfo)
      }
     
    }, [updateInfo])
    
    //obtenemos por prop la funcion getAllUser
    //create User //pasamos por paramreto la data
    //console.log(updateInfo)
    const createUser = data => {
        const URL = 'https://users-crud1.herokuapp.com/users/'
        axios.post(URL, data)
          .then(res => {
            console.log(res.data)
            getAllUser()
            reset()
          })
          .catch(err => console.log(err))
        reset(defaultValue)
    }

    const updateUser = data =>{
      const URL = `https://users-crud1.herokuapp.com/users/${updateInfo.id}/`
        axios.patch(URL, data)
          .then(res => {
            console.log(res.data)
            getAllUser()
          })
          .catch(err => console.log(err))
    }
    
   //destructuramos el obj form
   const { register, reset, handleSubmit } = useForm();
  
   //pasamos como parametro la dat
   //boton para create y delete put
   const submit = data => {
      if(updateInfo){
        //UPDATE
        updateUser(data)
        setUpdateInfo()
      }else{
        //CREATE si no existe
        createUser(data);
      }
      reset(defaultValue)
   
    }

  return (
    <div className='form-container'>
      <form className='form'  onSubmit={handleSubmit(submit)}>
        <h2 className='form_title'>{updateInfo ? 'Upadte User' : 'Create User'}</h2>
        <ul className='form_list'>
          <li className='form_item'>
              <label htmlFor="email">Email:</label>
              <br />
              <input type="email" id='email' {...register("email")} />
          </li>
          <li className='form_item'>
              <label htmlFor="password">Password:</label>
              <br />
              <input type="password" id='password' {...register("password")} />
          </li>
          <li className='form_item'>
              <label htmlFor="first_name">First_Name:</label>
              <br />
              <input type="text" id='first_name' {...register("first_name")}  />
          </li>
          <li className='form_item'>
              <label htmlFor="last_name">Last_Name:</label>
              <br />
              <input type="text" id='last_name' {...register("last_name")}  />
          </li>
          <li className='form_item'>
              <label htmlFor="birthday">Birthday:</label>
              <br />
              <input type="date" id='birthday' {...register("birthday")} />
          </li>
        </ul>
        <br />
        <button className='form_btn'>{updateInfo ? 'Upadte User' : 'Create User'}</button>
      </form>
    </div>
    
  )
}

export default FormUser