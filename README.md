## 开发



```bash
# 克隆项目
git clone https://github.com/Wen006/my-vue-ele.git
# or git clone https://gitee.com/W006/my-vue-ele.git

# 进入项目目录
cd my-vue-ele

# 安装依赖 or cnpm install
npm install   

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://127.0.0.1:1024

## 新功能实现

-  国际化
-  mock
-  组件
-  模块



## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```