
export function stubCurrentTime(posixTime: number){
    let realCurrentTime = Date.now;
    Date.now = jest.fn(() => posixTime);

    return ():void => {
        Date.now = realCurrentTime
    }
};