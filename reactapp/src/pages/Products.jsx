import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import LoadingIndicator from './LoadingIndicator'
import Pagination from './Pagination'
import ErrorIndicator from './ErrorIndicator'
import getSingleUserData from './SingleUserData'
import SingleUserData from './SingleUserData'

const URL = `https://jsonplaceholder.typicode.com/users`
const getdata=async(page)=>{
    return await axios.get(URL,{
        params:{
            _page:page,
            _limit:4
        }
    })
}

// const getSingleUserData=async(id)=>{
//     return await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
// }

const Products = () => {
    const[page,setPage]=useState(1)
    const[data,setData]=useState([])
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState(false)
    const[singleData,setSingleData] = useState(null)

    useEffect(()=>{
        setLoading(true)
        getdata(page).then((res)=>{
            setData(res.data)
            setLoading(false)
            setError(false)
            
            console.log(res.data)
        }).catch((err)=>{
            setLoading(false)
            setError(true)
            setData([])
            console.log('error')
        })
    },[page])

    if(loading) return <LoadingIndicator/>
    if(error) return <ErrorIndicator/>

    const handleSelectedUser = async(id)=>{
        const data = await getSingleUserData(id)
        setSingleData(data.data)
    }

    const handleDelete=(id)=>{
        let filteredData= data.filter((el)=>el.id != id)
        setData(filteredData)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)

            let newData = {
                id:data.length+1,
                name:formData.get('name'),
                email:formData.get('email'),
                street:formData.get('street'),
                city:formData.get('city'),
                number:formData.get('number'),
            }
            console.log(newData)
            setData([newData,...data])
            e.target.reset()

        
    }

  return (
    <div>
        <h1>USERS</h1>

        <form onSubmit={handleSubmit}>

            <input
            type='text'
            placeholder='Enter name'
            name='name'      
            required minlength="4" maxlength="8" size="10"      
            />

<input type="email" placeholder='Enter Email' name="email"/>

            <input
            type='text'
            placeholder='Enter street'
            name='street'     
            required minlength="4" maxlength="12" size="10"       
            />

            <input
            type='text'
            placeholder='Enter city'
            name='city'    
            required minlength="4" maxlength="8" size="10"        
            />
            <input
            type='number'
            placeholder='Enter Zip code'
            name='number'      
            required minlength="5" maxlength="6" size="10"      
            />

            <button type='submit'>Submit</button>

        </form>


        {singleData?(<SingleUserData data={singleData} />)
        :(

            <div>
            {
                data && data.map((el)=>{
                    return (
                        // handleDetail={handleDetail}  handleEdit={handleEdit}
                        <ProductCard key={el.id} {...el} handleDelete={handleDelete} handleSelectedUser={handleSelectedUser} />
                    )
                })
            }
        </div>
    )}
        <Pagination page={page} setPage={setPage} totalPage={3} />
        
    </div>
  )
}

export default Products
