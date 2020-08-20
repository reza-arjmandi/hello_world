import IsRecordingStarted from '../../reducers/IsRecordingStarted';
import * as types from '../../constants/ActionTypes';
import ExpectGenerator from './ExpectGenerator';

const setup = () => {
    const expectation = ExpectGenerator(IsRecordingStarted);
    return {
        expectation,
    };
};

describe('IsRecordingStarted reducer', () => {

    it('should handle initial state', () => {
        const { expectation } = setup();
        expectation(undefined, {}, false);
    })

    it('shuld handle FETCH_SERVER_STATUS_REQUEST', () => {
        const { expectation } = setup();
        const action = { 
            type: types.FETCH_SERVER_STATUS_REQUEST 
        };
        expectation(false, action, false);
        expectation(true, action, true);
    })

    it('shuld handle FETCH_SERVER_STATUS_FAILURE', () => {
        const { expectation } = setup();
        const action = { 
            type: types.FETCH_SERVER_STATUS_FAILURE 
        };
        expectation(false, action, false);
        expectation(true, action, true);
    })

    it('shuld handle FETCH_SERVER_STATUS_SUCCESS', () => {
        const { expectation } = setup();
        const action1 = { 
            type: types.FETCH_SERVER_STATUS_SUCCESS,
            is_started: true 
        };
        expectation(false, action1, action1.is_started);
        expectation(true, action1, action1.is_started);

        const action2 = {
            type: types.FETCH_SERVER_STATUS_SUCCESS,
            is_started: false
        }
        expectation(false, action2, action2.is_started);
        expectation(true, action2, action2.is_started);
    })
})