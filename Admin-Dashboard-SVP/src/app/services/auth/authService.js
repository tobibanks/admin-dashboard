import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://svp.hypen.blog",
    // baseUrl: 'http://127.0.0.1:5000/',
    prepareHeaders: (headers, {}) => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints: (build) => ({
    getDetails: build.query({
      query: () => ({
        url: "/admin/profile",
        method: "GET",
      }),
    }),
    getProjectDetails: build.query({
      query: () => ({
        url: "/admin/projects",
        method: "GET",
      }),
    }),
    addTaskDetails: build.mutation({
      query: (id, data) => ({
        url: `/admin/tasks/new/${id}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetDetailsQuery,
  useGetProjectDetailsQuery,
  useAddTaskDetailsMutation,
} = authApi;
