import { Action } from "redux";

export const OPEN_SIDEBAR_DESKTOP = "OPEN_SIDEBAR_DESKTOP";
export const OPEN_SIDEBAR_MOBILE = "OPEN_SIDEBAR_MOBILE";
export const isMobile = window.screen.width < 1024;

const getSidebarState = (): boolean | null => {
    const sidebarState = localStorage.getItem("sidebar");
    return sidebarState !== null ? JSON.parse(sidebarState) : true;
};


const initialState = {
    isSidebarOpen: isMobile ? false : getSidebarState(),
};

export default function sidebarReducer(state = initialState, action: Action) {
    switch (action.type) {
        case OPEN_SIDEBAR_DESKTOP:
            const newState = !state.isSidebarOpen;
            localStorage.setItem("sidebar", JSON.stringify(newState));
            return { ...state, isSidebarOpen: newState };

        case OPEN_SIDEBAR_MOBILE:
            return { ...state, isSidebarOpen: !state.isSidebarOpen };

        default:
            return state;
    }
}