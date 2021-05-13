const { User,Blog } = require('./module');

!(async function(){
    //删除博客
    // const delblogs =await Blog.destroy({
    //    where:{
    //        id:2
    //    }
    // })

    // console.log(delblogs)

    const userDel = await User.destroy({
        where:{
            id:5
        }
    })

    console.log(userDel)
})()