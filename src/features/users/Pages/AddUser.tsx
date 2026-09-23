

import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCreateduser } from '../hooks/useCreateduser';
import UserForm from '../Components/UserForm';

function AddUser() {
    const navigate=useNavigate();
    const createuser=useCreateduser();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit=(data:any)=>{
        createuser.mutate(data,{
            onSuccess:()=>{
                navigate("/users");
            }
        })
    }
  return (
    <>
      <UserForm 
      loading={createuser.isPending} 
      onSubmit={handleSubmit} />
    </>
  )
}

export default AddUser
