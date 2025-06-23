import { makeAutoObservable } from "mobx";
import agent from "../api/agent.ts";
import { CategoryDTO } from "../models/category.model.ts";

export default class CategoryStore {
  categories: CategoryDTO[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  getCategories = async () => {
    const response = await agent.Category.list();
    if (response.data) {
      this.categories = response.data;
    }
  };

  setCategories = (categories: CategoryDTO[]) => {
    this.categories = categories;
  };
}
