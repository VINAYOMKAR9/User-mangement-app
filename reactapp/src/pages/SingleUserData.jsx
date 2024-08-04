import React from 'react'

const SingleUserData = ({data}) => {
    const {name ,username,email,address,phone,website,company} = data
  return (
    <div>
      <h2>{name}</h2>
      <h2>Username : {username}</h2>
      <h2>email : {email}</h2>
      <h2>email : {email}</h2>
      <h2>address : <a href={`http://${website}`} target='_blank' rel='nooperner noreferrer'>{website}</a></h2>
      <p>Adrees:
        <h4>Street:{address.street}</h4>
        <h4>Street:{address.city}</h4>
        <h4>Street:{address.zipcode}</h4>
       

            </p>

    </div>
  )
}

export default SingleUserData
