/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import type { userCreate, userUpdate } from '../types'
import { useForm } from 'react-hook-form';
import { useRoles } from '../hooks/UseRoles';
import { UseBranches } from '../hooks/UseBranches';

type UserFormData=|userCreate|userUpdate;
interface UserFormProps{
    defaultValues?:Partial<UserFormData>;
    loading?:boolean;
    onSubmit:(data:UserFormData)=>void;}
function UserForm({defaultValues,loading,onSubmit}:UserFormProps) {
    const{register,handleSubmit,reset,formState:{errors}}=useForm<UserFormData>({
        defaultValues
    });
   
      const {data: roles = [],isLoading: rolesLoading} = useRoles();
    const {data: branches = [], isLoading: branchesLoading} = UseBranches();
        useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
       <div className="mb-3">
        <label>First Name</label>
        <input className="form-control" {...register("userName",{required:true})} ></input>
        {errors.userName && <small className="text-danger">
            User Name is required
            </small>}
       </div>
       <div className="mb-3">
        <label>Email</label>
        <input className="form-control" {...register("email",{required:true})} ></input>
        {errors.email && <small className="text-danger">
            Email is required
            </small>}
       </div>

       <div className="mb-3">
        <label>PhoneNo</label>
        <input className="form-control" {...register("phoneNumber",{required:true})}></input>
           {errors.phoneNumber && <small className="text-danger">
            phoneNumber is required
            </small>}       
       </div>

       <div className="mb-3">
        <label>Role</label>
        <select {...register("roleId",
        {required:"role is Required",valueAsNumber:true})}
         disabled={rolesLoading}>
         <option value=""> {rolesLoading ? "Loading Roles...": "Select Roles"}
         </option>
            {rolesLoading?"loading Roles":"select roles"}
            {roles.map((role)=>
            <option key={role.roleID} value={role.roleID}>{role.roleName}</option>
            )} 
         </select>
            {errors.roleId && (<span>{errors.roleId.message} </span>)}
       </div>

       <div className="mb-3">
        <label>Branches</label>
         <select {...register("branchCode", { required: "Branch is required",})} disabled={branchesLoading} >
                    <option value=""> {branchesLoading ? "Loading branches..." : "Select Branch"}</option>
                    {branches.map((branch) => (
                        <option key={branch.branchId} value={branch.branchCode}>
                            {branch.branchName}
                        </option>
                    ))}
                </select>
       </div>
       <div className="mb-3">
    <label>Password</label>

    <input
        type="password"
        className="form-control"
        {...register("passwordHash", {
            required: "Password is required",
            minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
            },
        })}
    />

    {errors.passwordHash && (
        <small className="text-danger">
            {errors.passwordHash.message}
        </small>
    )}
</div>

<div className="mb-3 form-check">
    <input
        type="checkbox"
        className="form-check-input"
        id="isActive"
        {...register("isActive")}
    />

    <label
        className="form-check-label"
        htmlFor="isActive"
    >
        Is Active
    </label>
</div>
       <button disabled={loading} className="btn btn-success">
            Save
        </button>
      </form>
    </>
  )
}

export default UserForm
