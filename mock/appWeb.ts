import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

const getNotices = (req: Request, res: Response) => {
    res.json(
        {
            "content": [
                {
                    "_id": {
                        "timestamp": 1677312705,
                        "counter": 13657541,
                        "time": 1677312705000,
                        "date": "2023-02-25T08:11:45.000+0000",
                        "processIdentifier": 5824,
                        "machineIdentifier": 15545933,
                        "timeSecond": 1677312705
                    },
                    "uid": "8644377d-7c30-4c48-97e0-9f8b006e3697",
                    "name": "百度",
                    "url": "https://www.baidu.com/",
                    "imgUrl": "string",
                    "comment": "百度最大的搜索引擎",
                    "type": "string",
                    "orderByNum": 0,
                    "userId": "string",
                    "createTime": "2023-02-25T08:04:44.908+0000",
                    "access": "string",
                    "delFlag": "string"
                },
                {
                    "_id": {
                        "timestamp": 1677312706,
                        "counter": 13657542,
                        "time": 1677312706000,
                        "date": "2023-02-25T08:11:46.000+0000",
                        "processIdentifier": 5824,
                        "machineIdentifier": 15545933,
                        "timeSecond": 1677312706
                    },
                    "uid": "8b92d4e0-109e-464f-8ef4-b53420138255",
                    "name": "iowen",
                    "url": "https://api.iowen.cn",
                    "imgUrl": "string",
                    "comment": "https://api.iowen.cn",
                    "type": "string",
                    "orderByNum": 0,
                    "userId": "string",
                    "createTime": "2023-02-25T08:04:44.908+0000",
                    "access": "string",
                    "delFlag": "string"
                },
                {
                    "_id": {
                        "timestamp": 1677312706,
                        "counter": 13657543,
                        "time": 1677312706000,
                        "date": "2023-02-25T08:11:46.000+0000",
                        "processIdentifier": 5824,
                        "machineIdentifier": 15545933,
                        "timeSecond": 1677312706
                    },
                    "uid": "cf3739a0-f6e2-4bec-b9a1-3524a3505c8c",
                    "name": "爱分享",
                    "url": "https://ifxdh.com/",
                    "imgUrl": "string",
                    "comment": "string",
                    "type": "string",
                    "orderByNum": 0,
                    "userId": "string",
                    "createTime": "2023-02-25T08:04:44.908+0000",
                    "access": "string",
                    "delFlag": "string"
                },
                {
                    "_id": {
                        "timestamp": 1677312706,
                        "counter": 13657544,
                        "time": 1677312706000,
                        "date": "2023-02-25T08:11:46.000+0000",
                        "processIdentifier": 5824,
                        "machineIdentifier": 15545933,
                        "timeSecond": 1677312706
                    },
                    "uid": "26139e98-657e-4319-8475-44a8320fdc63",
                    "name": "ant.design",
                    "url": "https://ant.design/components/overview-cn/",
                    "imgUrl": "string",
                    "comment": "ant.design",
                    "type": "string",
                    "orderByNum": 0,
                    "userId": "string",
                    "createTime": "2023-02-25T08:04:44.908+0000",
                    "access": "string",
                    "delFlag": "string"
                },
                {
                    "_id": {
                        "timestamp": 1677312706,
                        "counter": 13657545,
                        "time": 1677312706000,
                        "date": "2023-02-25T08:11:46.000+0000",
                        "processIdentifier": 5824,
                        "machineIdentifier": 15545933,
                        "timeSecond": 1677312706
                    },
                    "uid": "426dbc04-01bc-4b44-a3bb-2cf9d670948c",
                    "name": "string",
                    "url": "https://www.baidu.com/",
                    "imgUrl": "string",
                    "comment": "string",
                    "type": "string",
                    "orderByNum": 0,
                    "userId": "string",
                    "createTime": "2023-02-25T08:04:44.908+0000",
                    "access": "string",
                    "delFlag": "string"
                },
                {
                    "_id": {
                        "timestamp": 1677312706,
                        "counter": 13657546,
                        "time": 1677312706000,
                        "date": "2023-02-25T08:11:46.000+0000",
                        "processIdentifier": 5824,
                        "machineIdentifier": 15545933,
                        "timeSecond": 1677312706
                    },
                    "uid": "cf1a703b-293e-4b61-8a86-c4af494406a3",
                    "name": "liuyunshengsir.blog.csdn",
                    "url": "https://liuyunshengsir.blog.csdn.net/article/details/129708526",
                    "imgUrl": "string",
                    "comment": "liuyunshengsir.blog.csdn",
                    "type": "string",
                    "orderByNum": 0,
                    "userId": "string",
                    "createTime": "2023-02-25T08:04:44.908+0000",
                    "access": "string",
                    "delFlag": "string"
                },
                {
                    "_id": {
                        "timestamp": 1677312707,
                        "counter": 13657547,
                        "time": 1677312707000,
                        "date": "2023-02-25T08:11:47.000+0000",
                        "processIdentifier": 5824,
                        "machineIdentifier": 15545933,
                        "timeSecond": 1677312707
                    },
                    "uid": "33c38554-e776-43b8-b737-4b792b5209b9",
                    "name": "string",
                    "url": "https://www.baidu.com/",
                    "imgUrl": "string",
                    "comment": "string",
                    "type": "string",
                    "orderByNum": 0,
                    "userId": "string",
                    "createTime": "2023-02-25T08:04:44.908+0000",
                    "access": "string",
                    "delFlag": "string"
                },
                {
                    "_id": {
                        "timestamp": 1677312709,
                        "counter": 13657548,
                        "time": 1677312709000,
                        "date": "2023-02-25T08:11:49.000+0000",
                        "processIdentifier": 5824,
                        "machineIdentifier": 15545933,
                        "timeSecond": 1677312709
                    },
                    "uid": "c8162598-1bf8-40a9-b9d3-1605afbfbb51",
                    "name": "string",
                    "url": "https://www.baidu.com/",
                    "imgUrl": "string",
                    "comment": "string",
                    "type": "string",
                    "orderByNum": 0,
                    "userId": "string",
                    "createTime": "2023-02-25T08:04:44.908+0000",
                    "access": "string",
                    "delFlag": "string"
                },
                {
                    "_id": {
                        "timestamp": 1677312709,
                        "counter": 13657549,
                        "time": 1677312709000,
                        "date": "2023-02-25T08:11:49.000+0000",
                        "processIdentifier": 5824,
                        "machineIdentifier": 15545933,
                        "timeSecond": 1677312709
                    },
                    "uid": "cbce06c0-ae5e-4f2a-a0b0-991952158433",
                    "name": "string",
                    "url": "https://www.baidu.com/",
                    "imgUrl": "string",
                    "comment": "string",
                    "type": "string",
                    "orderByNum": 0,
                    "userId": "string",
                    "createTime": "2023-02-25T08:04:44.908+0000",
                    "access": "string",
                    "delFlag": "string"
                }
            ],
            "resouce": null,
            "status_code": 1,
            "status_mes": "执行成功"
        }
    );
};


