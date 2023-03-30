import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

const webCategoryListAll = (req: Request, res: Response) => {
    res.json(
        {
            "content": [
                {
                    "uid": "1b497f33-cb4c-4281-b1bf-91fcac8172de",
                    "name": "学习",
                    "weight": 1,
                    "userId": "userId",
                    "delFlag": "0",
                    "webInfoList": [
                        {
                            "uid": "846e1306-6cca-41c3-878a-8f62dd1c0dc4",
                            "name": "百度3",
                            "url": "https://www.baidu.com/",
                            "comment": null,
                            "type": null,
                            "weight": null,
                            "userId": "userId",
                            "access": null,
                            "delFlag": "0",
                            "webCategoryId": "1b497f33-cb4c-4281-b1bf-91fcac8172de"
                        },
                        {
                            "uid": "899c16a7-1ea9-43a4-b4c4-b3e8f291c761",
                            "name": "ant.design",
                            "url": "https://ant.design/",
                            "comment": null,
                            "type": null,
                            "weight": null,
                            "userId": "userId",
                            "access": null,
                            "delFlag": "0",
                            "webCategoryId": "1b497f33-cb4c-4281-b1bf-91fcac8172de"
                        }
                    ]
                },
                {
                    "uid": "81c9a608-5c4a-4d53-8925-7a98006edc1a",
                    "name": "工作",
                    "weight": 2,
                    "userId": "userId",
                    "delFlag": "0",
                    "webInfoList": [
                        {
                            "uid": "3c76df16-c4f6-4f4e-9515-6e89d6cf18f0",
                            "name": "百度1",
                            "url": "https://www.baidu.com/",
                            "comment": null,
                            "type": null,
                            "weight": 9999,
                            "userId": "userId",
                            "access": null,
                            "delFlag": "0",
                            "webCategoryId": "81c9a608-5c4a-4d53-8925-7a98006edc1a"
                        },
                        {
                            "uid": "5c16a7d3-7a3f-4530-b4bb-d4c2c287461d",
                            "name": "百度2",
                            "url": "https://www.baidu.com/",
                            "comment": null,
                            "type": null,
                            "weight": 9999,
                            "userId": "userId",
                            "access": null,
                            "delFlag": "0",
                            "webCategoryId": "81c9a608-5c4a-4d53-8925-7a98006edc1a"
                        }
                    ]
                },
                {
                    "uid": "7d1cde59-cc31-4a82-bd6c-4da21bee2106",
                    "name": "图书",
                    "weight": 3,
                    "userId": "userId",
                    "delFlag": "0",
                    "webInfoList": []
                },
                {
                    "uid": "c6da9794-ef4b-4de2-9acc-4ddc1c1227d7",
                    "name": "前端",
                    "weight": 4,
                    "userId": "userId",
                    "delFlag": "0",
                    "webInfoList": []
                },
                {
                    "uid": "a78f0979-9b36-46ce-b8b2-6913443c543a",
                    "name": "工作2",
                    "weight": 5,
                    "userId": "userId",
                    "delFlag": "0",
                    "webInfoList": []
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
    return webCategoryList;
}

export default {
    'POST /api/webInfo/list': webCategoryList,
    'GET /api/webCategory/list': webCategoryList,
    'GET /api/webCategory/listAll': webCategoryListAll,
    'POST /api/webCategory/save': webCategoryList,

    'POST /api/webInfo/save': webCategoryList,

};
