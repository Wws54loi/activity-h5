import { defineStore } from 'pinia'
import piniaStore from '@/store/index'
import { ClientState } from './types'

export const useClientStore = defineStore(
  // 唯一ID
  'client',
  {
    state: (): ClientState => ({
      ismini: true,
      isNgw:true,
    }),
    getters: {},
    actions: {
      // Update app settings
      setIsmini(ismini: boolean) {
        this.ismini = ismini
      },
      setIsNgw(isNgw: boolean) {
        this.isNgw = isNgw
      },
    },
  },
)

export function useClientOutsideStore() {
  return useClientStore(piniaStore)
}
