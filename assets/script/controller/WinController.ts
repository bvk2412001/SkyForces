import { _decorator, Component, Node, Label, Socket, director } from 'cc';
import { Configs } from '../utils/Configs';
import { PlayerData } from '../utils/PlayerData';
import { PreData } from '../utils/PreData';
const { ccclass, property } = _decorator;

@ccclass('WinController')
export class WinController extends Component {
    @property(Label)
    private scoreLabel: Label
    onClickNextLevel(){
        PreData.instant.level++;
        PreData.instant.cameraPosisionY = 0;
        PlayerData.saveDataStorage(Configs.KEY_STORAGE_SCORE, PreData.instant.score);
        director.loadScene(Configs.GAME_SCENE_NAME);
    }

    setUp(){
        this.scoreLabel.string = "" + PreData.instant.score;
    }
}


