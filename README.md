# koa2Project
koa项目,使用到的功能包括
1.后台ejs模板渲染
2.sequelize数据库模型的应用,包括数据库模型的创建,数据表的设计,外键关联设置及连表查询等操作
3.创建分层结构,路由层,controller层和server层
4.使用ajv封装json-schema校验功能的中间件
5.使用koa-generic-session封装登陆校验的中间件

6.三方插件的使用:
使用koa-bodyparser解析post请求 
使用cross-dev 在package.json中设置环境变量(process.env.NODE_ENV)
fs-extra 用于文件的操作,
使用koa-static 处理静态资源,
使用formidable-upload-koa插件实现图片上传的功能,
xss对于文本信息进行过滤防止 xss攻击,
使用crypto 对于明文密码进行md5加密

7.创建返回结果成功和失败的类,使所有返回前端的结果都继承自这个类
8.对redis的读取操作进行封装,对于访问量大的公共列表页面,使用redis进行缓存
9.pm2进行线上环境部署



