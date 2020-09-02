module.exports = (sequelize, Sequelize) => {
    const Patient = sequelize.define("patient", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty:true
            }
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty:true
            }
        },
        patronymic: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty:true
            }
        },
        gender: {
            type: Sequelize.ENUM("male", "female"),
            allowNull: false,
            validate: {
                notEmpty:true
            }
        },
        birthday: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                notEmpty:true,
                isDate: true
            }
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty:true
            }
        },
        oms_number: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty:true,
                len: [16, 16]
            }
        }
    });
    return Patient;
};
