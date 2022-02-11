import { defineStore } from 'pinia'
import piniaStore from '@/store/index'
import { UserState, Local } from './types'

export const useUserStore = defineStore(
  // 唯一ID
  'user',
  {
    state: (): UserState => ({
      uid: 0,
      location: {
        cityId: '',
        lat: '',
        lng: '',
      },
    }),
    getters: {},
    actions: {
      // Update app settings
      setUid(uid: number) {
        console.log('默认打印---->uid:', uid)
        this.uid = uid
      },
      setLocation(location: Local) {
        console.log('默认打印---->location:', location)
        this.location = location
      },
    },
  },
)

export function useClientOutsideStore() {
  return useUserStore(piniaStore)
}
