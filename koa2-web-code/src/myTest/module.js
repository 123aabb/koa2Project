const Sequelize = require('sequelize');

const seq = require('./seq');

//创建user模型   user  Sequelize默认建复数的表 users
const User = seq.define('user',{
    //id 主键 自增的
    userName:{
       type: Sequelize.STRING, //varchart(255)
       allowNull:false
    },
    passWord:{
        type: Sequelize.STRING, //varchart(255)
        allowNull:false
    },
    nickName:{
        type: Sequelize.STRING, //varchart(255)
        comment:'昵称'
    }
})

//创建blog模型  
const Blog = seq.define('blog',{
    //id 主键 自增的
    title:{
       type: Sequelize.STRING, //varchart(255)
       allowNull:false
    },
    content:{
        type: Sequelize.STRING, //varchart(255)
        allowNull:false
    },
    userId:{
        type: Sequelize.INTEGER, //varchart(255)
        comment:'关联userbiao id'
    }
})

/**
 * 1 对 多 
 */
Blog.belongsTo(User,{
    //创建外键 Blog.userId => User.id
    foreignKey:'userId'
})

User.hasMany(Blog,{
    foreignKey:'userId'
})
module.exports = {
    User,
    Blog
}