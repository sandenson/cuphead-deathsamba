// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Cuphead from "../../Actor/Cuphead/Cuphead";
import DIRECTION, { DIRECTIONS } from "../../Actor/DIRECTION";
import KeyboardController from "../KeyboardController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class InGameKeyboardController extends KeyboardController {

    private _score: number = 0;

    public get score() {
        return this._score;
    }

    public set score(increment: number) {
        this._score += increment;
        this.scoreLabel.string = this.score.toString();
    }

    private pressedKeys: boolean[] = [];

    @property(cc.Label)
    scoreLabel: cc.Label = null;

    @property(Cuphead)
    public cuphead: Cuphead = null;

    public onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                this.cuphead.jump();
                break;
            case cc.macro.KEY.a || cc.macro.KEY.left:
                this.pressedKeys['LEFT'] = true;
                break;
            case cc.macro.KEY.d || cc.macro.KEY.right:
                this.pressedKeys['RIGHT'] = true;
                break;
        }
    }

    public onKeyUp(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                this.cuphead.jump();
                break;
            case cc.macro.KEY.a || cc.macro.KEY.left:
                delete this.pressedKeys['LEFT']
                break;
            case cc.macro.KEY.d || cc.macro.KEY.right:
                delete this.pressedKeys['RIGHT']
                break;
        }
    }

    start () {

    }

    update (dt) {
        if ('LEFT' in this.pressedKeys) {
            this.cuphead.move(DIRECTIONS.left);
        }
        if ('RIGHT' in this.pressedKeys) {
            this.cuphead.move(DIRECTIONS.right);
        }
    }
}
