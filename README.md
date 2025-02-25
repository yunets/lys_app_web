# git 免密

```
git config --global credential.helper store
git config --global user.email "578888218@qq.com"
git config --global user.name "liuyunshengsir"
```

# 技术点

拖拽功能 react-dnd

直接可以使用拖拽功能

后续埋点获取用户的设备，平台，版本，地理位置等信息.

# Ant Design Pro

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Environment Prepare

Install `node_modules`:

```bash
yarn start:dev
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).

# 常见问题

## 1.启动报错，node 的版本导致，运行前先设置这个

```
export NODE_OPTIONS=--openssl-legacy-provider

```

## 2.提交代码

```
git commit -a -m '提交语' --no-verify
```
