export default class BaseModel{
  static generateUUID() {
    return Math.floor(Math.random() * Date.now()).toString(36);
  }
}
