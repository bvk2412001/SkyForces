import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact, ProgressBar } from 'cc';
import { Configs } from '../utils/Configs';
import { PreData } from '../utils/PreData';
import { BulletPlayer } from './BulletPlayer';
const { ccclass, property } = _decorator;

@ccclass('BossController')
export class BossController extends Component {
    @property(ProgressBar)
    progessBar: ProgressBar;

    private healthCurrentShip: number = 30;
    private healthFullShip: number = 30;
    private winUI;
    private setScore;

    start() {
        let collect = this.node.getComponent(Collider2D);
        if (collect) {
            collect.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
    setUp(winUI, setScore : CallableFunction){
        this.winUI = winUI;
        this.setScore = setScore
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (this.node) {
            if (otherCollider.name.includes(Configs.BULLET_PLAYER_NAME)) {
                let bullet = otherCollider.node;
                this.healthCurrentShip -= 10;
                this.progessBar.progress = this.healthCurrentShip / this.healthFullShip;
                if (this.healthCurrentShip <= 0) {
                    PreData.instant.score += 30;
                    this.setScore();
                    this.node.destroy();
                    this.winUI();
                }
                bullet.getComponent(BulletPlayer).bulletPlayerPool.put(bullet);
            }
        }
    }

    timeCount = 0;
    

    update(deltaTime: number) {
        
    }
}


