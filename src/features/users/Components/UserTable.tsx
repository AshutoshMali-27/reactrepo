import React from 'react'
import type { User } from '../types'

interface UserTableProps {
    users:User[],
    loading:boolean,
    onEdit:(id:number)=>void,
    onDelete:(id:number)=>void,
}

function UserTable({users,loading,onEdit,onDelete}:UserTableProps ) {
    if(loading){
        return <div>Loading...</div>
    }
    if(users.length === 0){
        return <div>No users found.</div>
    }
  return (
    <>
    <table className="table table bordered">
         <thead>
                <tr>
                    <th>Id</th>
                    <th>User Name</th>
                    <th>Phone No</th>
                    <th>Email</th>
                    <th style={{ width: 180 }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user)=>(
                    <tr key={user.userID}>
                        <td>{user.userID} </td>
                        <td>{user.userName} </td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.email}</td>
                        <td>
                            <button className="btn btn-primary btn-sm me-2"
                            onClick={()=>onEdit(user.userID)}>
                                Edit
                            </button>
                        </td>
                        <td>
                            <button className="btn btn-primary btn-sm me-2"
                            onClick={()=>onDelete(user.userID)}>
                                Delete
                            </button> 
                        </td>
                    </tr>
                ))}
            </tbody>
    </table>
      
    </>
  )
}

export default UserTable
