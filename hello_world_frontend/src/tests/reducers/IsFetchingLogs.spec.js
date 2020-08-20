import IsFetchingResources from '../../reducers/IsFetchingResources';
import * as types from '../../constants/ActionTypes';
import ExpectGenerator from './ExpectGenerator';

const setup = () => {
    const expectation = ExpectGenerator(IsFetchingResources);
    return {
        expectation,
    };
};

describe('IsFetchingResources reducer', () => {

    it('should handle initial state', () => {
        const { expectation } = setup();
        expectation(undefined, {}, false);
    })

    it('should handle FETCH_RESOURCES_REQUEST', () => {
        const { expectation } = setup();
        expectation(true, { type: types.FETCH_RESOURCES_REQUEST }, true);
        expectation(false, { type: types.FETCH_RESOURCES_REQUEST }, true);
    })

    it('should handle FETCH_RESOURCES_FAILURE', () => {
        const { expectation } = setup();
        expectation(true, { type: types.FETCH_RESOURCES_FAILURE }, false);
        expectation(false, { type: types.FETCH_RESOURCES_FAILURE }, false);
    })

    it('should handle FETCH_RESOURCES_SUCCESS', () => {
        const { expectation } = setup();
        expectation(true, { type: types.FETCH_RESOURCES_SUCCESS }, false);
        expectation(false, { type: types.FETCH_RESOURCES_SUCCESS }, false);
    })

});