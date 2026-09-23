import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import UserForm from '../Components/UserForm';
import { useUpdateUser } from '../hooks/useUpdateUser';


function EditUser() {
    const {id}=useParams();
    const navigate=useNavigate();
    const {data,isLoading}=useUser(Number(id));
    const updateUser=useUpdateUser();
    if(isLoading){
        return <div>Loading...</div>
    }
  return (
    <>
      <UserForm
            defaultValues={data?? undefined}
            loading={updateUser.isPending}
            onSubmit={(formData) =>
                updateUser.mutate(
                    {
                        ...formData,
                        userID: Number(id),
                    },
                    {
                        onSuccess: () => {
                            navigate("/users");
                        },
                    }
                )
            }
        />
    </>
  )
}

export default EditUser
