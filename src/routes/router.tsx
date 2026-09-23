// src/router.tsx

import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/mainLayout";
import ProtectedRoute from "./ProtectedRoute";

import { Login } from "../features/auth";
import {
    UserList,
    AddUser,
    EditUser,
} from "../features/users";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    {
                        path: "/",
                        element: <UserList />,
                    },
                    {
                        path: "users",
                        element: <UserList />,
                    },
                    {
                        path: "users/add",
                        element: <AddUser />,
                    },
                    {
                        path: "users/edit/:id",
                        element: <EditUser />,
                    },
                ],
            },
        ],
    },
]);