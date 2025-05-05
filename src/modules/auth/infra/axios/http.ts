import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";

export class HttpAxiosInstance {
  private static instance: HttpAxiosInstance;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://192.168.1.103:3005/api",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use(async (config) => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  public static getInstance(): HttpAxiosInstance {
    if (!HttpAxiosInstance.instance) {
      HttpAxiosInstance.instance = new HttpAxiosInstance();
    }
    return HttpAxiosInstance.instance;
  }

  public get axios() {
    return this.axiosInstance;
  }
}