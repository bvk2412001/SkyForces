import { _decorator, Component, EventTouch, Input, input, instantiate, Node, NodePool, Prefab, Vec3, Camera } from 'cc';
import { GameModel } from '../model/GameModel';
import { Utils } from '../utils/Utils';
import { PlayerPlane } from '../object/PlayerPlane';
import { PreData } from '../utils/PreData';
import { Configs } from '../utils/Configs';
import { ResourceUtils } from '../utils/ResourceUtils';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Node)
    private gameModel: Node;
    @property(Camera)
    private gameCamera: Camera;


    private gamemodel: GameModel;
    private planePlayer;

    start() {
        this.gamemodel = this.gameModel.getComponent(GameModel);
        this.gamemodel.loadLevelMap(()=>{
            this.loadPlayer();
        });
        
        input.on(Input.EventType.TOUCH_MOVE, this.TouchMovePlane, this);
    }


    

    private TouchMovePlane(event: EventTouch){
        let location = event.getUILocation();
        let c = this.planePlayer.getPosition();
        let loc = new Vec3(location.x - Configs.HALF_SCENE_WIDTH, this.gameCamera.node.position.y + (location.y  - Configs.HALF_SCENE_HEIGHT), 0);
        this.planePlayer.setPosition(loc);
       

    }

    private loadPlayer(){
        this.gamemodel.loadPlayerPlane(()=>{
            this.beginLevel();
         });
    }

    private beginLevel(){
        this.planePlayer = this.gamemodel.playerPlane
        this.planePlayer.getComponent(PlayerPlane).setUp(PreData.instant.typePlayerPlane, (newY)=>{
            this.moveCamera(newY)
        });
    }
    private moveCamera(newY){
        this.gameCamera.node.setPosition(0, newY, 1000);
    }
    
    update(deltaTime: number){
    }
}


