import React,{useState,useEffect} from 'react'
import {store} from './firebase-config'

function App() {


  const [name,setName] = useState('')
  const [phone,setPhone] = useState('')
  const [error,setError] = useState('')
  const [usersAgenda,setUsersAgenda] = useState([])
  const [idUser, setIdUser] = useState('')
  const [editionMode,setEditionMode] = useState(null)



const deleteUser = async (id)=>
{
  try {
    await store.collection('agenda').doc(id).delete()
    const{ docs } = await store.collection('agenda').get()
    const newArray = docs.map( item => ({id:item.id, ...item.data()}))
    setUsersAgenda(newArray)
  } catch (error) {
    console.log(error)
  }
}

  const setUsers =  async (e) =>
  {
    e.preventDefault()
    if(!name.trim())
    {
      setError('Name is empty')
    }
    else if(!phone.trim())
    {
      setError('Phone is empty')
    }

    const user = {
      name : name,
      phone : phone
    }

    try{
        const data = await store.collection('agenda').add(user)
        const{ docs } = await store.collection('agenda').get()
        const newArray = docs.map( item => ({id:item.id, ...item.data()}))
        setUsersAgenda(newArray)
        alert('user added')
    }
    catch(e)
    {
      console.log(e)
    }

    setName('')
    setPhone('')
    
  }

  useEffect(() =>
  {
    const getUsers = async ()=>
    {
      const{ docs } = await store.collection('agenda').get()
      const newArray = docs.map( item => ({id:item.id, ...item.data()}))
      setUsersAgenda(newArray)
    }
    getUsers()
  },[])

  const updateButton = async (id) =>
  {
    try {
      const data = store.collection('agenda').doc(id).get()
      const {name, phone} = data.data()
      setName(name)
      setPhone(phone)
      setId(id)
      setEditionMode(true)
    } catch (error) {
      console.log(error) 
    }
  }

  const setUpdate = async (e) =>
  {
    e.preventDefault()
    if(!name.trim())
    {
      setError('Name is empty')
    }
    else if(!phone.trim())
    {
      setError('Phone is empty')
    }
    const userUpdate = {
      name : name,
      phone: phone
    }

    try {
        await store.collection('agenda').doc(idUser).set(userUpdate)
        const{ docs } = await store.collection('agenda').get()
        const newArray = docs.map( item => ({id:item.id, ...item.data()}))
        setUsersAgenda(newArray)
    } catch (error) {
      console.log(error)
    }

    setName('')
    setPhone('')
    setIdUser('')
    setEditionMode(false)
  }

  return (
    <div className="container">
     <div className="row">
       <div className="col">
         <h2>User Form</h2>
         <form onSubmit={editionMode ? setUpdate : setUsers} className="form-group">
          <input onChange={(e) =>{setName(e.target.value)}} className="form-control" type="text" placeholder="Enter the name" value={name}/>
          <input onChange={(e) =>{setPhone(e.target.value)}} className="form-control" type="text" placeholder="Enter the phone "  value={phone}/>
          {
            editionMode ? ( <input type="submit" value="Edit" className="btn btn-dark btn-block mt-3" />) : ( <input type="submit" value="Register" className="btn btn-dark btn-block mt-3" />)
          }
         
         </form>
         {
            error ? (<div> <p>{error}</p> </div>) : (<span></span>)
         }
       </div>
       <div className="col">
         <h2>Agenda List</h2>
         <ul className="list-group">
           {
              usersAgenda.length !== 0 ?
              (usersAgenda.map(item =>(<li className="list-group-item" key={item.id}>{item.name} -- {item.phone} <button onClick={(id) => {deleteUser(item.id)}} className="btn btn-danger float-right">Delete</button>
              <button className="btn btn-info mr-3 float-right" onClick={(id) => {updateButton(item.id)}}>UPDATE</button></li>))
              )
              :
              (<span>
                Sorry, you don't have any data
              </span>)
           }
         </ul>
       </div>
     </div>
    </div>
  );
}

export default App;
