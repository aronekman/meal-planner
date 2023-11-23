import { createBrowserRouter } from 'react-router-dom';

import AppLayout from './common/AppLayout';
import Login from './features/authentication/Login';
import Register from './features/authentication/Register';
import FindRecipes from './features/explore/pages/FindRecipes';
import RecipeDetailPage from './features/explore/pages/RecipeDetailPage';
import HomePage from './features/plan/HomePage';
import { PlanProvider } from './features/plan/PlanContext';
import CreateRecipe from './features/recipes/pages/CreateRecipe';
import DraftPage from './features/recipes/pages/DraftPage';
import EditRecipe from './features/recipes/pages/EditRecipe';
import MyRecipes from './features/recipes/pages/MyRecipes';
import PublishedPage from './features/recipes/pages/PublishedPage';
import SavedPage from './features/recipes/pages/SavedPage';
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
          {
            index: true,
            element: (
              <PlanProvider>
                <HomePage />
              </PlanProvider>
            )
          },
          {
            path: 'recipes',
            children: [
              { index: true, element: <MyRecipes /> },
              { path: 'create', element: <CreateRecipe /> },
              { path: ':id/edit', element: <EditRecipe /> },
              { path: ':id/draft', element: <DraftPage /> },
              { path: ':id/published', element: <PublishedPage /> },
              { path: ':id/saved', element: <SavedPage /> }
            ]
          },
          {
            path: 'explore',
            children: [
              { index: true, element: <FindRecipes /> },
              { path: ':id', element: <RecipeDetailPage /> }
            ]
          }
        ]
      }
      /* { path: '*', element: <Navigate to='/' /> } */
    ]
  }
]);

export default router;
