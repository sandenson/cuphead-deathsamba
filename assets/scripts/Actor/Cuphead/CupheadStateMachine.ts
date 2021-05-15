// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GAME_STATE from "../../Controller/Cuphead/GAME_STATE";
import StateMachine from "../../Utils/StateMachine";
import Cuphead from "./Cuphead";
import PLAYER_STATE from "./PLAYER_STATES";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CupheadStateMachine extends StateMachine<Cuphead> {
    public onAnimationEnd(animation: string) {
        throw new Error("Method not implemented.");
    }
    public onAnimationStart(animation: string) {
        throw new Error("Method not implemented.");
    }
    public update(dt: any) {
        if (this.actor.controller.gameState != GAME_STATE.lost && this.actor.controller.gameState != GAME_STATE.endgame) {
            if ((!this.actor.isJumping && this.actor.state == PLAYER_STATE.jumping)) this.actor.state = PLAYER_STATE.idle;
            if (!this.actor.isJumping && this.actor.rigidBody.linearVelocity.x == 0) this.actor.state = PLAYER_STATE.idle;
        } else {
            this.actor.state = PLAYER_STATE.idle;
        }
    }

}
