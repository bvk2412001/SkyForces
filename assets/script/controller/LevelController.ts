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

    setUp(bulletBoll, winUI, setScore: CallableFunction) {
        ResourceUtils.loadPrefab(Configs.PATH_MAP, (prefab: Prefab) => {
            this.mapPre = prefab;
            let index = 1;
            this.listMapType.forEach(element => {
                let map = instantiate(this.mapPre);
                if(index != this.listMapType.length){
                    element.possitionBoss = undefined;
                }
                map.getComponent(MapController).setUp(element.possitionBoss,element.listPositionEnemy, bulletBoll, winUI, setScore);
                this.node.addChild(map);
                map.setPosition(element.positionMap);
                index++;
            })
        })
    }
}


