import {
  User,
  UserAdminDTO,
  UserLoginFormValues,
} from "../models/user.model.ts";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent.ts";
import { store } from "./store.ts";
import { router } from "../router/route.tsx";
import { toast } from "react-toastify";

export default class UserStore {
  user: User | undefined = undefined;
  userAdmin: UserAdminDTO[] = [];
  totalPages: number = 0;
  totalItems: number = 0;
  pageSize: number = 5;
  currentPage: number = 1;
  term: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentPage = (page: number) => {
        this.currentPage = page;
    };

  login = async (creds: UserLoginFormValues) => {
    const user = await agent.Account.login(creds);
    try {
      if (user.success) {
        runInAction(() => {
          this.user = user.data;
          if (this.user) {
            store.commonStore.setToken(this.user.token);
          }
          if (this.user?.role.includes("Admin")) {
            router.navigate("/admin/movies");
          } else if (this.user?.role.includes("Client")) {
            router.navigate("/");
          }
          toast.success("Login successfully!");
        });
      }else{
        toast.error(user.errors[0]);
      }
    } catch (err) {
      toast.error("Login failed: " + err);
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    this.user = undefined;
    setTimeout(() => {
      router.navigate("/");
    }, 100);
  };

  getUser = async () => {
    const user = await agent.Account.current();

    if (user.data) {
      store.commonStore.setToken(user.data.token);
    }
    runInAction(() => {
      this.user = user.data;
      console.log(this.user?.role);
      if (
        this.user?.role.includes("Admin") &&
        !location.pathname.includes("admin")
      ) {
        router.navigate("/admin/movies");
      } else if (
        this.user?.role.includes("Client") &&
        !location.pathname.includes("client")
      ) {
        router.navigate("/");
      }
    });
  };
  
  getAdminUsers = async () => {
    try {
      const response = await agent.UserAdmin.adminList(this.pageSize, this.currentPage, this.term);
      console.log(response.data);
      if (response.data) {
        this.userAdmin = response.data!.results;
        this.totalPages = response.data!.totalPage;
        this.totalItems = response.data!.totalItems;
      }
    } catch (err) {
      toast.error("Error: " + err);
    }
  };

  setAdminUser = (userAdmin: UserAdminDTO[]) => {
    this.userAdmin = userAdmin;
  };

  setTerm = (term: string) => {
    this.term = term;
  };
}
