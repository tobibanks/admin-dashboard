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
    getReportsDetails: build.query({
      query: () => ({
        url: "/admin/reports/attachments/all",
        method: "GET",
      }),
    }),
    getAllUsersDetails: build.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
    }),
    useUpdateTaskApproval: build.mutation({
      query: ({ id, data }) => ({
        url: `/admin/approvals/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    getApprovalRequest: build.query({
      query: (id) => ({
        url: `/admin/approvals/${id}`,
        method: "GET",
      }),
    }),
    addProjectDetails: build.mutation({
      query: (data) => ({
        url: "/admin/projects/new",
        method: "POST",
        body: data,
      }),
    }),
    addpmDetails: build.mutation({
      query: ({ id, data }) => ({
        url: `/admin/projects/assign/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    getPMDetails: build.query({
      query: () => ({
        url: "/admin/pms",
        method: "GET",
      }),
    }),
    addTaskDetails: build.mutation({
      query: ({ id, data }) => ({
        url: `/admin/tasks/new/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    addReportsDetails: build.mutation({
      query: (data) => ({
        url: "/admin/reports",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetDetailsQuery,
  useGetProjectDetailsQuery,
  useGetTaskDetailsQuery,
  useAddpmDetailsMutation,
  useGetApprovalRequestQuery,
  useGetPMDetailsQuery,
  useAddProjectDetailsMutation,
  useAddTaskDetailsMutation,
  useAddReportsDetailsMutation,
  useGetReportsDetailsQuery,
  useUseUpdateTaskApprovalMutation,
  useGetAllUsersDetailsQuery,
  useGetProjectSpecificTaskQuery,
} = authApi;
