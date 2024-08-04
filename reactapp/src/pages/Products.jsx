import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'

const URL = `https://jsonplaceholder.typicode.com/users`
const getdata=async(page)=>{
    return await axios.get(URL,{
        params:{
            _page:page,
            _limit:6
        }
    })
}

const Products = () => {
    const[page,setPage]=useState(1)
    const[data,setData]=useState([])

    useEffect(()=>{
        getdata(page).then((res)=>{
            setData(res.data)
            
            console.log(res.data)
        }).catch((err)=>{
            setData([])
            console.log('error')
        })
    },[page])


  return (
    <div>
        <h1>USERS</h1>

        <div>
            {
                data && data.map((el)=>{
                    return (
                       <ProductCard key={el.id} {...el} handleDetail={handleDetail} handleDelete={handleDelete} handleEdit={handleEdit}/>
                        )
                })
            }
        </div>
        
    </div>
  )
}

export default Products
