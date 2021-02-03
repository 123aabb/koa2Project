const { User,Blog } = require('./module');

!(async function(){
    // const blogList = await Blog.findAll({
    //    attributes:['title','content'],
    //    where:{
    //        userId:1
    //    },
    //    order:[
    //        ['id','desc']
    //    ]
    // })

    // console.log(blogList.map(blog=>blog.dataValues))
    // const blogCounts = await Blog.findAndCountAll({
    //     limit:2,   //限制查询几条
    //     offset:2,   //跳过几条
    //     order:[
    //         ['id','desc']
    //     ]
    // })

    // console.log(blogCounts.count)   //查询的总数（不考虑分页）
    // console.log(blogCounts.rows.map(row=>row.dataValues))  // 此次查询的结果

    /**
     * 1.连表查询 blogs => user
     */
    // const blogListWithUser =await Blog.findAndCountAll({
    //     order:[
    //         ['id','desc']
    //     ],
    //     include:[
    //         {
    //             model:User,
    //             attributes:['userName','nickName'],
    //             where:{
    //                 userName:'曹操'
    //             }
    //         }
    //     ]
    // })

    // console.log('blogListWithUser:',blogListWithUser.count)
    // console.log(blogListWithUser.rows)
    // console.log(blogListWithUser.rows.map(blog=>{
    //     const blogVal = blog.dataValues;
    //     blogVal.user = blogVal.user.dataValues
    //     return blogVal
    // }))

    /** 
     * 2.链表查询  user => blogs
     */
    const userListwithBlogs = await User.findAndCountAll({
        attributes:['userName','nickName'],
        include:[
            {
                model:Blog
            }
        ]
    })
    console.log(userListwithBlogs.count)
    console.log(userListwithBlogs.rows.map(user=>{
        const userVal = user.dataValues;
        console.log(user)
        // userVal.blog = userVal.blog.dataValues;
        return userVal
    }))
})()