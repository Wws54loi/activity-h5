declare interface RouteStack {
  routes: Array<any>
  getCurrentRoute: Function
  getPreviousRoute: Function
  updateCurrentRoute: Function
}
