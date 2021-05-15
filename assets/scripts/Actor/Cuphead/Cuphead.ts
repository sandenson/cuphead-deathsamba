// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import InGameKeyboardController from "../../Controller/Cuphead/InGameKeyboardController";
import Actor from "../Actor";
import DIRECTION, {DIRECTIONS} from "../DIRECTION";
import { IWalkingActor } from "../IWalkingActor";
import PLAYER_STATE from "./PLAYER_STATES";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Cuphead extends Actor implements IWalkingActor {

    // onLoad () {}
    @property(InGameKeyboardController)
    public controller: InGameKeyboardController = null;

    @property(cc.Prefab)
    public jumpParticles: cc.Prefab = null;

    public facing: DIRECTION = DIRECTIONS.right;

    private _state: PLAYER_STATE = PLAYER_STATE.idle;

    public get state() {
        return this._state;
    }

    public set state(newState: PLAYER_STATE) {
        if (this._state != newState) {
            this.getComponent(cc.Animation).play(newState);
            this._state = newState;
        }
    }

    private onBeginContact(contact: any, self: cc.Collider, other: cc.Collider) {
        if (self.tag == 2 && this.isJumping) {
            this.isJumping = false;
            const particles = cc.instantiate(this.jumpParticles);
            particles.x = this.node.x;
            particles.y = this.node.y - 30;
            this.node.getParent().addChild(particles);
        }

        if (other.tag == 1) {
            this.controller.score = -200;
        }
    }

    public jump() {
        console.log("jump");

        if (!this.isJumping) {
            this.state = PLAYER_STATE.jumping;
            this.isJumping = true;
            this.rigidBody.applyForceToCenter(cc.v2(0, this.jumpForce), true);
        }
    }

    move(direction: DIRECTION) {
        
        if (!this.isJumping) {
            this.movePlayer(direction);
            if (direction != this.facing) {
                this.turnAround(direction);
            } else {
                if (!this.isJumping) {
                    this.state = PLAYER_STATE.running;
                }
            }
        }
    }
    
    private movePlayer(direction: DIRECTION) {
        // console.log("move");
        if (Math.abs(this.rigidBody.linearVelocity.x) < this.maxSpeed && Math.abs(this.rigidBody.linearVelocity.y) < this.maxSpeed) {
            this.rigidBody.applyForceToCenter(cc.v2(direction.x * this.walkForce, direction.y * this.walkForce), true);
        }
    }

    private turnAround(direction: DIRECTION) {
        this.node.scaleX = this.node.scaleX * -1;
        this.facing = direction;
    }
}
