import axios, {AxiosError, AxiosResponse} from "axios";
import {router} from "../router/route.tsx";
import {toast} from "react-toastify";
import {store} from "../stores/store.ts";
import {User, UserAdminDTO, UserDTO, UserLoginFormValues} from "../models/user.model.ts";
import {MovieDetailDTO, MovieDTO} from "../models/movie.model.ts";
import {CategoryDTO} from "../models/category.model.ts";
import {PagedModel} from "../models/PagedModel.model.ts";

export interface ApiResponseModel<T> {
    success: boolean;
    errors: string[];
    formErrors: Record<string, string>;
    data?: T;
}

axios.defaults.baseURL = "https://localhost:7132/api/";

axios.interceptors.response.use(async response => {
    // if (import.meta.env.DEV) await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    switch (status) {
        case 400: {
            console.log(data);
            if (config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'id')) {
                router.navigate('/not-found');
            }
            if (data.errors) {
                if (data.errors.length === 1) {
                    toast.error(data.errors[0]);
                } else {
                    const modelStateErrors = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modelStateErrors.push(data.errors[key]);
                        }
                    }
                    throw modelStateErrors.flat();
                }
            } else {
                if (Array.isArray(data)) {
                    toast.error(data[0]);
                } else {
                    toast.error(data);
                }
            }
            break;
        }
        case 401:
            toast.error('Unauthorized');
            break;
        case 403:
            toast.error('Forbidden');
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error')
            break;
    }
    return Promise.reject(error);
});

const responseBody = <T>(response: AxiosResponse<ApiResponseModel<T>>): ApiResponseModel<T> => response.data;

//Phần này dùng sẽ tạo interceptor để inject token vào request
axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const requests = {
    get: <T>(url: string): Promise<ApiResponseModel<T>> => axios.get<ApiResponseModel<T>>(url).then(responseBody),
    post: <T>(url: string, body: object): Promise<ApiResponseModel<T>> => axios.post<ApiResponseModel<T>>(url, body).then(responseBody),
    put: <T>(url: string, body: object): Promise<ApiResponseModel<T>> => axios.put<ApiResponseModel<T>>(url, body).then(responseBody),
    patch: <T>(url: string, body?: object): Promise<ApiResponseModel<T>> => axios.patch<ApiResponseModel<T>>(url, body).then(responseBody),
    del: <T>(url: string): Promise<ApiResponseModel<T>> => axios.delete<ApiResponseModel<T>>(url).then(responseBody),
};

const Account = {
    current: (): Promise<ApiResponseModel<User>> => requests.get<User>('/auth'),
    login: (user: UserLoginFormValues): Promise<ApiResponseModel<User>> => requests.post<User>('/auth/login', user),
    // register: (user: UserRegisterFormValues): Promise<ApiResponseModel<User>> => requests.post<User>('/auth/register', user),
    // verifyEmail: (email: string, token: string): Promise<ApiResponseModel<void>> => requests.post<void>(`/auth/verifyEmail?token=${token}&email=${email}`, {}),
    // forgotPassword: (email: string): Promise<ApiResponseModel<void>> => requests.get<void>(`/auth/forgotPassword-web?email=${email}`),
    // changePassword: (values: any): Promise<ApiResponseModel<void>> => requests.post<void>(`/auth/changeUserPassword`, values),
    // resetPassword: (values: any): Promise<ApiResponseModel<any>> => requests.post(`/auth/resetPassword-web`, values),
    // resendEmailConfirm: (email: string) => requests.get(`/auth/resendEmailConfirmationLink?email=${email}`),
};

const Movie = {
    list: (): Promise<ApiResponseModel<MovieDTO[]>> => requests.get<MovieDTO[]>('/movies'),
    adminList: (pageSize?: number, pageNumber?: number, term?: string): Promise<ApiResponseModel<PagedModel<MovieDTO>>> => {
        const params = new URLSearchParams();
        if (pageSize) params.append("pageSize", pageSize.toString());
        if (pageNumber) params.append("pageNumber", pageNumber.toString());
        if (term) params.append("term", term);

        return requests.get<PagedModel<MovieDTO>>(`/movies/admin-movies?${params.toString()}`);
    },
    getMovieDetail: (id: number): Promise<ApiResponseModel<MovieDetailDTO>> => requests.get<MovieDetailDTO>(`/movies/movie-detail?id=${id}`),
    getMovieByCategory: (pageSize?: number, pageNumber?: number, categoryId?: number | null): Promise<ApiResponseModel<PagedModel<MovieDTO>>> => {
        const params = new URLSearchParams();
        if (pageSize) params.append("pageSize", pageSize.toString());
        if (pageNumber) params.append("pageNumber", pageNumber.toString());
        if (categoryId) params.append("categoryId", categoryId.toString());
        return requests.get<PagedModel<MovieDTO>>(`/movies/movies-by-category?${params.toString()}`);
    },
}

const UserAdmin = {
    adminList: (pageSize?: number, pageNumber?: number, term?: string): Promise<ApiResponseModel<PagedModel<UserAdminDTO>>> => {
        const params = new URLSearchParams();
        if (pageSize) params.append("pageSize", pageSize.toString());
        if (pageNumber) params.append("pageNumber", pageNumber.toString());
        if (term) params.append("term", term);

        return requests.get<PagedModel<UserAdminDTO>>(`/users?${params.toString()}`);
    },

    adminDetails: (id: number): Promise<ApiResponseModel<UserDTO>> => requests.get<UserDTO>(`/users/user-detail?id=${id}`),

    adminCreate: (user: UserAdminDTO): Promise<ApiResponseModel<UserAdminDTO>> => requests.post<UserAdminDTO>('/users/add-user', user),

    adminUpdate: (id: number, user: UserAdminDTO): Promise<ApiResponseModel<UserAdminDTO>> => requests.put<UserAdminDTO>(`/users/update-user?id=${id}`, user),

    adminDelete: (id: number): Promise<ApiResponseModel<UserAdminDTO>> => requests.del<UserAdminDTO>(`/users/delete-user?id=${id}`),

    adminBan: (id: number): Promise<ApiResponseModel<UserAdminDTO>> => requests.put<UserAdminDTO>(`/users/ban-user?id=${id}`, {}),

}

const Category = {
    list: (): Promise<ApiResponseModel<CategoryDTO[]>> => requests.get<CategoryDTO[]>('/categories'),
}

const agent = {
    Account,
    Movie,
    UserAdmin,
    Category
}

export default agent;