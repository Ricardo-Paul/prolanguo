
export function stubCurrentTime(time: number){
    let realCurrentTime = Date.now;
    Date.now = jest.fn(() => time);

    return ():void => {
        Date.now = realCurrentTime
    }
};