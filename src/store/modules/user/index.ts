import { defineStore } from 'pinia'
import piniaStore from '@/store/index'
import { UserState,Local } from './types'

export const useUserStore = defineStore(
  // 唯一ID
  'user',
  {
    state: (): UserState => ({
      uid:0,
      location:{
        cityId:"",
        lat:"",
        lng:""
      }
    }),
    getters: {},
    actions: {
      // Update app settings
      setUid(uid: number) {
        this.uid = uid
      },
      setLocation(location: Local) {
        this.location = location
      },
    },
  },
)

export function useClientOutsideStore() {
  return useUserStore(piniaStore)
}
