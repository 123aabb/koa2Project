const { User,Blog } = require('./module');

!(async function(){
   const upUser = await User.update({
       nickName:'魏武帝'
   },{
       where:{
           id:1
       }
   })

   console.log(upUser)
})()