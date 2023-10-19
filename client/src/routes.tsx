import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import AppLayout from './common/AppLayout';
import Login from './features/authentication/Login';
import Register from './features/authentication/Register';
import CreateRecipes from './features/recipes/CreateRecipes';
import MyRecipes from './features/recipes/MyRecipes';
import { RecipeProvider } from './features/recipes/RecipeContext';
import ApplicationWrapper from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        element: <ApplicationWrapper />,
        children: [
          { index: true, element: <Navigate to="/recipes" /> },
          {
            path: '/recipes',
            element: (
              <RecipeProvider>
                <Outlet />
              </RecipeProvider>
            ),
            children: [
              { index: true, element: <MyRecipes /> },
              { path: 'create', element: <CreateRecipes /> }
            ]
          }
        ]
      }
    ]
  }
]);

export default router;
