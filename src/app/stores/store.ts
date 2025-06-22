import {createContext, useContext} from "react";
import CommonStore from "./commonStore.ts";
import UserStore from "./userStore.ts";
import MovieStore from "./movieStore.ts";

interface Store {
    userStore: UserStore;
    commonStore: CommonStore;
    movieStore: MovieStore;
}

export const store: Store = {
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    movieStore: new MovieStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}