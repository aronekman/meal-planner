import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import AppLayout from './common/AppLayout';
import Login from './features/authentication/Login';
import Register from './features/authentication/Register';
import CreateRecipe from './features/recipes/pages/CreateRecipe';
import DraftPage from './features/recipes/pages/DraftPage';
import EditRecipe from './features/recipes/pages/EditRecipe';
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
              { path: 'create', element: <CreateRecipe /> },
              { path: ':id/edit', element: <EditRecipe /> },
              { path: ':id/draft', element: <DraftPage /> },
              { path: ':id/published', element: <PublishedPage /> }
            ]
          }
        ]
      },
      { path: '*', element: <Navigate to="/" /> }
    ]
  }
]);

export default router;
