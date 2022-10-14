import * as PIXI from "pixi.js";
import { GameContainer } from "./GameContainer/GameContainer";
//ANIMATION PLUGINS
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { BackgroundScape } from './BackgroundScape'
gsap.registerPlugin(PixiPlugin);

export class Sketch {
  //CREATE AND ADD A NEW INSTANCE OF THE CANVAS WITH STYLES
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.app = new PIXI.Application({
      backgroundColor: 0x000000,
      resolution: window.devicePixelRatio || 1,
      resizeTo: window,
    });

    this.playing = false

    this.backgroundScape = new BackgroundScape(this.app.stage);

    document.body.appendChild(this.app.view);

    //CREATE GAME CONTAINER AND STORE ALL GAME CONTAINERS/ELEMENTS INSIDE


    this.time = 0;

    // const test = new GameMenu(this.app.stage);

    //THIS CURRENTLY INITIATES THE GAME LOOP
    // this.render();
  }
  //RUNS GAME LOOP AND TRIGGERS THINGS THAT SHOULD RENDER ON EACH FRAME
  render() {
    this.app.ticker.add((delta) => {
      const wordsContainer = this.gameContainer.children[3];
      this.time += 0.05;
      if (Math.floor(this.time) === 10) {
        this.time = 0;
      }
    });
  }
  checkPlaying() {
    if (this.playing) {
      this.gameContainer = new GameContainer(this.app.stage);
      this.gameContainer.position.set(this.width / 2, 0);
      this.addChild(this.gameContainer)
    }
  }
  setPlaying(torf) {
    this.playing = torf
  }
}