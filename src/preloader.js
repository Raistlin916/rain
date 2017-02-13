const heartJSON = {
  frames: [
    {
      frame: { x: 0, y: 0, w: 34, h: 31 }
    },
    {
      frame: { x: 35, y: 0, w: 29, h: 31 }
    }
  ],
  meta: {
    image: 'heart.png',
    size: { w: 64, h: 31 },
    scale: 1
  }
}

export default class Preloader {
  preload() {
    this.load.crossOrigin = 'anonymous'
    this.load.image('cat', '//img.yzcdn.cn/public_files/2017/02/13/b001da64689092ea17440fd4546e529f.png');
    this.load.atlasJSONHash('heart',
      '//img.yzcdn.cn/public_files/2017/02/13/16cbd5176adea994b384b7548c97f694.png',
      null, heartJSON);
  }
  create() {
    this.state.start('Game');
  }
}
