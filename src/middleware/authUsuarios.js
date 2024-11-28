import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
    let token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ error: "token no proporcionado" });

    }
    console.log({ token })
    token = token.split(" ")[1]


    try {

        const { email, roles_id } = jwt.verify(token, process.env.JWT_SECRET)
        req.email = email
        req.roles_id = roles_id
        next()
    } catch (error) {
        return res.status(400).json({ message: "token invalido" })
    }

}

export const verifyAdmin = async (req, res, next) => {
    if (req.roles_id === 1) {
        return next()
    }
    return res.status(403).json({ error: "solo autorizado para administradores" })
}

export const verifyEmpleado = async (req, res, next) => {
    if (req.roles_id === 2 || req.roles_id === 1) {
        return next()
    }
    return res.status(403).json({ error: "solo autorizado para empleados o administradores" })
}