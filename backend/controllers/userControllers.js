const db = require("../models");
const user = db.User;


module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const data = await user.findAll();
            res.status(200).send({
                status: true,
                data
            })
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
}