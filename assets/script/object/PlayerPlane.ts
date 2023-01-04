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
    private callback;
    private bulletBoll;
    onLoad() {
        this.node.active = false;
    }

    setUp(typePlane: number, callback) {
        this.typePlane = typePlane - 1;
        let armatureDisplay = this.planeBody.getComponent(dragonBones.ArmatureDisplay);
        let armature = armatureDisplay!.armature();
        let slots = armature.getSlots();
        slots[0].displayIndex = this.typePlane;
        this.node.active = true;
        this.callback = callback;
        this.createBullet();
    }

    private createBullet() {
        ResourceUtils.loadPrefab("prefab/PlayerBullet1", (prefab: Prefab) => {
            this.bulletBoll = new NodePool();
            for (let i = 0; i < 100; i++) {
                let bulletPre = instantiate(prefab);
                bulletPre.getComponent(BulletPlayer).setUp((bullet: BulletPlayer) => {
                    this.addNewBullet(bullet);
                }, (bullet) => {
                    this.addBullet(bullet);
                })
                this.bulletBoll.put(bulletPre);
            }
        })
    }

    private addBullet(bullet) {
        this.bulletBoll.put(bullet);
    }

    private addNewBullet(bullet) {
        let bulletPossi = bullet.node.getWorldPosition();
        if (bulletPossi.y > PreData.instant.cameraPosisionY + 1200)
            this.bulletBoll.put(bullet.node);
        else {
            bullet.node.translate(new Vec3(0, 3.5, 0));
        }
    }
    private fire() {
        let bullet = this.bulletBoll.get();
        
        this.node.parent.addChild(bullet);
        bullet.setPosition(this.node.getPosition())
    }

    private timeCount = 0;
    private oldy: number;
    update(deltaTime: number) {
        this.timeCount += deltaTime;
        if (this.timeCount >= 0.4) {
            this.fire();
            this.timeCount = 0;
        }
        if (PreData.instant.cameraPosisionY < 2560) {
            PreData.instant.cameraPosisionY += Configs.RUNTIME;
            this.oldy = this.node.position.y;
            this.oldy += Configs.RUNTIME;
            this.node.setPosition(new Vec3(this.node.position.x, this.oldy, 0))
            this.callback(PreData.instant.cameraPosisionY);
        }
    }

}


