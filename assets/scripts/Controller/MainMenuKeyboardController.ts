// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import MenuItems from "../UI/MenuItems";
import KeyboardController from "./KeyboardController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainMenuKeyboardController extends KeyboardController {

    @property(MenuItems)
    public menuItems: MenuItems = null;

    public onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.w || cc.macro.KEY.up:
                this.menuItems.selectUp();
                break;
            case cc.macro.KEY.s || cc.macro.KEY.down:
                this.menuItems.selectDown();
                break;
            case cc.macro.KEY.enter:
                this.menuItems.selectOption();
                break;
            default:
                break;
        }
    }

    public onKeyUp(event: cc.Event.EventKeyboard) {
        
    }

    start () {

    }

    // update (dt) {}
}
