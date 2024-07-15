export default class Localstore {
  static setAccessToken(token: string) {
    localStorage.setItem("access_token", token);
  }

  static getAccessToken() {
    return localStorage.getItem("access_token");
  }

  static removeAccessToken() {
    localStorage.removeItem("access_token");
  }

  static getAPIToken(){
    return localStorage.getItem("api-token");
  }

  static setAPIToken(token: string){
    localStorage.setItem("api-token", token);
  }

  static removeAPIToken(){
    localStorage.removeItem("api-token");
  }
}
