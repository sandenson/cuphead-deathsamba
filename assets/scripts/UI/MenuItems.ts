// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import iLabelAndName from "./iLabelAndName";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MenuItems extends cc.Component {
    
    private labelsList: iLabelAndName[] = [];

    private _selectedIndex: number = 0;

    private get selectedIndex() {
        return this._selectedIndex;
    }

    private set selectedIndex(newIndex: number) {
        this.labelsList[this.selectedIndex].label.node.opacity = 150;
        this.labelsList[newIndex].label.node.opacity = 255;
        this._selectedIndex = newIndex;
    }

    // LIFE-CYCLE CALLBACKS:

    public onLoad () {
        this.labelsList = this.node.children.map((c) => {
            return {
                label: c.getComponent(cc.Label),
                name: c.getComponent(cc.Label).string
            };
        });
        this.selectedIndex = 0;
    }

    public selectUp() {
        if (this.selectedIndex > 0) this.selectedIndex--;
        else this.selectedIndex =  this.labelsList.length - 1;
    }

    public selectDown() {
        if (this.selectedIndex < this.labelsList.length - 1) this.selectedIndex++;
        else this.selectedIndex = 0;
    }

    public selectOption() {
        if (this.labelsList[this.selectedIndex].name == "START") {
            cc.director.loadScene('main');
        }
        if (this.labelsList[this.selectedIndex].name == "OPTIONS") {
            this.getComponent(cc.AudioSource).play();
        }
        if (this.labelsList[this.selectedIndex].name == "EXIT") {
            cc.game.end();
        }
    }

    start () {

    }

    // update (dt) {}
}
