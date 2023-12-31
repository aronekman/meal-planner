import { createBrowserRouter, Outlet } from 'react-router-dom';

import AppLayout from './common/AppLayout';
import Login from './features/authentication/Login';
import Register from './features/authentication/Register';
import { ExploreProvider } from './features/explore/ExploreContext';
import FindRecipes from './features/explore/pages/FindRecipes';
import RecipeDetailPage from './features/explore/pages/RecipeDetailPage';
import HomePage from './features/plan/HomePage';
import { PlanProvider } from './features/plan/PlanContext';
import CreateRecipe from './features/recipes/pages/CreateRecipe';
import EditRecipe from './features/recipes/pages/EditRecipe';
import MyRecipes from './features/recipes/pages/MyRecipes';
import RecipePage from './features/recipes/pages/RecipePage';
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
              { path: 'published/:id/edit', element: <EditRecipe /> },
              { path: ':id', element: <RecipePage /> }
            ]
          },
          {
            path: 'explore',
            element: (
              <ExploreProvider>
                <Outlet />
              </ExploreProvider>
            ),
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
