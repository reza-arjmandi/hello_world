import IsFetchingRecordingStatus from '../../reducers/IsFetchingRecordingStatus';
import * as types from '../../constants/ActionTypes';
import ExpectGenerator from './ExpectGenerator';

const setup = () => {
    const expectation = ExpectGenerator(IsFetchingRecordingStatus);
    return {
        expectation,
    };
};

describe('IsFetchingRecordingStatus reducer', () => {

    it('should handle initial state', () => {
        const { expectation } = setup();
        expectation(undefined, {}, false);
    })

    it('should handle FETCH_SERVER_STATUS_REQUEST', () => {
        const { expectation } = setup();
        expectation(true, { 
            type: types.FETCH_SERVER_STATUS_REQUEST }, true);
        expectation(false, { 
            type: types.FETCH_SERVER_STATUS_REQUEST }, true);
    })

    it('should handle FETCH_SERVER_STATUS_FAILURE', () => {
        const { expectation } = setup();
        expectation(true, { 
            type: types.FETCH_SERVER_STATUS_FAILURE }, false);
        expectation(false, { 
            type: types.FETCH_SERVER_STATUS_FAILURE }, false);
    })

    it('should handle FETCH_SERVER_STATUS_SUCCESS', () => {
        const { expectation } = setup();
        expectation(true, { 
            type: types.FETCH_SERVER_STATUS_SUCCESS }, false);
        expectation(false, { 
            type: types.FETCH_SERVER_STATUS_SUCCESS }, false);
    })

});