const webCategoryList = (req: Request, res: Response) => {
    res.json({
        "content": [
            {
                "uid": "1b497f33-cb4c-4281-b1bf-91fcac8172de",
                "name": "工作",
                "weight": 1,
                "userId": "userId",
                "delFlag": "0"
            },
            {
                "uid": "81c9a608-5c4a-4d53-8925-7a98006edc1a",
                "name": "学习",
                "weight": 2,
                "userId": "userId",
                "delFlag": "0"
            },
            {
                "uid": "7d1cde59-cc31-4a82-bd6c-4da21bee2106",
                "name": "图书",
                "weight": 3,
                "userId": "userId",
                "delFlag": "0"
            },
            {
                "uid": "c6da9794-ef4b-4de2-9acc-4ddc1c1227d7",
                "name": "前端",
                "weight": 4,
                "userId": "userId",
                "delFlag": "0"
            }
        ],
        "resouce": null,
        "status_code": 1,
        "status_mes": "执行成功"
    });
};

const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

function getFakeCaptcha1(req: Request, res: Response) {
    //await sleep(1);
    return getNotices;
}

export default {
    'POST /api/webInfo/list': getNotices,
    'GET /api/webCategory/list': webCategoryList,
    'POST /api/webCategory/save': webCategoryList,

    'POST /api/webInfo/save': webCategoryList,

};
