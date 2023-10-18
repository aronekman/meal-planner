import { createBrowserRouter } from 'react-router-dom';

import AppLayout from './common/AppLayout';
import Login from './features/authentication/Login';
import Register from './features/authentication/Register';
import CreateRecipes from './features/recipes/CreateRecipes';
import ApplicationWrapper from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { element: <ApplicationWrapper />, children: [{ index: true, element: <CreateRecipes /> }] }
    ]
  }
]);

export default router;
