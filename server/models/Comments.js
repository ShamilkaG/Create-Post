module.exports =(sequelize,DataTypes) => {
    const Comments = sequelize.define("Comments" , {
        commentsBody:{
            type:DataTypes.STRING,
            allowNull : false,
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    }) 
    return Comments;
};