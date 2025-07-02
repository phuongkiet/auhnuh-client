import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent.ts";
import { CategoryDTO } from "../models/category.model.ts";
import { toast } from "react-toastify";

export default class CategoryStore {
  categories: CategoryDTO[] = [];
  totalPages: number = 0;
  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  term: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentPage = (page: number) => {
        this.currentPage = page;
  };

  getCategories = async () => {
    const response = await agent.Category.list();
    if (response.data) {
      this.categories = response.data;
    }
  };

  getAdminCategories = async () => {
    try {
      const response = await agent.Category.adminList(this.pageSize, this.currentPage, this.term);
      console.log(response.data);
      if (response.data) {
        runInAction(() => {
            this.categories = response.data!.results;
            this.totalPages = response.data!.totalPage;
            this.totalItems = response.data!.totalItems;
            console.log("Store updated:", { 
                currentPage: this.currentPage, 
                totalPages: this.totalPages, 
                moviesLength: this.categories.length 
            });
        });
      }
    } catch (err) {
      toast.error("Error: " + err);
    }
  }

  getCategoryById = async (categoryId: number) => {
    const response = await agent.Category.getCategoryDetail(categoryId);
    if (response.data) {
      this.categories = [response.data];
    }
  };

  setCategories = (categories: CategoryDTO[]) => {
    this.categories = categories;
  };
}
