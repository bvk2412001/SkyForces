import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PreData')
export class PreData extends Component {
    public static instant: PreData ;
    public typePlayerPlane: number;
    public cameraPosisionY = 0;
    public level: number = 1;
    public score: number = 0;
    start(){
        if(PreData.instant == null){
            PreData.instant = this;
            director.addPersistRootNode(this.node);
        }
    }
}


