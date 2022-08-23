import axios from 'axios'
import React from 'react'

const CardUser = ({user, getAllUser}) => {

    //funcion delete //optenemos getall para recargar la pag
    const deleteUser = () => {
        //cambiar por template string
        const URL = `https://users-crud1.herokuapp.com/users/${user.id}/`
        axios.delete(URL)
            .then(res => {
                console.log(res.data)
                getAllUser()
            })
            .catch(err => console.log(err))
    }

  return (
    //UserList
    <article className='card'>
            <h2 className='text-center'>CardUser</h2>
            <hr className='card_hr' />
                <ul className='card_list'>
                    <li className='card_item'><span>Id:</span>{user.id}</li>
                    <li className='card_item'><span>Name / Last_name:</span>{user.first_name + ' '+ user.last_name}</li>
                    <li className='card_item'><span>Email:</span>{user.email}</li>
                    <li className='card_item'><span>Birthday:</span>{user.birthday}</li>
                </ul>
                <hr className='card_hr' />
                <div className='card_footer'>
                    <button className='card_btn'>Update</button>
                    <button onClick={deleteUser} className='card_btn'>Delete</button>
                </div>
    </article>
  )
}

export default CardUser