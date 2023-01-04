import { _decorator, Component, Node, Prefab, instantiate, Vec3 } from 'cc';
import { bulletInf } from '../interface/bulletInf';
import { ResourceUtils } from '../utils/ResourceUtils';
const { ccclass, property } = _decorator;

@ccclass('BulletEnemy')
export class BulletEnemy extends Component {
    enemyBulletPool

    damage: number = 10;
    speed: number = 10;

    setUp(enemyBulletPool) {
        this.enemyBulletPool = enemyBulletPool;
    }

    public getDamage() {
        return this.damage;
    }
    private lifeTime = 0;
    update(deltaTime: number) {
        this.lifeTime += deltaTime;
        if(this.lifeTime > 2){
            this.enemyBulletPool.put(this.node);
            this.lifeTime = 0;
        }
        else{
            this.node.translate(new Vec3(0, -1, 0));
        }
    }
}


