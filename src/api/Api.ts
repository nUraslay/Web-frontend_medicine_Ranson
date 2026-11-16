/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface HandlerErrorResponse {
  /** @example "error" */
  status?: string;
  /** @example "описание ошибки" */
  description?: string;
}

export interface HandlerMessageResponse {
  /** @example "success" */
  status?: string;
  message?: string;
}

export interface HandlerSignSerializer {
  id?: number;
  title?: string;
  description?: string;
  status?: string;
  stage?: string;
  threshold_value?: number;
  image_url?: string;
  video_url?: string;
  created_at?: string;
  formed_at?: string;
  likes_count?: number;
  is_liked?: number;
  is_mine?: number;
}

export interface HandlerSignResponse {
  /** @example "success" */
  status?: string;
  data?: HandlerSignSerializer;
  message?: string;
}

export interface HandlerSignListResponse {
  /** @example "success" */
  status?: string;
  data?: HandlerSignSerializer[];
}

export interface HandlerLikeData {
  sign_id?: number;
  /** @example 1 */
  is_liked?: number;
  likes_count?: number;
}

export interface HandlerLikeResponse {
  /** @example "success" */
  status?: string;
  message?: string;
  data?: HandlerLikeData;
}

export interface HandlerUserData {
  id?: number;
  login?: string;
  is_moderator?: boolean;
}

export interface HandlerRegisterResponse {
  /** @example "success" */
  status?: string;
  data?: HandlerUserData;
  message?: string;
}

export interface HandlerLoginData {
  access_token?: string;
  /** @example "Bearer" */
  token_type?: string;
  /** @example 3600 */
  expires_in?: number;
}

export interface HandlerLoginResponse {
  /** @example "success" */
  status?: string;
  data?: HandlerLoginData;
  message?: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";

import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
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

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
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

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:8080/api",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
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
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
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

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Ranson API
 * @version 1.0
 * @baseUrl http://localhost:8080/api
 * @contact
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name LoginCreate
     * @summary Аутентификация
     * @request POST:/auth/login
     */
    loginCreate: (
      data: {
        /** Логин */
        login: string;
        /** Пароль */
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<HandlerLoginResponse, HandlerErrorResponse>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name LogoutCreate
     * @summary Деавторизация
     * @request POST:/auth/logout
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<HandlerMessageResponse, HandlerErrorResponse>({
        path: `/auth/logout`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags auth
     * @name UsersCreate
     * @summary Регистрация
     * @request POST:/users
     */
    usersCreate: (
      data: {
        /** Логин */
        login: string;
        /** Пароль */
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<HandlerRegisterResponse, HandlerErrorResponse>({
        path: `/users`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
  pancreatitisSigns = {
    /**
     * No description
     *
     * @tags pancreatitis-signs
     * @name PancreatitisSignsList
     * @summary Список услуг (плитка)
     * @request GET:/pancreatitis-signs
     */
    pancreatitisSignsList: (
      query?: {
        /** Часть названия */
        filter?: string;
        /** Порог не больше */
        max_value?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HandlerSignListResponse, HandlerErrorResponse>({
        path: `/pancreatitis-signs`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pancreatitis-signs
     * @name PancreatitisSignsCreate
     * @summary Создать черновик услуги
     * @request POST:/pancreatitis-signs
     * @secure
     */
    pancreatitisSignsCreate: (
      data: {
        /** Название */
        title: string;
        /**
         * Изображение
         * @format binary
         */
        image?: File;
        /**
         * Видео
         * @format binary
         */
        video?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<HandlerSignResponse, HandlerErrorResponse>({
        path: `/pancreatitis-signs`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pancreatitis-signs
     * @name DraftList
     * @summary Черновик текущего пользователя
     * @request GET:/pancreatitis-signs/draft
     * @secure
     */
    draftList: (params: RequestParams = {}) =>
      this.request<HandlerSignResponse, HandlerErrorResponse>({
        path: `/pancreatitis-signs/draft`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pancreatitis-signs
     * @name FeedList
     * @summary Лента: первая услуга
     * @request GET:/pancreatitis-signs/feed
     */
    feedList: (params: RequestParams = {}) =>
      this.request<HandlerSignResponse, HandlerErrorResponse>({
        path: `/pancreatitis-signs/feed`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pancreatitis-signs
     * @name FeedDetail
     * @summary Лента: по id
     * @request GET:/pancreatitis-signs/feed/{id}
     */
    feedDetail: (
      id: number,
      query?: {
        /** true - следующая */
        next?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<HandlerSignResponse, HandlerErrorResponse>({
        path: `/pancreatitis-signs/feed/${id}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pancreatitis-signs
     * @name PancreatitisSignsDelete
     * @summary Удалить услугу
     * @request DELETE:/pancreatitis-signs/{id}
     * @secure
     */
    pancreatitisSignsDelete: (id: number, params: RequestParams = {}) =>
      this.request<HandlerMessageResponse, HandlerErrorResponse>({
        path: `/pancreatitis-signs/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pancreatitis-signs
     * @name LikeCreate
     * @summary Поставить или снять лайк
     * @request POST:/pancreatitis-signs/{id}/like
     * @secure
     */
    likeCreate: (
      id: number,
      data: {
        /** 0 или 1 */
        like: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<HandlerLikeResponse, HandlerErrorResponse>({
        path: `/pancreatitis-signs/${id}/like`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags pancreatitis-signs
     * @name PublishUpdate
     * @summary Опубликовать услугу
     * @request PUT:/pancreatitis-signs/{id}/publish
     * @secure
     */
    publishUpdate: (
      id: number,
      data: {
        /** Название */
        title?: string;
        /** Описание */
        description?: string;
        /** Стадия */
        stage?: string;
        /** Пороговое значение */
        threshold_value?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<HandlerSignResponse, HandlerErrorResponse>({
        path: `/pancreatitis-signs/${id}/publish`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),
  };
}
