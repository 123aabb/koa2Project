const { User,Blog } = require('./module');

(async function(){
    // const users = await User.create({
    //    userName:'曹操',
    //    passWord:'123456',
    //    nickName:'魏王'
    // })
    //console.log('users',users.dataValues.id)
    //const userIds = users.dataValues.id
    const bolg1 = await Blog.create({
        title:'称王',
        content:'君临天下',
        userId:1
     })
     console.log('bolg1',bolg1.dataValues)
})()