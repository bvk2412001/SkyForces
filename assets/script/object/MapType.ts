import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MapType')
export class MapType{
    @property({type: Vec3})
    possitionBoss: Vec3;

    @property({type: Vec3})
    positionMap: Vec3; 
    
    @property({type:Vec3})
    listPositionEnemy: Vec3[] = [];
}   


