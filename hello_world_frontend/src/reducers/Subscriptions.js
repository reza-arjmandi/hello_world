import {
    FETCH_SUBSCRIPTIONS_REQUEST_SUCCESS,
    FETCH_SUBSCRIPTIONS_REQUEST_FAILURE,
} from '../constants/ActionTypes';

export default function Subscriptions(state={'results': []}, action) {
    switch(action.type) {
        case FETCH_SUBSCRIPTIONS_REQUEST_SUCCESS:
            let result = {'results':[]};
            action.result['results'].map((_class) => {
                let skype_link=_class['skype_link'];
                let english_class=_class['title'];

                _class['memberships'].map((member) => { 
                    let _res = {};
                    _res['skype_link']=skype_link;
                    _res['english_class']=english_class;
                    _res['english_class']=member['date_joined'];
                    _res['username']=member['owner'];
                    result['results'].push(_res)
                });
            });
            return result;
        case FETCH_SUBSCRIPTIONS_REQUEST_FAILURE:
        default:
            return state;
    }
};