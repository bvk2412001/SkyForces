import { _decorator, Component, dragonBones, instantiate, Node, NodePool, Prefab, Camera, Vec3 } from 'cc';
import { Utils } from '../utils/Utils';
import { ResourceUtils } from '../utils/ResourceUtils';
import { BulletPlayer } from './BulletPlayer';
import { Configs } from '../utils/Configs';
import { PreData } from '../utils/PreData';
const { ccclass, property } = _decorator;

@ccclass('PlayerPlane')
export class PlayerPlane extends Component {
    @property(Node)
    private planeBody: Node;

    private typePlane: number;
    private bulletBoll;
    onLoad() {
        this.node.active = false;
    }

    setUp(typePlane, bulletPlayer) {
        this.typePlane = typePlane - 1;
        let armatureDisplay = this.planeBody.getComponent(dragonBones.ArmatureDisplay);
        let armature = armatureDisplay!.armature();
        let slots = armature.getSlots();
        slots[0].displayIndex = this.typePlane;
        this.node.active = true;
        this.bulletBoll = bulletPlayer;

    }

    fire() {
        let bullet = this.bulletBoll.get();
        this.node.parent.addChild(bullet);
        console.log(bullet)
        bullet.setPosition(this.node.getPosition())
    }


}


