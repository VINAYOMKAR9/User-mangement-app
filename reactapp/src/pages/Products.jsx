import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import LoadingIndicator from './LoadingIndicator'
import Pagination from './Pagination'

const URL = `https://jsonplaceholder.typicode.com/users`
const getdata=async(page)=>{
    return await axios.get(URL,{
        params:{
            _page:page,
            _limit:4
        }
    })
}

const Products = () => {
    const[page,setPage]=useState(1)
    const[data,setData]=useState([])
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState(false)

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


  return (
    <div>
        <h1>USERS</h1>

        <div>
            {
                data && data.map((el)=>{
                    return (
                        // handleDetail={handleDetail} handleDelete={handleDelete} handleEdit={handleEdit}
                       <ProductCard key={el.id} {...el} />
                        )
                })
            }
        </div>
        <Pagination page={page} setPage={setPage} totalPage={3} />
        
    </div>
  )
}

export default Products
