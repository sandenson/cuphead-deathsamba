// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Item from "../Item";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Morshu extends Item {
    public onCollisionEnter(other: cc.BoxCollider, self: any) {
        if (!this.isDying) {
            this.getComponent(cc.Animation).play('MorshuDeath');
            this.controller.score = this.pointsValue;
            this.isDying = true;
        }
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.pointsValue = 1000;
    }

    // update (dt) {}
}
