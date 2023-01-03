export interface bulletInf{
    damage : number;
    speed : number;
    callback: CallableFunction;
    colliderCallback : CallableFunction;
    setUp(callback, colliderCallback);
    getDamage();

}


