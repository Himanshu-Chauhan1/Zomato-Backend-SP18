
//==============================================authorization=========================================================//

const authorization = async function (req, res, next) {
    try {

        const verifiedtoken = req.verifiedtoken
        let idFromToken = verifiedtoken.aud
        let userId = req.params.id

        if (userId !== idFromToken) {
            return res.status(401).send({ Status: 1010, message: "Unauthorized Access! You dont have correct privilege to perform this operation" });
        } else {
            next()
        }

    } catch (error) {
        console.log(error.message);
        res.status(401).send({ status: 1010, message: "Something is wrong please check back again after sometime" });
    }
}

module.exports = { authorization }


