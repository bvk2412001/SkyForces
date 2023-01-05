import { _decorator, Component, EventTouch, Input, input, instantiate, Node, NodePool, Prefab, Vec3, Camera, director } from 'cc';
import { GameModel } from '../model/GameModel';
import { Utils } from '../utils/Utils';
import { PlayerPlane } from '../object/PlayerPlane';
import { PreData } from '../utils/PreData';
import { Configs } from '../utils/Configs';
import { ResourceUtils } from '../utils/ResourceUtils';
import { BulletEnemy } from '../object/BulletEnemy';
import { WinController } from './WinController';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Node)
    private gameModel: Node;
    @property(Camera)
    private gameCamera: Camera;


    private gamemodel: GameModel;
    private planePlayer;
    private isGameWin: boolean = false

    onLoad() {
        this.gamemodel = this.gameModel.getComponent(GameModel);
        this.loadMap();
    }
    start() {
        input.on(Input.EventType.TOUCH_MOVE, this.TouchMovePlane, this);
    }

    private TouchMovePlane(event: EventTouch) {
        let location = event.getUILocation();
        let loc = new Vec3(location.x - Configs.HALF_SCENE_WIDTH, this.gameCamera.node.position.y + (location.y - Configs.HALF_SCENE_HEIGHT), 0);
        this.planePlayer.setPosition(loc);

    }
    private loadMap() {
        this.gamemodel.loadLevelMap(() => {
            this.loadPlayer();
        }, () => { this.showWinUI() });
    }
    private loadPlayer() {
        this.gamemodel.loadPlayerPlane(() => {
            this.beginLevel();
        });
    }

    private beginLevel() {
        this.planePlayer = this.gamemodel.playerPlane;
        this.planePlayer.getComponent(PlayerPlane).setUp(PreData.instant.typePlayerPlane, this.gamemodel.bulletPlayer);
    }

    private showWinUI() {
        this.isGameWin = true;
        ResourceUtils.loadPrefab(Configs.PATH_WINUI, (prefab: Prefab) => {
            let winUI = instantiate(prefab);
            winUI.getComponent(WinController).setUp();
            this.gameCamera.node.addChild(winUI);
        })
    }

    private timeCount = 0;
    private oldy: number;


    update(deltaTime: number) {
        if (this.isGameWin) return;
        if (this.planePlayer) {
            this.timeCount += deltaTime;
            if (this.timeCount >= 0.4) {
                this.planePlayer.getComponent(PlayerPlane).fire();
                this.timeCount = 0;
            }
        }

        if (PreData.instant.cameraPosisionY < 2560) {
            if (this.planePlayer) {
                this.planePlayer.translate(new Vec3(0, 1, 0))
                this.gameCamera.node.translate(new Vec3(0, 1, 0));
            }
        }
    }
}


