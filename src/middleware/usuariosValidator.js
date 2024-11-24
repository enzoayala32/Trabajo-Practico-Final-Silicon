import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
    let token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ error: "token no proporcionado" });

    }
    console.log({ token })
    token = token.split(" ")[1]


    try {

        const { email } = jwt.verify(token, process.env.JWT_SECRET)
        req.email=email
        next()
    } catch (error) {
        return res.status(400).json({message:"token invalido"})
    }

}