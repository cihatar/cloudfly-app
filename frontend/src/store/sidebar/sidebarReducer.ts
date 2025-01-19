import { Action } from "redux";

export const TOGGLE_SIDEBAR_DESKTOP = "TOGGLE_SIDEBAR_DESKTOP";
export const TOGGLE_SIDEBAR_MOBILE = "TOGGLE_SIDEBAR_MOBILE";

const getSidebarState = (): boolean | null => {
    const sidebarState = localStorage.getItem("sidebar");
    return sidebarState !== null ? JSON.parse(sidebarState) : true;
};

const initialState = {
    isDesktopSidebarOpen: getSidebarState(),
    isMobileSidebarOpen: false,
};

export default function sidebarReducer(state = initialState, action: Action) {
    switch (action.type) {
        case TOGGLE_SIDEBAR_DESKTOP:
            const newState = !state.isDesktopSidebarOpen;
            localStorage.setItem("sidebar", JSON.stringify(newState));
            return { ...state, isDesktopSidebarOpen: newState };

        case TOGGLE_SIDEBAR_MOBILE:
            return { ...state, isMobileSidebarOpen: !state.isMobileSidebarOpen };

        default:
            return state;
    }
}