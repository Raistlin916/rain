import 'pixi.js'
import 'p2'
import Phaser from 'phaser'
import Boot from './boot'
import Preloader from './preloader'
import Game from './game'
import ScreenUtils, { Orientation } from './utils/screen_utils'
import 'normalize.css'

let w = window.innerWidth
let h = window.innerHeight

if (w > h) {
  w = 600
  h = 300
} else {
  w = 300
  h = 600
}

const screenDims = ScreenUtils.calculateScreenMetrics(w, h,
    w > h ? Orientation.LANDSCAPE : Orientation.PORTRAIT)

const game = new Phaser.Game(screenDims.gameWidth, screenDims.gameHeight, Phaser.AUTO, 'game-wrap')
game.state.add('Boot', Boot)
game.state.add('Preloader', Preloader)
game.state.add('Game', Game)

game.state.start('Boot')
