import { _decorator, Component, Node, Vec3 } from 'cc';
import { bulletInf } from '../interface/bulletInf';
import { Configs } from '../utils/Configs';
const { ccclass, property } = _decorator;

@ccclass('BulletPlayer')
export class BulletPlayer extends Component{
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
        if(!this) return;
        this.callback(this);
    }
}


