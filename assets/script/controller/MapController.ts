import { _decorator, Component, Node, Vec3, Prefab, instantiate } from 'cc';
import { bulletInf } from '../interface/bulletInf';
import { BossController } from '../object/BossController';
import { Ship } from '../object/Ship';
import { Configs } from '../utils/Configs';
import { ResourceUtils } from '../utils/ResourceUtils';
const { ccclass, property } = _decorator;

@ccclass('MapController')
export class MapController extends Component {


    private enemy: Prefab;

    onLoad() {
        this.loadPreEnemy();
    }
    start() {

    }

    setUp(positionMap, listPositionEnemy, bulletEnemyBoll, winUI) {
        ResourceUtils.loadPrefab(Configs.PATH_ENEMY, (prefab: Prefab) => {
            this.enemy = prefab;
            if (positionMap != undefined) {
                ResourceUtils.loadPrefab(Configs.PATH_BOSS, (prefab: Prefab) => {
                    let enemyBoss = instantiate(prefab);
                    enemyBoss.getComponent(BossController).setUp(winUI);
                    this.node.addChild(enemyBoss);
                    enemyBoss.setPosition(positionMap);
                 
                })
            }
            listPositionEnemy.forEach(element => {
                let enemyNew = instantiate(this.enemy);
                enemyNew.getComponent(Ship).setUp(bulletEnemyBoll);
                this.node.addChild(enemyNew);
                enemyNew.setPosition(element);
            });
        })
        
    }


    private loadPreEnemy() {

    }


}


