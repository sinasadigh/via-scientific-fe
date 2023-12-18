import axios, { AxiosResponse, AxiosError } from "axios";

interface Gene {
  geneID: string;
  transcript: string;
  experRep: number[][];
  controlRep: number[][];
}
interface ApiService {
  postData: (data: Gene[]) => Promise<Gene[]>;
  getData: () => Promise<Gene[]>;
  setToast: (message: string) => void;
  analyze: (geneID: string) => Promise<any>;
}

const API_BASE_URL = "http://localhost:3000/api";

const apiService: ApiService = {
  postData: async (data: Gene[]): Promise<any> => {
    try {
      const reqData = { genes: data };
      const response: AxiosResponse<Gene[]> = await axios.post(
        `${API_BASE_URL}/genes`,
        reqData
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
  getData: async (): Promise<any> => {
    try {
      const response: AxiosResponse<Gene[]> = await axios.get(
        `${API_BASE_URL}/genes`
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
  analyze: async (geneID: string): Promise<any> => {
    try {
      const response: AxiosResponse<Gene[]> = await axios.get(
        `${API_BASE_URL}/genes/${geneID}/analytics`
      );
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
  setToast: () => {}, //
};
const handleApiError = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const errorMessage = `Response Error: ${error.response.data}, Status: ${error.response.status}`;
    apiService.setToast(errorMessage);
  } else if (error.request) {
    // The request was made but no response was received
    const errorMessage = `Request Error: ${error.request}`;
    apiService.setToast(errorMessage);
  } else {
    // Something happened in setting up the request that triggered an Error
    const errorMessage = `Error: ${error.message}`;
    apiService.setToast(errorMessage);
  }
};

export default apiService;
