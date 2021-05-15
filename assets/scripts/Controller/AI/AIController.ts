// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Actor from "../../Actor/Actor";

const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class AIController<T extends Actor> extends cc.Component {

    protected actor: T = null;    

    public abstract start();

    // onLoad () {}

    // update (dt) {}
}
