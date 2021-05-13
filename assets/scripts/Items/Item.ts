// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import InGameKeyboardController from "../Controller/Cuphead/InGameKeyboardController";

const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class Item extends cc.Component {

    @property(cc.Integer)
    public pointsValue: number = 0;

    @property(InGameKeyboardController)
    public controller: InGameKeyboardController = null;

    protected isDying: boolean = false;

    public abstract onCollisionEnter(other: cc.BoxCollider, self: any);

    public onAnimationEnd() {
        this.node.destroy();
    };

    public onDeathStart() {
        this.getComponent(cc.AudioSource).play();
    }

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
