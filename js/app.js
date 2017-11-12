/**
 * @constructor Enemy
 * @description 一个Enemy类，玩家要躲避的敌人
 */
var Enemy = function(x, y) {
    this.speed = Math.random()*100;
    this.x = x;
    this.y = y;
    /**
     * @description 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
     */
    this.sprite = 'images/enemy-bug.png';
};
/**
 * @description  此为游戏必须的函数，用来更新敌人的位置
 * @param {*} dt 表示时间间隙
 */
Enemy.prototype.update = function(dt) {
  /**
   * @description 给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上都是以同样的速度运行的
   */
    this.x += dt * this.speed;
    if (this.x >= 505) {
      this.x = 0;
    }
};
/**
 * @description 碰撞检测, 碰撞后显示game over
 * @param {*} enemy 敌人
 * @param {*} player 玩家
 */
Enemy.prototype.checkCollision = function(enemy, player) {
  if(Math.abs(this.y - player.y) < 40 && Math.abs(this.x - player.x) < 60) {
    player.x = 200;
    player.y = 400;
    return alert('game over');
  }
};
/**
 * @descriptionn 用来在屏幕上画出敌人
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @constructor Player
 * @description 一个Player类，需要一个 update() 函数， render() 函数和一个 handleInput()函数
 * @param {*} x 
 * @param {*} y 
 * @param {*} speed 
 * @param {*} dt 
 */
var Player = function(x, y, speed, dt) {
  this.x = x;
  this.y = y;
  this.dt = dt;
  this.speed = speed;
  this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function() {
  const tempX = this.dt * this.speed;
  return tempX;
};
Player.prototype.handleInput = function(moveDir) {
  switch(moveDir) {
    case 'left':
      this.x -= this.update(2);
      if (this.x < 0) {
        this.x = 0;
      }
    break;
    case 'right':
      if (this.x < 400) {
        this.x += this.update(2);
      }
    break;
    case 'up':
      if (this.y < 0) {
        this.y = 0;
      }
      if (this.y === 0) {
        this.x = 200;
        this.y = 400;
        return alert('success');
      }
      this.y -= this.update(2);
    break;
    case 'down':
      if (this.y < 420) {
        this.y += this.update(2);
      }
    break;
  }
};
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description 实例化你的所有对象, 把所有敌人的对象都放进一个叫 allEnemies 的数组里面,
 * 把玩家对象放进一个叫 player 的变量里面, 如何实例化多个敌人（位置不同， 速度不同）
 */
let enemy = new Enemy(0, 50);
let enemy1 = new Enemy(10, 100);
let enemy2 = new Enemy(10, 100);


let allEnemies = [enemy, enemy1, enemy2];
let player = new Player(200, 400, 20, 2);

/**
 * @description 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
