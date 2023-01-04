import { _decorator, Component, Node, Vec3, Prefab, instantiate } from 'cc';
import { bulletInf } from '../interface/bulletInf';
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

    setUp(positionMap, listPositionEnemy, bulletEnemyBoll) {
        ResourceUtils.loadPrefab(Configs.PATH_ENEMY, (prefab: Prefab) => {
            this.enemy = prefab;

            listPositionEnemy.forEach(element => {
                let enemyNew = instantiate(this.enemy);
                enemyNew.getComponent(Ship).setUp(bulletEnemyBoll);
                this.node.addChild(enemyNew);
                enemyNew.setPosition(element);
            });
        })
        if (positionMap != undefined) {
            ResourceUtils.loadPrefab(Configs.PATH_BOSS, (prefab: Prefab) => {
                let enemyBoss = instantiate(prefab);
                this.node.addChild(enemyBoss);
                enemyBoss.setPosition(positionMap);
            })
        }
    }


    private loadPreEnemy() {

    }


}


