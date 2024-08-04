import React from 'react'

const ProductCard = ({id,name,email,handleEdit,handleDelete,handleSelectedUser}) => {
  return (
    <div>
        <b>{id}. {name} </b>
        <h5>E-mail -{email}</h5>
        <div>
            <button onClick={()=>handleEdit(id)}>Edit</button>
            <button onClick={()=>handleDelete(id)}>Delete</button>
            <button onClick={()=>handleSelectedUser(id)}>View Detail</button>
          
          </div>
    </div>
  )
}

export default ProductCard
