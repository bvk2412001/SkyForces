import { _decorator, Component, director, Node, ProgressBar } from 'cc';
import { Configs } from '../utils/Configs';
const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {
    @property(ProgressBar)
    loadingProgressBar: ProgressBar;
    start() {
        director.preloadScene(Configs.MENU_SCENE_NAME,(completedCount,totalCount)=>{
            let percent = completedCount / totalCount;
            this.loadingProgressBar.progress = percent;
        },
        ()=>{
            //completed
            director.loadScene(Configs.MENU_SCENE_NAME);
        })
    }
}


