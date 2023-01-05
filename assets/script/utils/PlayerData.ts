import { _decorator, Component, Node, sys, ValueType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerData')
export class PlayerData extends Component {
    public static GAME_ID = "SkyForce_241";

    public static saveDataStorage(key, value){
        sys.localStorage.setItem(key + PlayerData.GAME_ID, value);
    }

    public static getDataStorage(key){
        const data = sys.localStorage.getItem(key + PlayerData.GAME_ID);
        return data;
    }
}


