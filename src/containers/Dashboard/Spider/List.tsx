import List from '@/components/Dashboard/Spider/List';
import * as actions from '@/actions/dashboard/spider/list';
import { StoreState } from '@/types/index';
import { connect } from 'react-redux';
import { SpiderListAction } from '@/actions/dashboard/spider/list';
import { ThunkAction } from 'redux-thunk';

export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps
    };
}

export function mapStateToProps(state: StoreState) {
    return {
        spiderList: state.dashboard.spider.list.spiderList,
        isLoading: state.dashboard.spider.list.isLoading,
        frequencyUpdateModalVisible: state.dashboard.spider.list.frequencyUpdateModalVisible,
        nowEditingSpider: state.dashboard.spider.list.nowEditingSpider
    };
}

// Hack 第二弹 自己弄了个接口 
interface Dispatch {
    (action: SpiderListAction | ThunkAction<void, StoreState, null>): void;
}

// 原来代码: dispatch: Dispatch<actions.UserAction>
// 加上 redux-thunk 之后这个类型不知道咋配 先 Hack 掉了
export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        getSpiderList: () => {
            dispatch(actions.getSpiderList());
        },
        deleteSpider: (spiderId: number) => {
            dispatch(actions.deleteSpider(spiderId));
        },
        showFrequencyUpdateModal: (spiderId: number) => {
            dispatch(actions.showFrequencyUpdateModal(spiderId));
        },
        hideFrequencyUpdateModal: () => {
            dispatch(actions.hideFrequencyUpdateModal());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(List);