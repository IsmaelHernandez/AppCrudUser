import React from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';

const defaultValue = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    birthday: ''
}

function FormUser({getAllUser}) {
    //obtenemos por prop la funcion getAllUser
    //create User //pasamos por paramreto la data
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
    
   //destructuramos el obj
   const { register, reset, handleSubmit } = useForm();
  
   const submit = data => {
    createUser(data);
    reset(defaultValue)
   }

  return (
    <form  onSubmit={handleSubmit(submit)}>
      <h2 className='form_title'>Create New Movies</h2>
      <ul className='form_list'>
        <li className='form_item'>
            <label htmlFor="email">Email:</label>
            <input type="email" id='email' {...register("email")} />
        </li>
        <li className='form_item'>
            <label htmlFor="password">Password:</label>
            <input type="password" id='password' {...register("password")} />
        </li>
        <li className='form_item'>
            <label htmlFor="first_name">First_Name:</label>
            <input type="text" id='first_name' {...register("first_name")}  />
        </li>
        <li className='form_item'>
            <label htmlFor="last_name">Last_Name:</label>
            <input type="text" id='last_name' {...register("last_name")}  />
        </li>
        <li className='form_item'>
            <label htmlFor="birthday">Birthday:</label>
            <input type="date" id='birthday' {...register("birthday")} />
        </li>
      </ul>
      <button>Create User</button>
    </form>
  )
}

export default FormUser