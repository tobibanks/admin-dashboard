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
    getTaskDetails: build.query({
      query: () => ({
        url: "/admin/tasks",
        method: "GET",
      }),
    }),
    getProjectSpecificTask: build.query({
      query: (id) => ({
        url: `/admin/projects/${id}`,
        method: "GET",
      }),
    }),
    addProjectDetails: build.mutation({
      query: (id) => ({
        url: `/admin/projects/assign/${id}`,
        method: "POST",
      }),
    }),
    getReportsDetails: build.query({
      query: () => ({
        url: "/admin/reports",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetDetailsQuery,
  useGetProjectDetailsQuery,
  useGetTaskDetailsQuery,
  useAddTaskDetailsMutation,
  useAddProjectDetailsMutation,
  useGetReportsDetailsQuery,
  useGetProjectSpecificTaskQuery,
} = authApi;
