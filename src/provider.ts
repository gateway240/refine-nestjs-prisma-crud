import { DataProvider, HttpError } from "@refinedev/core";
import {
  axiosInstance,
  handleFilter,
  handleJoin,
  handlePagination,
  handleSort,
  transformHttpError,
} from "./utils";
import { AxiosInstance } from "axios";
import { stringify } from "query-string";
import { CrudQuery } from 'nestjs-prisma-crud';

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance
): Required<DataProvider> => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const url = `${apiUrl}/${resource}`;


    let query: CrudQuery = {};

    query = handlePagination(query, pagination);
    query = handleFilter(query, filters);

    // let crudQuery: CrudQuery = {
    //   where: handleFilter(query, filters),
    //   joins: handleJoin(query, meta?.join),
    //   // select?: {
    //   //     only?: string[];
    //   //     except?: string[];
    //   // },
    //   orderBy: handleSort(query, sorters),
    //   // page?: number;
    //   // pageSize?: number;
    // }

    // query = handleFilter(query, filters);
    // query = handleJoin(query, meta?.join);
    // query = handlePagination(query, pagination);
    // query = handleSort(query, sorters);

    const { data } = await httpClient.get(`${url}?${new URLSearchParams({ crudQuery: JSON.stringify(query) })}`);

    // without pagination
    if (Array.isArray(data)) {
      return {
        data,
        total: data.length,
      };
    } else {
      // with pagination
      return {
        data: data.data,
        total: data.totalRecords,
      };
    }
  },

  getMany: async ({ resource, ids, meta }) => {
    const url = `${apiUrl}/${resource}`;

    let query: CrudQuery = {};
    // let query = RequestQueryBuilder.create().setFilter({
    //   field: "id",
    //   operator: CondOperator.IN,
    //   value: ids,
    // });

    query = handleJoin(query, meta?.join);

    const { data } = await httpClient.get(`${url}?${new URLSearchParams({ crudQuery: JSON.stringify(query) })}`);

    return {
      data,
    };
  },

  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;

    try {
      const { data } = await httpClient.post(url, variables);

      return {
        data,
      };
    } catch (error) {
      const httpError = transformHttpError(error);

      throw httpError;
    }
  },

  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    try {
      const { data } = await httpClient.patch(url, variables);

      return {
        data,
      };
    } catch (error) {
      const httpError = transformHttpError(error);

      throw httpError;
    }
  },

  updateMany: async ({ resource, ids, variables }) => {
    const errors: HttpError[] = [];

    const response = await Promise.all(
      ids.map(async (id) => {
        try {
          const { data } = await httpClient.patch(
            `${apiUrl}/${resource}/${id}`,
            variables
          );
          return data;
        } catch (error) {
          const httpError = transformHttpError(error);

          errors.push(httpError);
        }
      })
    );

    if (errors.length > 0) {
      throw errors;
    }

    return { data: response };
  },

  createMany: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}/bulk`;

    try {
      const { data } = await httpClient.post(url, { bulk: variables });

      return {
        data,
      };
    } catch (error) {
      const httpError = transformHttpError(error);

      throw httpError;
    }
  },

  getOne: async ({ resource, id, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    let query: CrudQuery = {};

    query = handleJoin(query, meta?.join);

    const { data } = await httpClient.get(`${url}?${new URLSearchParams({ crudQuery: JSON.stringify(query) })}`);

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient.delete(url);

    return {
      data,
    };
  },

  deleteMany: async ({ resource, ids }) => {
    const response = await Promise.all(
      ids.map(async (id) => {
        const { data } = await httpClient.delete(`${apiUrl}/${resource}/${id}`);
        return data;
      })
    );
    return { data: response };
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async ({
    url,
    method,
    meta,
    filters,
    sorters,
    payload,
    query,
    headers,
  }) => {
    let requestQueryBuilder: CrudQuery = {};

    // requestQueryBuilder = handleFilter(requestQueryBuilder, filters);

    requestQueryBuilder = handleJoin(requestQueryBuilder, meta?.join);

    requestQueryBuilder = handleSort(requestQueryBuilder, sorters);

    let requestUrl = `${url}?${new URLSearchParams({ crudQuery: JSON.stringify(requestQueryBuilder) })}`;

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`;
    }

    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await httpClient[method](url, payload, {
          headers,
        });
        break;
      case "delete":
        axiosResponse = await httpClient.delete(url, {
          data: payload,
          headers: headers,
        });
        break;
      default:
        axiosResponse = await httpClient.get(requestUrl, { headers });
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
});
