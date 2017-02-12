export default class Preloader {
  preload() {
    this.load.image('cat', 'assets/cat.png');
    this.load.atlasJSONHash('heart', 'assets/heart.png', 'assets/heart.json');
  }
  create() {
    this.state.start('Game');
  }
}
