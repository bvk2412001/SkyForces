import { _decorator, Component, Node, Prefab, instantiate, NodePool } from 'cc';
import { MapType } from '../object/MapType';
import { Configs } from '../utils/Configs';
import { ResourceUtils } from '../utils/ResourceUtils';
import { MapController } from './MapController';
const { ccclass, property } = _decorator;

@ccclass('LevelController')
export class LevelController extends Component {
    @property(MapType)
    listMapType: MapType[] = [];

    private mapPre: Prefab;
    setUp(bulletBoll) {
        ResourceUtils.loadPrefab(Configs.PATH_MAP, (prefab: Prefab) => {
            console.log(this.listMapType)
            this.mapPre = prefab;
            this.listMapType.forEach(element => {
                let map = instantiate(this.mapPre);
                map.getComponent(MapController).setUp(element.possitionBoss,element.listPositionEnemy, bulletBoll);
                this.node.addChild(map);
                map.setPosition(element.positionMap);

            })
        })
    }
}


