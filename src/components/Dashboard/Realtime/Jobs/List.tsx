import React from 'react';
import { ShinyPushJob } from '@/types/dashboard';
import { Table } from 'antd';
import JSONViewer from '@/components/Common/JSONViewer';
import JobLogList from './Log/List';
export interface JobListProps {
    jobs: ShinyPushJob[];
}
class JobList extends React.Component<JobListProps> {
    columns = [{
        title: '任务ID',
        dataIndex: 'id',
        key: 'id'
    }, {
        title: '推送渠道',
        dataIndex: 'channel',
        key: 'channel'
    }, {
        title: '状态',
        key: 'status',
        render: (text: string, record: ShinyPushJob) => {
            if (record.status !== 'success') {
                return (
                    <span className="text-fail">失败</span>
                );
            }
            return (
                <span className="text-success">成功</span>
            );
        }
    }, {
        title: '处理耗时',
        key: 'time',
        render: (text: string, record: ShinyPushJob) => {
            return (
                <span>{(new Date(record.updatedAt).valueOf() - new Date(record.createdAt).valueOf()) / 1000} 秒</span>
            );
        }
    }, {
        title: '内容',
        key: 'content',
        render: (text: string, record: ShinyPushJob) => {
            return (
                <JSONViewer
                    json={{
                        content: record.text,
                        images: record.image
                    }}
                />
            );
        }
    }];
    render() {
        return (
            <Table
                dataSource={this.props.jobs}
                columns={this.columns}
                pagination={false}
                rowKey="id"
                expandedRowRender={(record: ShinyPushJob) => <JobLogList logs={record.logs} />}
            />
        );
    }
}

export default JobList;