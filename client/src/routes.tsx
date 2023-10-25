import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import AppLayout from './common/AppLayout';
import Login from './features/authentication/Login';
import Register from './features/authentication/Register';
import RecipeForm from './features/recipes/components/RecipeForm';
import DraftPage from './features/recipes/pages/DraftPage';
import MyRecipes from './features/recipes/pages/MyRecipes';
import PublishedPage from './features/recipes/pages/PublishedPage';
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
              { path: 'create', element: <RecipeForm /> },
              { path: ':id/draft', element: <DraftPage /> },
              { path: ':id/published', element: <PublishedPage /> }
            ]
          }
        ]
      }
    ]
  }
]);

export default router;
