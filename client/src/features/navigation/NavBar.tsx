import { ReactNode } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

import { cn } from '@/common/utils/tailwindUtils';

type NavItem = {
  name: string;
  path: string;
};

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'My Recipes', path: '/recipes' },
  { name: 'Explore', path: '/explore' }
];

const navClassNames = `fixed bottom-0 grid w-full grid-cols-${navItems.length} bg-black p-2`

const NavBar = () => {
  return (
    <nav className={navClassNames}>
      {navItems.map(({ name, path }) => (
        <NavLink key={name} to={path}>
          {name}
        </NavLink>
      ))}
    </nav>
  );
};

type NavLinkProps = {
  to: string;
  children: ReactNode;
};

const NavLink = ({ to, children }: NavLinkProps) => {
  const { pathname } = useResolvedPath(to);
  const isActive = useMatch({ path: `${pathname}/*` });
  return (
    <Link
      to={to}
      className={cn('text-center font-sans font-bold text-white underline-offset-2', isActive && 'text-primary underline')}>
      {children}
    </Link>
  );
};

export default NavBar;
