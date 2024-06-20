import { axiosClient } from "@/services/API/axios";
import type { AxiosResponse } from "axios";
export default {

  createCommunity(payload:any): Promise<AxiosResponse> {
    return axiosClient.post("/communities", payload)
  },
  async getUserCommunities() {
    return await axiosClient.get("/communities")
  },
  async getPublicCommunities() {
    return await axiosClient.get("/communities/public")
  },
  async getCommmunityBasicInfo(id:number): Promise<AxiosResponse> {
    return await axiosClient.get(`/communities/${id}`)
  },
  async updateCommunityInfo(id:number, payload:any): Promise<AxiosResponse> {
    return await axiosClient.patch(`/communities/${id}`, payload)
  },
  async getCommunityDetails(id:number): Promise<AxiosResponse> {
    return await axiosClient.get(`/communities/${id}/details`)
  },
  async getCommunityKeys(id:number): Promise<AxiosResponse> {
    return await axiosClient.get(`/communities/${id}/keys`)
  },
  async getCommunityAncestors(communityPath:string): Promise<AxiosResponse> {
    return await axiosClient.get(`/communities/${communityPath}/ancestors`)
  },
  async getCommunityMember($communityId: number): Promise<AxiosResponse> {
    return await axiosClient.get(`/communities/members/${$communityId}`)
   },
   async sendCommunityRequest($communityId: number): Promise<AxiosResponse> {
    return await axiosClient.post(`/communities/${$communityId}/request`)
   },
   async getCommunityRequests($communityId: number): Promise<AxiosResponse> { 
    return await axiosClient.get(`/communities/${$communityId}/requests`)
   },
   async updateCommunityRequest($communityId: number, $requestId: number, $payload: any): Promise<AxiosResponse> {
    return await axiosClient.patch(`/communities/${$communityId}/requests/${$requestId}`, $payload)
   },
}