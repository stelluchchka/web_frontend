/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Dish {
  /** ID */
  id?: number;
  /**
   * Title
   * @minLength 1
   * @maxLength 255
   */
  title: string;
  /**
   * Price
   * @format decimal
   */
  price?: string | null;
  /**
   * Tags
   * @maxLength 255
   */
  tags?: string | null;
  /**
   * Weight
   * @format decimal
   */
  weight?: string | null;
  /**
   * Energy value
   * @format decimal
   */
  energy_value?: string | null;
  /** Content */
  content?: string | null;
  /**
   * Chef name
   * @maxLength 255
   */
  chef_name?: string | null;
  /**
   * Chef post
   * @minLength 1
   * @maxLength 255
   */
  chef_post: string;
  /**
   * Chef url
   * @maxLength 255
   */
  chef_url?: string | null;
  /** Status */
  status?: "есть" | "удалено" | null;
  /**
   * Expiry date
   * @maxLength 50
   */
  expiry_date?: string | null;
  /**
   * Url
   * @maxLength 255
   */
  url?: string | null;
}

export interface CurDishes {
  /** ID */
  id?: number;
  /**
   * Title
   * @minLength 1
   * @maxLength 255
   */
  title: string;
  /**
   * Price
   * @format decimal
   */
  price?: string | null;
  /**
   * Tags
   * @maxLength 255
   */
  tags?: string | null;
  /**
   * Url
   * @maxLength 255
   */
  url?: string | null;
}

export interface Order {
  /** ID */
  id?: number;
  /** User */
  user?: string;
  /**
   * Created at
   * @format date-time
   */
  created_at?: string;
  /**
   * Processed at
   * @format date-time
   */
  processed_at?: string | null;
  /**
   * Completed at
   * @format date-time
   */
  completed_at?: string | null;
  /** Status */
  status?: "зарегистрирован" | "отменен" | "сформирован" | "отказ" | "готов" | null;
  /**
   * Is success
   * @minLength 1
   */
  is_success: string;
  /** Moderator */
  moderator?: number | null;
}

export interface DishOrder {
  dish?: CurDishes;
  order?: Order;
}

export interface User {
  /** ID */
  id?: number;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
  /**
   * Password
   * @minLength 1
   */
  password: string;
  /**
   * Last login
   * @format date-time
   */
  last_login?: string | null;
  /**
   * First name
   * @minLength 1
   * @maxLength 150
   */
  first_name?: string | null;
  /**
   * Last name
   * @minLength 1
   * @maxLength 150
   */
  last_name?: string | null;
  /**
   * Email адрес
   * @format email
   * @minLength 1
   * @maxLength 128
   */
  email: string;
  /**
   * Username
   * @minLength 1
   * @maxLength 150
   */
  username?: string | null;
  /** Is active */
  is_active?: boolean | null;
  /**
   * Date joined
   * @format date-time
   */
  date_joined?: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  dishes = {
    /**
     * No description
     *
     * @tags dishes
     * @name DishesList
     * @request GET:/dishes/
     * @secure
     */
    dishesList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/dishes/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags dishes
     * @name DishesCreate
     * @request POST:/dishes/
     * @secure
     */
    dishesCreate: (data: Dish, params: RequestParams = {}) =>
      this.request<Dish, any>({
        path: `/dishes/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags dishes
     * @name DishesRead
     * @request GET:/dishes/{id}
     * @secure
     */
    dishesRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/dishes/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags dishes
     * @name DishesUpdate
     * @request PUT:/dishes/{id}
     * @secure
     */
    dishesUpdate: (id: string, data: Dish, params: RequestParams = {}) =>
      this.request<Dish, any>({
        path: `/dishes/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags dishes
     * @name DishesDelete
     * @request DELETE:/dishes/{id}
     * @secure
     */
    dishesDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/dishes/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags dishes
     * @name DishesPostCreate
     * @request POST:/dishes/{id}/post
     * @secure
     */
    dishesPostCreate: (id: string, data: Dish, params: RequestParams = {}) =>
      this.request<Dish, any>({
        path: `/dishes/${id}/post`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  dishesOrders = {
    /**
     * No description
     *
     * @tags dishes_orders
     * @name DishesOrdersUpdate
     * @request PUT:/dishes_orders/{id}
     * @secure
     */
    dishesOrdersUpdate: (id: string, data: DishOrder, params: RequestParams = {}) =>
      this.request<DishOrder, any>({
        path: `/dishes_orders/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags dishes_orders
     * @name DishesOrdersDelete
     * @request DELETE:/dishes_orders/{id}
     * @secure
     */
    dishesOrdersDelete: (id: string, data: DishOrder, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/dishes_orders/${id}`,
        method: "DELETE",
        body: data,
        secure: true,
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/login
     * @secure
     */
    loginCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/login`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  orders = {
    /**
     * No description
     *
     * @tags orders
     * @name OrdersList
     * @request GET:/orders/
     * @secure
     */
    ordersList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersAcceptUpdate
     * @request PUT:/orders/accept
     * @secure
     */
    ordersAcceptUpdate: (data: Order, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/orders/accept`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersRead
     * @request GET:/orders/{id}
     * @secure
     */
    ordersRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersDelete
     * @request DELETE:/orders/{id}
     * @secure
     */
    ordersDelete: (id: string, data: Order, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/${id}`,
        method: "DELETE",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name OrdersConfirmUpdate
     * @request PUT:/orders/{id}/confirm
     * @secure
     */
    ordersConfirmUpdate: (id: string, data: Order, params: RequestParams = {}) =>
      this.request<Order, any>({
        path: `/orders/${id}/confirm`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name UserList
     * @request GET:/user/
     * @secure
     */
    userList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/user/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserCreate
     * @request POST:/user/
     * @secure
     */
    userCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserRead
     * @request GET:/user/{id}/
     * @secure
     */
    userRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserUpdate
     * @request PUT:/user/{id}/
     * @secure
     */
    userUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserPartialUpdate
     * @request PATCH:/user/{id}/
     * @secure
     */
    userPartialUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserDelete
     * @request DELETE:/user/{id}/
     * @secure
     */
    userDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  userInfo = {
    /**
     * No description
     *
     * @tags user_info
     * @name UserInfoList
     * @request GET:/user_info
     * @secure
     */
    userInfoList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user_info`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
}
