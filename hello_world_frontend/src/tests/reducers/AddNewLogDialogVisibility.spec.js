import AddNewResourceDialogVisibility from '../../reducers/AddNewResourceDialogVisibility';
import * as types from '../../constants/ActionTypes';
import ExpectGenerator from './ExpectGenerator';

const setup = () => {
    const expectation = ExpectGenerator(AddNewResourceDialogVisibility);
    return {
        expectation,
    };
};

describe('AddNewResourceDialogVisibility reducer', () => {
    it('should handle initial state', () => {
        const { expectation } = setup();
        expectation(undefined, {}, false);
    })

    it('should handle OPEN_ADD_NEW_RESOURCE_DIALOG', () => {
        const { expectation } = setup();
        expectation(false, { type: types.OPEN_ADD_NEW_RESOURCE_DIALOG }, true);
        expectation(true, { type: types.OPEN_ADD_NEW_RESOURCE_DIALOG }, true);
    })

    it('should handle CLOSE_ADD_NEW_RESOURCE_DIALOG', () => {
        const { expectation } = setup();
        expectation(false, { type: types.CLOSE_ADD_NEW_RESOURCE_DIALOG }, false);
        expectation(true, { type: types.CLOSE_ADD_NEW_RESOURCE_DIALOG }, false);
    })

});