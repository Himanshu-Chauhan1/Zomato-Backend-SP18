require("dotenv").config();
const db = require("../../models");
const { Menu } = db


//========================================POST /CREATE-A-MENU==========================================================//

const create = async function (req, res) {
    try {

        const menuCreated = await Menu.create(req.body)

        res.status(201).send({ status: 1009, message: "A new menu has been created successfully", data: menuCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}


//========================================POST/UPDATE-A-MENU==========================================================//

const update = async function (req, res) {
    try {
        const menuId = req.params.id;
        let data = req.body

        const values = data;
        const condition = { where: { id: menuId } };
        const options = { multi: true };

        const updateDetails = await Menu.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered Menu details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================GET/GET-ALL-MENU==========================================================//

const index = async function (req, res) {
    try {

        let menu = await Menu.findAll()

        if (menu.length === 0) {
            return res.status(404).send({ status: 1008, msg: "No Menu found....." })
        }

        return res.status(200).send({ status: 1010, message: 'All Menu,s:', data: restaurant })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/DELETE-A-MENU==========================================================//

const destroy = async function (req, res) {
    try {

        let menuId = req.params.id

        let deleteMenu = await Menu.destroy({ where: { id: menuId } })

        return res.status(200).send({ status: 1010, message: "The Menu has been deleted Successfully", data: deleteMenu })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}



module.exports = {
    create,
    update,
    index,
    destroy
}