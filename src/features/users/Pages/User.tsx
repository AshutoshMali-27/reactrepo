//import { useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import UserTable from "../Components/UserTable";
import { useNavigate } from "react-router-dom";
const UserList = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useUsers();
    const handleEdit = (id: number) => {
       navigate(`/users/edit/${id}`);  
    };
    const handleDelete = (id: number) => {
        console.log(`Delete user with id: ${id}`);
    };
    return (
        <UserTable users={data ?? []} 
        loading={isLoading} 
        onEdit={handleEdit} 
        onDelete={handleDelete} />
    );
};
export default UserList;