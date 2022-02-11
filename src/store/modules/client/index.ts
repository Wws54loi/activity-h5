import { defineStore } from 'pinia'
import piniaStore from '@/store/index'
import { ClientState } from './types'

export const useClientStore = defineStore(
  // 唯一ID
  'client',
  {
    state: (): ClientState => ({
      ismini: true,
      isNgw: true,
      token: '',
      isLryj: true,
    }),
    getters: {},
    actions: {
      setIsmini(ismini: boolean) {
        const str = ismini ? '小程序环境' : '非小程序环境'
        console.log('默认打印---->', str)
        this.ismini = ismini
      },
      setIsNgw(isNgw: boolean) {
        const str = isNgw ? '新网关' : '旧网关'
        console.log('默认打印---->', str)
        this.isNgw = isNgw
      },
      setToken(token: string) {
        console.log('默认打印---->token:', token)
        this.token = token
      },
      setIsLryj(isLryj: boolean) {
        const str = isLryj ? '懒人Club' : '易健定制'
        console.log('默认打印---->', isLryj)
        this.isLryj = isLryj
      },
    },
  },
)

export function useClientOutsideStore() {
  return useClientStore(piniaStore)
}
