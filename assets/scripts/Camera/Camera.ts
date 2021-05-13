// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    public player: cc.Node = null;

    @property(cc.Node)
    public boundary: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    start() {
        this.node.x = this.player.x;
    }

    // onLoad () {}

    update (dt) {
        const targetPosition = this.player.x;

        const boundaryX = this.node.parent.convertToWorldSpaceAR(this.boundary.getPosition()).x;
        const finalBoundaryX = (this.boundary.width * this.boundary.scaleX) - this.node.parent.width;

        this.node.x = cc.misc.clampf(cc.misc.lerp(this.node.x, targetPosition, 0.1), boundaryX, finalBoundaryX);
    }
}
