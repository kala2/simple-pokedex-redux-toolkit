import axios from "axios";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: process.env.REACT_APP_API_URL }) =>
  async ({ url, method, data }: any) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };
