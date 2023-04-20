/**
 * The function exports an action creator that returns an object with a type of "ALTERID" and a data
 * property set to the input number.
 * @param num - The parameter `num` is a number that will be passed as an argument to the `alterId`
 * function. It will be used as the value for the `data` property in the object that is returned by the
 * function.
 * @returns A function that returns an object with two properties: "type" with a value of "ALTERID" and
 * "data" with a value of the input parameter "num".
 */
const alterId = (num) => {
    return {
        type: "ALTERID",
        data: num
    }
}

export default alterId; 