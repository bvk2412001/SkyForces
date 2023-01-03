import { _decorator, Component, Node } from 'cc';
import { bulletInf } from '../interface/bulletInf';
const { ccclass, property } = _decorator;

@ccclass('BulletEnemy')
export class BulletEnemy extends Component implements bulletInf{
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

    
    setUp(callback, colliderCallback) {
        
    }

    update(deltaTime: number) {
        this.callback(this);
    }
}


