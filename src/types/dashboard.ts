// Dashboard/Overview
export interface StatisticsResponse {
    spiderRanking: SpiderRanking;
    levelRanking: LevelRankingItem[];
    jobStatus: StatusItem[];
}

export interface StatusItem {
    status: string;
    count: number;
}

export interface SpiderRanking {
    '1day': SpiderRankingItem[];
    '3days': SpiderRankingItem[];
    '21days': SpiderRankingItem[];
}

export interface SpiderRankingItem {
    /** 发布者 */
    publisher: string;
    /** 事件数 */
    count: number;
}

export interface LevelRankingItem {
    /** 事件等级 */
    level: string;
    /** 事件数 */
    count: number; // 事件数
}

export type LatencyGraphResponse = LatencyDataItem[];

export interface LatencyDataItem {
    time: string;
    websocket: number;
}

// Dashboard/Realtime

export type RecentEventsResponse = {
    total: number;
    events: ShinyEvent[];
};

/** Shiny 事件  */
export interface ShinyEvent {
    /** 事件ID */
    id?: number;
    /** 事件详细数据 */
    data: ShinyEventData;
    /** 事件等级 */
    level: ShinyEventLevel;
    /** 事件发布者 */
    publisher: string;
    /** 事件发布频道 */
    channel?: string;
    /** 事件 Hash */
    hash: string;
    createdAt?: string;
    updatedAt?: string;
}
/** Shiny 事件关联信息 */
export interface ShinyEventDetail {
    /** 事件ID */
    id: number;
    jobs: ShinyPushJob[];
}

/** Shiny 推送任务（新） */
export interface ShinyPushJob {
    /** 任务ID  */
    id: number;
    /** 推送渠道  */
    channel: string;
    /** 任务状态 */
    status: 'success' | 'fail';
    info: string;
    text: string;
    image?: string;
    logs: ShinyPushJobLog[];
    createdAt: string;
    updatedAt: string;
}

/** Shiny 推送任务日志 */
export interface ShinyPushJobLog {
    /** 日志ID */
    id: number;
    /** 推送渠道  */
    channel: string;
    /** 状态 */
    status: string;
    info: string;
    createdAt: string;
    updatedAt: string;
}

// Shiny 事件数据
export interface ShinyEventData {
    /** 内容 */
    content: string;
    /** 封面 */
    cover: string;
    /** 链接 */
    link: string;
    /** 标题 */
    title: string;
}

/** Shiny 事件等级  */
export type ShinyEventLevel = 1 | 2 | 3 | 4 | 5;

/** Shiny Websocket 广播消息 */
export interface EventSocketMessage {
    /** 事件等级 */
    level: ShinyEventLevel;
    /** 爬虫名 */
    spiderName: string;
    /** 事件 Hash */
    hash: string;
    /** 事件详细数据 */
    data: ShinyEventData;
}

export interface BaseJob {
    type: string;
    /** 任务状态 */
    status: string;
    /** 完成节点 */
    done_by: string;
    createdAt: string;
    updatedAt: string;
}

export interface DataRefreshJob extends BaseJob {
    /** 任务ID */
    id: number;
    type: 'data_refresh';
    /** 任务爬虫 */
    spider: string;
    /** 爬虫路径 */
    path: string;
    /** 任务附加信息 */
    info?: string; // 任务附加信息
}

export interface PushJob extends BaseJob {
    type: 'push';
    info: PushJobInfo;
}

export interface PushJobInfo {
    /** 推送渠道 */
    channel: string;
    /** 推送账号 */
    account: string;
    /** 推送内容 */
    text: string;
    /** 推送返回结果 */
    response: string;
}

export type Job = DataRefreshJob;

/** 任务状态广播信息 */
export interface JobStatusMessage {
    /** 状态更新类型  */
    type: 'create' | 'update';
    /** 更新事件 */
    job: Job;
}

// Dashboard/Server/Node

export type ServerListResponse = ServerNodeWithKeyPair[];

export interface ServerNode {
    id: number;
    /** 服务器节点名 */
    name: string;
    /** 服务器节点类型 */
    type: string;
    /** 服务器节点地址 */
    host: string;
    /** 服务器组 */
    group: string[];
    createdAt: string;
    updatedAt: string;
    /** 服务器密钥对 展开或不展开 */
    key_pair: number | APIKeyPair;
}

export interface ServerNodeWithKeyPair extends ServerNode {
    /** 服务器密钥对 展开 */
    key_pair: APIKeyPair;
}

// Dashboard/Server/Application

export interface APIKeyPairsResponse {
    /** 全部服务器密钥对 */
    keyPairs: APIKeyPair[];
    /** 全部服务器节点列表 */
    serverList: ServerNode[];
}

export interface APIKeyPair {
    id: number;
    /** API_KEY */
    api_key: string;
    /** API_SECRET_KEY */
    api_secret_key: string;
    /** 绑定服务器标签 */
    tag: ServerNode[];
}

export interface SpiderInfo {
    /** 数据过期时间 */
    expires: number;
    /** 爬虫凭据 */
    identity?: string;
    /** 冷却时间 */
    cooldown?: number;
}

// Dashboard/Server/Config

export interface ConfigItem {
    key: string;
    value: string;
}

export type ConfigListResponse = ConfigItem[];

// Dashboard/Spider/Identity

export interface SpiderIdentityItem {
    id: number;
    /** 凭据识别名 */
    name: string;
    /** 凭据内容 */
    identity: object;
}

export type SpiderIdentityListResponse = SpiderIdentityItem[];

// Dashboard/Spider/List

export interface Spider {
    id: number;
    /** 爬虫名 */
    name: string;
    /** 路径 */
    path: string;
    /** 分组 */
    group: string;
    /** 描述 */
    description: string;
    /** 附加信息 */
    info: SpiderInfo;
    /** 执行次数 */
    trigger_count: number;
    /** 上次执行时间 */
    trigger_time: string;
}

export type SpiderListResponse = Spider[];

// Dashboard/Push/History

export interface PushHistoryResponse {
    total: number;
    jobs: PushJob[];
}

export type PushAccountList = PushAccount[];

export interface PushAccount {
    id: number;
    /** 平台名 */
    platform: string;
    /** 账号名 */
    name: string;
    /** 账号凭据 */
    credential: object;
}

// Dashboard/Push/Rule

export interface PushRuleItem {
    id: number;
    spider_name: string;
    rule: PushRule;
}

export interface PushRule {}

export type PushRuleList = PushRuleItem[];

// Dashboard/Deploy/Repository
export type RepositoryList = Repository[];
export interface Repository {
    id: number;
    name: string;
    description: string;
    line: number;
    revisions: Revision[];
}

export interface Revision {
    id: number;
    repository_id: number;
    commit_id: string;
    compare_url: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}