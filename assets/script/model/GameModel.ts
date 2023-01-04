import { _decorator, Component, instantiate, Node, Prefab, Label, NodePool, Vec3 } from 'cc';
import { LevelController } from '../controller/LevelController';
import { BulletEnemy } from '../object/BulletEnemy';
import { Configs } from '../utils/Configs';
import { PreData } from '../utils/PreData';
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
    public bulletEnemyPool = new NodePool();

    onLoad(){
        this.bulletEnemyPool = new NodePool();
        ResourceUtils.loadPrefab("prefab/PlayerBullet3", (prefab: Prefab) => {
           
            for (let i = 0; i < 50; i++) {
                let bulletPre = instantiate(prefab);
                this.bulletEnemyPool.put(bulletPre)
                bulletPre.getComponent(BulletEnemy).setUp((bullet: BulletEnemy) => {
                    this.addNewBullet(bullet);
                }, (bullet) => {
                    this.addBullet(bullet);
                })
                
            }

        })
    }

    private addBullet(bullet) {
        this.bulletEnemyPool.put(bullet);
    }

    private addNewBullet(bullet) {
        let bulletPossi = bullet.node.getWorldPosition();

        if (bullet.node.getWorldPosition().y < PreData.instant.cameraPosisionY - 200) {
            this.bulletEnemyPool.put(bullet.node);
        }
        else {
            bullet.node.translate(new Vec3(0, -1, 0));
        }
    }

    public loadLevelMap(finishcallback){
        ResourceUtils.loadPrefab(Configs.PATH_LEVEL + PreData.instant.level, (prefab : Prefab)=>{
            this.levelCurrent = instantiate(prefab);
            this.levelCurrent.getComponent(LevelController).setUp(this.bulletEnemyPool);
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


