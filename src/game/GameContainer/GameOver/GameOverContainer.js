import * as PIXI from "pixi.js";
import { GameOver } from "./GameOver";
import { GameOverImg } from "./GameOverImg";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import img from "./vaporbg.JPG";
import coin from "./coin.png";
import insertCoin from "./insertCoin.PNG";

gsap.registerPlugin(PixiPlugin);

export class GameOverContainer extends PIXI.Container {
  constructor(parent) {
    super();
    this.parent = parent;
    if (this.parent) {
      this.parent.addChild(this);
    }
    const bg = new PIXI.Sprite.from(img);
    bg.anchor.set(0.5);
    this.sortableChildren = true;
    this.addChild(bg);
    const coinImg = new PIXI.Sprite.from(coin);
    coinImg.anchor.set(0.5);
    coinImg.height = 100;
    coinImg.width = 100;
    coinImg.zIndex = 5;
    coinImg.alpha = 0.8;
    this.parent.cursor = "none";
    this.addChild(coinImg);
    this.parent.interactive = true;
    this.parent.on("pointermove", moveCoin);
    function moveCoin(e) {
      let pos = e.data.global;
      coinImg.x = pos.x - window.innerWidth / 2;
      coinImg.y = pos.y - window.innerHeight / 2;
    }
  }
  removeAllChildren() {
    while (this.children[0]) {
      this.removeChild(this.children[0]);
    }
  }
  setupFirstChildren(currentScore) {
    const game = new GameOver("GAME", this);
    game.animateGameOn();
    const over = new GameOver("OVER", this);
    over.animateOverOn();
    const score = new GameOver(`Score:${currentScore}`, this);
    setTimeout(() => {
      game.animateGameOff();
      over.animateOverOff();
    }, 4000);
    setTimeout(() => {
      score.animateScoreOff();
    }, 4500);
    setTimeout(() => {
      const message = new GameOver("Insert Coin to Continue", this);
      message.position.x = 0;
      message.position.y = -1000;
      message.animateMessage();
      const insert = new GameOverImg.from(insertCoin);
      this.addChild(insert);
      insert.height = 150;
      insert.width = 110;
      insert.zIndex = 10;
      insert.position.x = -300;
      insert.position.y = 100;
      insert.interactive = true;
      insert.zIndex = 0;
      insert.alpha = 0.9;
      insert.addListener("click", clickInsert);
      function clickInsert(e) {
        console.log(e);
        console.log("words container?", this.parent);
        //remove the children of words container , set theem back up
        const wordsContainer = this.parent.parent.children[1].children[3];
        wordsContainer.removeAllChildren();
        wordsContainer.setupFirstChildren();
        console.log("words container loaded");
        //zero out the points
        const scoreContainer = this.parent.parent.children[1].children[2];
        scoreContainer.userScore = 0;

        console.log("score container loaded");
        //rest timer back to width
        const timerContainer = this.parent.parent.children[1].children[4];
        timerContainer.resetTimer();
        console.log("timer container loaded");
        this.parent.parent.removeChild(this.parent);
        console.log(wordsContainer);
        wordsContainer.fromOffScreen();
        wordsContainer.children.forEach((word) => word.updatePosition());
        //animate elements back in
      }
      gsap.fromTo(
        insert,
        {
          x: 1000,
        },
        {
          ease: "elastic",
          duration: 3,
          x: -300,
          y: 100,
        }
      );
      const leader = new GameOver("Leader Board", this);
      leader.animateLeader();
      leader.interactive = true;
      leader.addListener("click", clickLeader);
      function clickLeader(e) {
        this.parent.removeAllChildren();
      }
    }, 5500);
  }
}
