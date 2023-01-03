import { _decorator, Component, director, Node } from 'cc';
import { Configs } from '../utils/Configs';
import { PreData } from '../utils/PreData';
import { Utils } from '../utils/Utils';
const { ccclass, property } = _decorator;

@ccclass('MenuController')
export class MenuController extends Component {
    @property(Node)
    selectNode: Node;


    onClickShowSelectPlane(){
        this.selectNode.active = true;
    }

    onclickPlayGame(event, args){
        PreData.instant.typePlayerPlane = args;
        director.loadScene(Configs.GAME_SCENE_NAME);
    }
}


