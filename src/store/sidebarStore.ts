import {create} from "zustand"
interface SidebarState {
    isSidebarOpen: boolean;
    sidebarWidth: number;
    toggleSidebar: () => void;
}
  
export const useSidebarStore = create<SidebarState>((set) => ({
    isSidebarOpen: true,
    sidebarWidth: 240, 
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));