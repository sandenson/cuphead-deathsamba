// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Cuphead from "../../../Actor/Cuphead/Cuphead";
import DIRECTION, { DIRECTIONS } from "../../../Actor/DIRECTION";
import GAME_STATE from "../../Cuphead/GAME_STATE";
import AIController from "../AIController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CupheadAIController extends AIController<Cuphead> {

    private currentDirection: DIRECTION = DIRECTIONS.left;

    public update(dt) {
        if (this.actor.controller.gameState == GAME_STATE.playing) this.actor.move(this.currentDirection);
    }

    public start() {
        this.actor = this.getComponent(Cuphead);
        this.currentDirection = this.actor.facing;
        this.startMovement();
    }

    private startMovement() {
        this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(2.2), cc.callFunc(() => this.switchDirections()))));
    }

    private switchDirections() {
        if (this.actor.controller.gameState == GAME_STATE.playing) {
            if (JSON.stringify(this.currentDirection) == JSON.stringify(DIRECTIONS.left)) {
                this.currentDirection = DIRECTIONS.right;
                this.actor.move(this.currentDirection);
            } 
            else if (JSON.stringify(this.currentDirection) != JSON.stringify(DIRECTIONS.left)) {
                this.currentDirection = DIRECTIONS.left;
                this.actor.move(this.currentDirection);
            }
        }
    }
}
