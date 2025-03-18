import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import App from "../layout/App.tsx";
import NotFound from "../../pages/errors/NotFound.tsx";
import ServerError from "../../pages/errors/ServerError.tsx";
import Login from "../../pages/authentication/Login.tsx";
import MovieDetail from "../../pages/movie/MovieDetail.tsx";
import HomePage from "../../pages/homepage/HomePage.tsx";
import MovieStreaming from "../../pages/movie/MovieStreaming.tsx";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {
              path: "/",
              element: <HomePage/>
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/movie/detail/:id",
                element: <MovieDetail/>
            },
            {
                path: "/movie/detail/movie-streaming/:episodeId",
                element: <MovieStreaming/>
            },
            {path: 'not-found', element: <NotFound/>},
            {path: 'server-error', element: <ServerError/>},
            {path: '*', element: <Navigate to='not-found' replace/>},
        ],
    }
];
export const router = createBrowserRouter(routes);