import { _decorator, Component, Node, input, Collider2D, Contact2DType, IPhysics2DContact, ProgressBar, NodePool, instantiate, Prefab, Vec3 } from 'cc';
import { Configs } from '../utils/Configs';
import { PreData } from '../utils/PreData';
import { ResourceUtils } from '../utils/ResourceUtils';

import { BulletEnemy } from './BulletEnemy';
import { BulletPlayer } from './BulletPlayer';
const { ccclass, property } = _decorator;

@ccclass('Ship')
export class Ship extends Component {
    @property(ProgressBar)
    progessBar:ProgressBar;

    private healthCurrentShip: number = 10;
    private healthFullShip : number = 10;
    private bulletBoll = new NodePool;

    start() {
       // this.createBulletEnemy();
        let collect = this.node.getComponent(Collider2D);
        if(collect){
            collect.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        

    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        if(this.node){
            if(otherCollider.name.includes(Configs.BULLET_PLAYER_NAME)){
                let bullet = otherCollider.node;
                this.healthCurrentShip -= bullet.getComponent(BulletPlayer).getDamage();
                this.progessBar.progress = this.healthCurrentShip/this.healthFullShip;
                if(this.healthCurrentShip <= 10){
                    this.node.destroy();
                }
                bullet.getComponent(BulletPlayer).colliderCallback(bullet);
            }
        }
    }

    createBulletEnemy(){
        ResourceUtils.loadPrefab("prefab/PlayerBullet3", (prefab: Prefab) => {
            this.bulletBoll = new NodePool();
            for (let i = 0; i < 20; i++) {
                let bullet = instantiate(prefab);
                bullet.getComponent(BulletEnemy).setUp((bullet: BulletEnemy) => {
                    this.addNewBullet(bullet);
                }, (bullet) => {
                    this.addBullet(bullet);
                })
                this.bulletBoll.put(bullet);
            }
        })
    }

    private addBullet(bullet) {
        this.bulletBoll.put(bullet);
    }

    private addNewBullet(bullet) {
       if(bullet.node.position.y < PreData.instant.cameraPosisionY - 300){
        this.bulletBoll.put(bullet.node);
       }
        else {
            bullet.node.translate(new Vec3(0, -0.1, 0));
       }
    }
    count = 1
    private fire() {
        let bullet = this.bulletBoll.get();
        this.node.parent.parent.parent.addChild(bullet);

        bullet.setPosition(this.node.position.x, this.node.position.y + PreData.instant.cameraPosisionY - this.count)


    }
    timeCount = 0;

    update(deltaTime: number) {
        this.timeCount += deltaTime;
        if (this.timeCount >= 0.4) {
            this.fire();
            this.timeCount = 0;
        }
    }
}


