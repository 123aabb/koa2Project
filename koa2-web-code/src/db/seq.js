/**
 * @description 实例
 */

const Sequelize = require('sequelize');
const { MYSQL_CONF } = require('../conf/db')
const { host, user, password, port, database } = MYSQL_CONF
const { isProd,isTest} = require('../utils/env')

const conf = {
    host,
    dialect: 'mysql'
}

/**
 * 测试环境减少打印sql语句
 */
if(isTest){
    conf.logging = () =>{}
}

/**
* 线上环境使用连接池
*/
if (isProd) {
    conf.pool = {
        max: 5,    //最大连接数
        min: 0,    //最小连接数
        idle: 10000 //如果一个连接池 10秒内没有被使用 则释放
    }
}


const seq = new Sequelize(database, user, password, conf)



module.exports = seq