export default function ExpectGenerator(reducer) {
    const expectation = (state, action, equal_to) => {
        expect(
            reducer(state, action)
        ).toEqual(equal_to)
    }
    return expectation;
};