import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "../layout/App.tsx";
import NotFound from "../../pages/errors/NotFound.tsx";
import ServerError from "../../pages/errors/ServerError.tsx";
import Login from "../../pages/authentication/Login.tsx";
import MovieDetail from "../../pages/movie/MovieDetail.tsx";
import HomePage from "../../pages/homepage/HomePage.tsx";
import MovieStreaming from "../../pages/movie/MovieStreaming.tsx";
import {ProtectedRoute} from "./protectedRoute.tsx";
import UserManagement from "../../pages/admin/user/UserManagement.tsx";
import MovieManagement from "../../pages/admin/movie/MovieManagement.tsx";
import CategoryManagement from "../../pages/admin/category/CategoryManagement.tsx";
import MovieList from "../../pages/movie/MovieList.tsx";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {element : <ProtectedRoute allowedRoles={['Admin']}/>, children: [
                    {path: '/admin/users', element: <UserManagement/>},
                    {path: '/admin/movies', element: <MovieManagement/>},
                    {path: '/admin/categories', element: <CategoryManagement/>},
                ]},
            {
              path: "/",
              element: <HomePage/>
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/movies",
                element: <MovieList/>
            },
            {
                path: "/movie/detail/:id",
                element: <MovieDetail/>
            },
            {
                path: "/movie/detail/movie-streaming/:episodeId",
                element: <MovieStreaming/>
            },
            {path: '/not-found', element: <NotFound/>},
            {path: 'server-error', element: <ServerError/>},
            {path: '*', element: <NotFound/>},
        ],
    }
];
export const router = createBrowserRouter(routes);