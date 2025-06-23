import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./app/router/route.tsx";
import {store, StoreContext} from "./app/stores/store.ts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <StoreContext.Provider value={store}>
        <RouterProvider router={router}/>
      </StoreContext.Provider>
      <ToastContainer position="bottom-right" />
  </StrictMode>,
)
