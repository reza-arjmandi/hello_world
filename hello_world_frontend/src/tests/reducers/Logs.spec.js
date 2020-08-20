import Logs from '../../reducers/Logs';
import * as types from '../../constants/ActionTypes';
import ExpectGenerator from './ExpectGenerator';

const setup = () => {
    const expectation = ExpectGenerator(Logs);
    return {
        expectation,
    };
};

describe('Logs reducer', () => {

    it('should handle initial state', () => {
        const { expectation } = setup();
        expectation(undefined, {}, []);
    })

    it('should handle FETCH_RESOURCES_SUCCESS', () => {
        const { expectation } = setup();
        const logs = [
            'card1',
            'card2',
        ];
        const action = {
            type: types.FETCH_RESOURCES_SUCCESS,
            response: logs
        };
        expectation([], action, logs);
        expectation(['card2', 'card3'], action, logs);
    })

    it('should handle FETCH_RESOURCES_FAILURE', () => {
        const { expectation } = setup();
        const action = {
            type: types.FETCH_RESOURCES_FAILURE,
            error: 'this is error'
        };
        expectation([], action, []);
        expectation(['card1', 'card2'], action, ['card1', 'card2']);
    })

});