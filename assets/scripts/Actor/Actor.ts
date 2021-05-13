// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DIRECTION from "./DIRECTION";

const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class Actor extends cc.Component {

    private _isJumping: boolean = false;

    public get isJumping(): boolean {
        return this._isJumping;
    }
    public set isJumping(value: boolean) {
        this._isJumping = value;
    }
    
    @property(cc.Float)
    public jumpForce: number = 0;

    @property(cc.Float)
    public walkForce: number = 0;

    @property(cc.Float)
    public maxSpeed: number = 0;

    public rigidBody: cc.RigidBody;

    onLoad () {
        this.rigidBody = this.getComponent(cc.RigidBody);
    }

    start () {

    }

    // update (dt) {}
}
