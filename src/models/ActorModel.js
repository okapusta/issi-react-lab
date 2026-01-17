import BaseModel from "./BaseModel";

export default class ActorModel extends BaseModel {
  constructor (name, surname) {
    super();

    this.name = name;
    this.surname = surname;

    this.errors = {};
  }

  validate() {
    if (this.name.length < 1) {
      this.errors['name'] = 'must be present'
    }

    if (this.year.length < 1) {
      this.errors['surname'] = 'must be present'
    }

    return Object.keys(this.errors).length <= 0;
  }
}
