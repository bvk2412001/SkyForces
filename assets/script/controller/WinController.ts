import { _decorator, Component, Node, Label, Socket, director } from 'cc';
import { Configs } from '../utils/Configs';
import { PreData } from '../utils/PreData';
const { ccclass, property } = _decorator;

@ccclass('WinController')
export class WinController extends Component {
    @property(Label)
    private scoreLabel: Label
    isWin;
    onClickNextLevel(){
        PreData.instant.level++;
        PreData.instant.cameraPosisionY = 0;
        director.loadScene(Configs.GAME_SCENE_NAME);
    }

    setUp(isGameWin){
        this.isWin = isGameWin;
    }
}


