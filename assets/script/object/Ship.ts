import { _decorator, Component, Node, input, Collider2D, Contact2DType, IPhysics2DContact, ProgressBar, NodePool, instantiate, Prefab, Vec3, Camera } from 'cc';
import { Configs } from '../utils/Configs';
import { PreData } from '../utils/PreData';
import { ResourceUtils } from '../utils/ResourceUtils';

import { BulletEnemy } from './BulletEnemy';
import { BulletPlayer } from './BulletPlayer';
const { ccclass, property } = _decorator;

@ccclass('Ship')
export class Ship extends Component {
    @property(ProgressBar)
    progessBar: ProgressBar;

    private healthCurrentShip: number = 10;
    private healthFullShip: number = 10;
    private bulletBoll;
    private setScore;

    start() {
        let collect = this.node.getComponent(Collider2D);
        if (collect) {
            collect.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }


    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (this.node) {
            if (otherCollider.name.includes(Configs.BULLET_PLAYER_NAME)) {
                let bullet = otherCollider.node;
                this.healthCurrentShip -= bullet.getComponent(BulletPlayer).getDamage();
                this.progessBar.progress = this.healthCurrentShip / this.healthFullShip;
                if (this.healthCurrentShip <= 10) {
                    PreData.instant.score += 10;

                    this.setScore();
                    console.log(this.setScore());
                    this.node.destroy();
                }

                bullet.getComponent(BulletPlayer).bulletPlayerPool.put(bullet);
                
            }
        }
    }

    setUp(bulletEnemyBoll, setScore: CallableFunction) {
        this.setScore = setScore;
        console.log(this.setScore)
        console.log(this.setScore());
        this.bulletBoll = bulletEnemyBoll;
        
    }

    private fire() {
        let bullet = this.bulletBoll.get();
        this.node.parent.parent.parent.addChild(bullet);
        bullet.setWorldPosition(this.node.getWorldPosition());
    }


    timeCount = 0;
    update(deltaTime: number) {
        this.timeCount += deltaTime;
        if (this.bulletBoll) {
            if (this.timeCount >= 2) {
                if (this.node.getWorldPosition().y > PreData.instant.cameraPosisionY + 200) {
                    this.fire();
                    this.timeCount = 0;
                }
            }
        }
    }
}


