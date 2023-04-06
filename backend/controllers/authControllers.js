const db = require("../models");
const user = db.User;
const bcrypt = require("bcrypt");


module.exports = {
    register: async (req, res) => {
        try {

            const { email, username, phNumber, password } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);


            const result = await user.create({
                email,
                username,
                phNumber,
                password: hashPass
            });

            res.status(200).send({
                status: true,
                message: "registered",
                data: result
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    login: async (req, res) => {
        try {
            const { username, email, password, phNumber } = req.body;

            let isExist = null

            if(!username && !phNumber) {
                isExist = await user.findOne({
                    where: {
                        email
                    },
                    // attributes: ["id", "username", "email"]
                })
            } else if(!email && !phNumber) {
                isExist = await user.findOne({
                    where: {
                        username
                    },
                    // attributes: ["id", "username", "email"]
                });
            } else { 
                isExist = await user.findOne({
                    where: {
                        phNumber
                    },
                    // attributes: ["id", "username", "email"]
                });
            }

            

            if (!isExist) throw {
                status: false,
                message: "user not found"
            }

            const isValid = await bcrypt.compare(password, isExist.password);

            if (!isValid) throw {
                status: false,
                message: "wrong password"
            }

            res.status(200).send({
                status: true,
                message: "login success",
                data: isExist
            });

        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
}