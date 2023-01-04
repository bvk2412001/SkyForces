import { _decorator, Component, Node } from 'cc';
import { bulletInf } from '../interface/bulletInf';
const { ccclass, property } = _decorator;

@ccclass('BulletEnemy')
export class BulletEnemy extends Component {
    callback: CallableFunction;
    colliderCallback: CallableFunction;
    damage: number = 10;
    speed: number = 10;
    setUp(callback: any, colliderCallback: any) {
        this.callback = callback;
        this.colliderCallback = colliderCallback;
    }

    public getDamage(){
        return this.damage;
    }

    update(deltaTime: number) {
        if(!this.node) return;
        if(this.callback)
        this.callback(this);
    }
}


