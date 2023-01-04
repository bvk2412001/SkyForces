import { _decorator, Component, Node, Vec3 } from 'cc';
import { bulletInf } from '../interface/bulletInf';
import { Configs } from '../utils/Configs';
import { PreData } from '../utils/PreData';
const { ccclass, property } = _decorator;

@ccclass('BulletPlayer')
export class BulletPlayer extends Component{
    callback: CallableFunction;
    colliderCallback: CallableFunction;
    damage: number = 10;
    speed: number = 10;
    bulletPlayerPool

    setUp(bulletPlayerPool) {
        this.bulletPlayerPool = bulletPlayerPool;
       
    }

    public getDamage(){
        return this.damage;
    }

    private timelife = 0
    update(deltaTime: number) {
        this.timelife += deltaTime;
        if(this.timelife > 5){
            this.bulletPlayerPool.put(this.node);   
            this.timelife = 0;
        }
        this.node.translate(new Vec3(0, 3, 0));
    }
}


