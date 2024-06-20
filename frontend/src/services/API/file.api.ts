import { axiosClient } from "@/services/API/axios";
import type { AxiosResponse } from "axios";
export default {

  uploadFile(payload): Promise<AxiosResponse> {
    return axiosClient.post("/files", payload)
  },
  async getAllFiles() {
    return await axiosClient.get("/files")
  },
  async viewFile(id:number) {

    return await axiosClient.get(`/files/${id}`, {
      responseType: 'arraybuffer',
      headers: {
        'Accept': 'application/octet-stream'
      }
    }
    )
    // return await axiosClient.get(`/files/${id}`)
  }
}