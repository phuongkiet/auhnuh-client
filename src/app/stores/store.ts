import {createContext, useContext} from "react";
import CommonStore from "./commonStore.ts";
import UserStore from "./userStore.ts";
import MovieStore from "./movieStore.ts";
import CategoryStore from "./categoryStore.ts";

interface Store {
    userStore: UserStore;
    commonStore: CommonStore;
    movieStore: MovieStore;
    categoryStore: CategoryStore;
}

export const store: Store = {
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    movieStore: new MovieStore(),
    categoryStore: new CategoryStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}