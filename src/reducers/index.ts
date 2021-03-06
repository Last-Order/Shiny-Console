import { StoreState, DashboardState } from 'types';
import { combineReducers } from 'redux';
import { user } from 'reducers/user';
import { errors } from 'reducers/Dashboard/errors';
import { overview } from 'reducers/Dashboard/overview';
import { realtime } from 'reducers/Dashboard/realtime';
import { node } from 'reducers/Dashboard/Server/node';
import { application } from 'reducers/Dashboard/Server/application';
import { config } from 'reducers/Dashboard/Server/config';
import { list } from 'reducers/Dashboard/Spider/list';
import { identity } from 'reducers/Dashboard/Spider/identity';
import { pushAccount } from 'reducers/Dashboard/Push/account';
import { pushHistory } from 'reducers/Dashboard/Push/history';
import { pushRule } from 'reducers/Dashboard/Push/rule';
import { deployRepository } from 'reducers/Dashboard/Deploy/repository';
const rootReducer = combineReducers<StoreState>({
    user,
    dashboard: combineReducers<DashboardState>({
        errors,
        overview,
        realtime,
        server: combineReducers({
            node,
            application,
            config
        }),
        spider: combineReducers({
            list,
            identity
        }),
        push: combineReducers({
            history: pushHistory,
            account: pushAccount,
            rule: pushRule
        }),
        deploy: combineReducers({
            repository: deployRepository
        })
    }),
});
export default rootReducer;