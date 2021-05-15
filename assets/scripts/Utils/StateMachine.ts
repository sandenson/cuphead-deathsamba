// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Actor from '../Actor/Actor';

const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class StateMachine<T extends Actor> extends cc.Component {
  protected actor: T = null;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.actor = <T>this.node.getComponent(Actor);
  }

  public abstract onAnimationEnd(animation: string);

  public abstract onAnimationStart(animation: string);

  public abstract update(dt);
}
