let time = require('./Time');

describe("When time is set", () => {
    it('Should return formatted time 00:00:59', () => {
        expect(time.timeToString(59000)).toEqual("00:00:59");
    });

    it('Should return formatted time 00:01:00', () => {
        expect(time.timeToString(60000)).toEqual("00:01:00");
    });

    it('Should return formatted time 00:01:01', () => {
        expect(time.timeToString(61000)).toEqual("00:01:01");
    });

    it('Should return formatted time 00:59:59', () => {
        expect(time.timeToString(3599000)).toEqual("00:59:59");
    });

    it('Should return formatted time 01:00:00', () => {
        expect(time.timeToString(3600000)).toEqual("01:00:00");
    });

    it('Should return formatted time 01:01:01', () => {
        expect(time.timeToString(3661234)).toEqual("01:01:01");
    });

    it('Should return formatted time 01:01:59', () => {
        expect(time.timeToString(3719000)).toEqual("01:01:59");
    });
});

describe("When time is null", () => {
    it('Should return formatted time 00:00:00', () => {
        expect(time.timeToString(null)).toEqual("00:00:00");
    });
})

describe("When time is ", () => {
    it(' before midnight, should return false', () => {
        let date = new Date();
        date.setHours(23);
        date.setMinutes(15);
        date.setSeconds(0);
        expect(time.isMidnight(date)).toBeFalsy();
    });

    it('  midnight, should return true', () => {
        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        expect(time.isMidnight(date)).toBeTruthy();
    });

    it(' after midnight should return false', () => {
        let date = new Date();
        date.setHours(1);
        date.setMinutes(15);
        date.setSeconds(0);
        expect(time.isMidnight(date)).toBeFalsy();
    });
})

describe("When time is ", () => {
    it(' null, should return false', () => {
        expect(time.isMidnight(null)).toBeFalsy();
    });
})

describe("When time is ", () => {
    it(' Sunday, should return false', () => {
        let date = new Date(2021,4,2);
        expect(time.isNewWeek(date)).toBeFalsy();
    });

    it(' Monday, should return true', () => {
        let date = new Date(2021,4,3);
        expect(time.isNewWeek(date)).toBeTruthy();
    });

    it(' Tuesday, should return false', () => {
        let date = new Date(2021,4,4);
        expect(time.isNewWeek(date)).toBeFalsy();
    });
})

describe("When day of the week is ", () => {
    it(' null, should return false', () => {
        expect(time.isNewWeek(null)).toBeFalsy();
    });
})


describe("When is the day of the month: ", () => {
    it(' Last, should return false', () => {
        let date = new Date(2021,4,31);
        expect(time.isNewMonth(date)).toBeFalsy();
    });

    it(' 1st, should return true', () => {
        let date = new Date(2021,4,1);
        expect(time.isNewMonth(date)).toBeTruthy();
    });

    it(' 2nd, should return false', () => {
        let date = new Date(2021,4,2);
        expect(time.isNewMonth(date)).toBeFalsy();
    });
})

describe("When is the day of the month: ", () => {
    it(' null, should return false', () => {
        expect(time.isNewMonth(null)).toBeFalsy();
    });
})




