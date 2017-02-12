import Phaser from 'phaser'

export default class Game {
  init() {
    this.physics.startSystem(Phaser.Physics.ARCADE)
    // this.physics.arcade.gravity.y = 20
    this.physics.arcade.skipQuadTree = false
    this.game.renderer.renderSession.roundPixels = true

    window.addEventListener('deviceorientation', this.handleOrientation.bind(this), true);
  }

  create() {
    this.stage.disableVisibilityChange = true;
    this.world.bounds.setTo(-50, -50, this.world.width + 100, this.world.height + 50)

    this.hearts = this.add.physicsGroup()
    this.hearts.createMultiple(500, 'heart', 0)
    this.hearts.setAll('outOfBoundsKill', true)
    this.hearts.setAll('checkWorldBounds', true)

    const r = () => {
      for (let i = 0; i < this.rnd.integerInRange(4, 8); i++) {
        this.createHeart()
      }
      setTimeout(r, 150)
    }
    r()


    this.catGroup = this.add.group()
    this.cat = this.catGroup.create(150, this.world.height - 45, 'cat')
    this.cat.width = 164
    this.cat.height = 171.5
    this.physics.arcade.enable(this.cat)
    this.cat.body.setCircle(40, 70, 150)
    this.cat.anchor.setTo(0.5, 1)
  }

  createHeart() {
    const heart = this.hearts.getFirstExists(false);
    if (!heart) {
      return
    }
    heart.frame = this.rnd.integerInRange(0, 1)
    heart.angle = this.rnd.integerInRange(-15, 15)
    heart.anchor.setTo(0.5, 0.5)
    heart.reset(
      this.rnd.integerInRange(0, this.world.width - 30),
      this.rnd.integerInRange(-5, 10) - 50
    )
    this.physics.arcade.enable(heart)
    heart.body.velocity.y = 200
  }

  handleCollision(heart, cat) {
    cat.kill()
  }

  handleOrientation(e) {
    const x = e.gamma
    const absX = Math.abs(x)
    const direction = absX / x
    if (absX < 10) {
      this.cat.body.velocity.x = 0
    } else {
      this.cat.body.velocity.x = Math.max(Math.min(absX, 100), 20) * direction * 5
    }
  }

  update() {
    this.physics.arcade.overlap(this.hearts, this.cat, this.handleCollision)

    if (this.cat.body.x <= 0) {
      this.cat.body.x = 0
    }
    if (this.cat.body.x >= this.world.width - 100) {
      this.cat.body.x = this.world.width - 100
    }
    console.log(this.cat.body.x)
  }
}
