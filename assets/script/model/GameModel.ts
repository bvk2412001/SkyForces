import { _decorator, Component, instantiate, Node, Prefab, Label } from 'cc';
import { ResourceUtils } from '../utils/ResourceUtils';
import { Utils } from '../utils/Utils';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property(Node)
    gamePlayNode: Node | null = null;
    @property(Label)
    lblScore: Label;
    @property(Label)
    lblLevel: Label

    public score : number = 0;
    public level : number = 1;
    public playerPlane: Node
    public levelCurrent: Node

    public loadLevelMap(finishcallback){
        ResourceUtils.loadPrefab("level/level1", (prefab : Prefab)=>{
            this.levelCurrent = instantiate(prefab);
            this.gamePlayNode.addChild(this.levelCurrent);
            finishcallback();
        })
    }

    public loadPlayerPlane(callback) {
        ResourceUtils.loadPrefab("prefab/playerPlane", (prefab: Prefab) => {
            this.playerPlane = instantiate(prefab);
            this.gamePlayNode.addChild(this.playerPlane);
            Utils.Log(this.playerPlane);
            callback();
        })
    }
}


