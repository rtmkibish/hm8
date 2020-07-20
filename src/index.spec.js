const { map, filter, getMessagesByDate } = require("./index");

describe("The map test", () => {

    test("1: ([1,2,3,4], c) => [1, 4, 9, 16]", () => {
        const pow = function(el) {
            return el ** 2;
        }
        expect(map([1,2,3,4], pow)).toEqual([1, 4, 9, 16]);
    });
});

describe("The filter test", () => {

    test("2: ([1,2,3,4], c) => [2, 4]", () => {
        const even = function(el) {
            return el % 2 === 0;
        }
        expect(filter([1,2,3,4], even)).toEqual([2, 4]);
    });
});

describe("The getMessagesByDate test", () => {

    test("3: ([{date: '31/07/2019', msg: 'text', ...}] => {'31/07/2019': ['text']})", () => {
        const messages = [
            {
                date: "31/07/20",
                msg: "msg1"
            },
            {
                date: "02/07/20",
                msg: "msg2"
            },
            {
                date: "31/07/20",
                msg: "msg3"
            },
            {
                date: "01/07/20",
                msg: "msg4"
            }
        ];
        expect(getMessagesByDate(messages))
        .toEqual({
            "31/07/20": ["msg1", "msg3"],
            "02/07/20": ["msg2"],
            "01/07/20": ["msg4"],
        });
    });
});