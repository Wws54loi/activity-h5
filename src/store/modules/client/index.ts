import { defineStore } from 'pinia'
import piniaStore from '@/store/index'
import { ClientState } from './types'

export const useClientStore = defineStore(
  // 唯一ID
  'client',
  {
    state: (): ClientState => ({
      ismini: true,
    }),
    getters: {},
    actions: {
      // Update app settings
      setIsmini(ismini: Boolean) {
        // @ts-ignore-next-line
        this.$ismini = ismini
      },
    },
  },
)

export function useClientOutsideStore() {
  return useClientStore(piniaStore)
}
