import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";

interface NavItem {
  label: string;
  path: string;
  icon: string;
  divider?: boolean;
}

export default component$(() => {
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>`,
    },
    {
      label: "Loans",
      path: "/dashboard/loans",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.5 9.5C10.3284 8.67157 11.6716 8.67157 12.5 9.5C13.3284 10.3284 13.3284 11.6716 12.5 12.5L9 16H15" />
            </svg>`,
    },
    {
      label: "Merchants",
      path: "/dashboard/merchants",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>`,
    },
    {
      label: "Report",
      path: "/dashboard/report",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>`,
      divider: true
    },
    {
      label: "Settings",
      path: "/dashboard/settings/profile",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>`,
    },
    {
      label: "Logout",
      path: "/login",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>`,
    },
  ];

  return (
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>BP LOANS</h2>
      </div>
      <nav class="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <>
              {item.divider && <li class="sidebar-divider"></li>}
              <li key={item.path}>
                <Link 
                  href={item.path} 
                  class={{
                    'nav-item': true,
                    'active': location.url.pathname === item.path || 
                              (item.path === '/dashboard/settings/profile' && 
                               location.url.pathname && location.url.pathname.startsWith('/dashboard/settings'))
                  }}
                >
                  <span 
                    class="icon" 
                    dangerouslySetInnerHTML={item.icon}
                  />
                  {item.label}
                </Link>
              </li>
            </>
          ))}
        </ul>
      </nav>
    </aside>
  );
}); 