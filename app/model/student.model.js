module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("students",{
        id: {
            type: Sequelize.STRING,
            primaryKey : true
        },
        name:{
            type: Sequelize.STRING
        },
        lastname:{
            type: Sequelize.STRING
        },
        univ:{
            type: Sequelize.STRING
        },
        graduation:{
            type: Sequelize.BOOLEAN
        }
    });

    return Student;
};