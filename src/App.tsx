import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Poop from "../pages/Poop.tsx";
import './App.css'

// const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });

const router = createBrowserRouter([
  {
    path: "/poop",
    element: Poop()
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App
