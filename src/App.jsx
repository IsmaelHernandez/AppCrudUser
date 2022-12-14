import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'
import CardUser from './Components/CardUser'
import FormUser from './Components/FormUser'

function App() {

  const [isOpenForm, setIsOpenForm] = useState()
  //estado para manejar el update
  const [updateInfo, setUpdateInfo] = useState()
  //creamos un estado para cambiar el renderizado la inf
  const [users, setUsers] = useState()

  //funcion para obtener los users de la api
  const getAllUser = () => {
    const URL = 'https://users-crud1.herokuapp.com/users/'
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }
  //para obtener inf de la api sin repetirce
  useEffect(() => {
    getAllUser()
  }, [])
  
  console.log(updateInfo)
  

  return (
    <div className="App">
      <div className='flex1'>
        <div className='form_container'>
          <FormUser updateInfo={updateInfo} setUpdateInfo={setUpdateInfo} getAllUser={getAllUser} />
        </div>
        <div className='card_container'>
          {
            //iteramos users con map para obtener todos los users
            //pasamos por prop user para obtener la data
            users?.map(user => (
              <CardUser key={user.id} user={user} getAllUser={getAllUser} setUpdateInfo={setUpdateInfo}  /> //pasmos por key el id para identificarlos
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
