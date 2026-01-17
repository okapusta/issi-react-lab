export default class MovieModel {
  static generateUUID() {
    return Math.floor(Math.random() * Date.now()).toString(36);
  }

  constructor(title, year, actors, director, description) {
    this.id = MovieModel.generateUUID();

    this.title = title;
    this.year = year;
    this.actors = actors;
    this.director = director;
    this.description = description;


    this.markedForDeletion = false;
    this.errors = {};
  }

  validate() {
    if (this.title.length < 1) {
      this.errors['title'] = 'must be present'
    }

    if (this.year.length < 1) {
      this.errors['year'] = 'must be present'
    }

    // if (this.actors.length < 1) {
    //   this.errors['actors'] = 'must be present'
    // }

    return Object.keys(this.errors).length <= 0;
  }
}
