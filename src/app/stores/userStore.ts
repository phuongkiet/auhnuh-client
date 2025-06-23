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
  total: number | undefined = 0;
  pageNumber: number = 1;
  term: string = "";

  constructor() {
    makeAutoObservable(this);
  }

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

  setAdminUser = (userAdmin: UserAdminDTO[]) => {
    this.userAdmin = userAdmin;
  };

  setTotal = (total: number | undefined) => {
    this.total = total;
  };

  setPageNumber = (pageNumber: number) => {
    this.pageNumber = pageNumber;
  };

  setTerm = (term: string) => {
    this.term = term;
  };

  adminList = async () => {
    try {
      const response = await agent.UserAdmin.adminList(
        5,
        this.pageNumber,
        this.term
      );
      console.log(response.data);
      if (response.data) {
        this.setAdminUser(response.data.results);
        this.setTotal(response.data.totalPage);
      }
    } catch (err) {
      toast.error("Error: " + err);
    }
  };
}
