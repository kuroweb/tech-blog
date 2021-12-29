import { createContext } from 'react';

type SidebarContextValue = {
  sidebarOpen: Boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SidebarContext = createContext<SidebarContextValue>({
  sidebarOpen: false,
  setSidebarOpen: () => undefined,
});
