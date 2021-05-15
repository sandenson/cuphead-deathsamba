// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Cuphead from "../../Actor/Cuphead/Cuphead";
import DIRECTION, { DIRECTIONS } from "../../Actor/DIRECTION";
import KeyboardController from "../KeyboardController";
import GAME_STATE from "./GAME_STATE";

const {ccclass, property} = cc._decorator;

@ccclass
export default class InGameKeyboardController extends KeyboardController {

    private endgameScreen: cc.Node;

    private _score: number = 0;

    public get score() {
        return this._score;
    }

    public set score(increment: number) {
        if (this.gameState == GAME_STATE.playing) {
            this._score += increment;
            this.scoreLabel.string = "Pontuação: " + this.score;

            if (this.score < 0) this.gameState = GAME_STATE.lost;
        }
    }

    private _gameState: GAME_STATE = GAME_STATE.playing;

    public get gameState() {
        return this._gameState;
    }

    public set gameState(newState: GAME_STATE) {
        this._gameState = newState;
        if (newState == GAME_STATE.won) this.winGame();
        if (newState == GAME_STATE.lost) this.loseGame();
    }

    private pressedKeys: boolean[] = [];

    @property(cc.Label)
    public label: cc.Label = null;

    @property(cc.Label)
    public scoreLabel: cc.Label = null;

    @property(cc.Node)
    public itemsNode: cc.Node = null;

    @property(Cuphead)
    public cuphead: Cuphead = null;

    public onKeyDown(event: cc.Event.EventKeyboard) {
        if (this.gameState === GAME_STATE.playing) {
            console.log("down");

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

        if (this.gameState == GAME_STATE.endgame) {
            switch (event.keyCode) {
                case cc.macro.KEY.escape:
                    cc.director.loadScene('menu');
                    break;
                case cc.macro.KEY.r:
                    cc.director.loadScene('main');
                    break;
            }
        }
    }

    public onKeyUp(event: cc.Event.EventKeyboard) {
        if (this.gameState === GAME_STATE.playing) {
            console.log("up");

            switch (event.keyCode) {
                case cc.macro.KEY.a || cc.macro.KEY.left:
                    delete this.pressedKeys['LEFT']
                    break;
                case cc.macro.KEY.d || cc.macro.KEY.right:
                    delete this.pressedKeys['RIGHT']
                    break;
            }
        }
    }

    private winGame() {
        this.label.string = "Ganhaste!!1!"
        this.scoreLabel.string = "Prontuação final: " + this.score;
        this.playVictoryAnim();
    }

    private loseGame() {
        this.label.string = "Perdeste."
        this.scoreLabel.string = "Prontuação final: " + this.score;
        this.playDefeatAnimation();
    }

    private moveUI() {
        this.label.node.runAction(cc.moveTo(0.5, cc.v2(this.cuphead.node.x, this.label.node.y)));
        this.scoreLabel.node.runAction(cc.moveTo(0.5, cc.v2(this.cuphead.node.x, this.scoreLabel.node.y)));
        this.endgameScreen.runAction(cc.moveTo(0, cc.v2(this.cuphead.node.x, this.endgameScreen.y)));
    }
    
    private playVictoryAnim() {
        this.moveUI();
        this.cuphead.getComponent(cc.Animation).play("Idle");
        this.cuphead.node.runAction(cc.spawn(cc.repeatForever(cc.sequence(cc.callFunc(() => this.cuphead.jump()), cc.delayTime(2))), cc.sequence(cc.delayTime(5), cc.callFunc(() => {
            this.cuphead.node.parent.getComponent(cc.Animation).play("Endgame");
            this.gameState = GAME_STATE.endgame;
            console.log("endgame");
        }))));
    }

    private playDefeatAnimation() {
        this.moveUI();
        this.cuphead.getComponent(cc.Animation).play("Defeat");
        this.cuphead.getComponent(cc.PhysicsBoxCollider).destroy();
        this.cuphead.getComponent(cc.RigidBody).destroy();
        this.cuphead.node.runAction(cc.spawn(cc.moveTo(10, cc.v2(this.cuphead.node.x, this.cuphead.node.x + 1000)), cc.sequence(cc.delayTime(5), cc.callFunc(() => {
            this.cuphead.node.parent.getComponent(cc.Animation).play("Endgame");
            this.gameState = GAME_STATE.endgame;
            console.log("endgame");
        }))));
    }

    public start () {
        this.endgameScreen = this.cuphead.node.parent.getChildByName("EndgameScreen");
    }

    public update (dt) {
        if (this.gameState == GAME_STATE.playing) {
            if ('LEFT' in this.pressedKeys) {
                this.cuphead.move(DIRECTIONS.left);
            }
            if ('RIGHT' in this.pressedKeys) {
                this.cuphead.move(DIRECTIONS.right);
            }
            if (this.itemsNode.children.length == 0) this.gameState = GAME_STATE.won;
        }
    }
}
