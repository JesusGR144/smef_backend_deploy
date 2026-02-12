

const registrar = (req, res) => {
    res.json({ msg: "Registrar Instructor"})
}

const perfil = (req, res) => {
    res.json({ url: "Desde API/INSTRUCTORES/perfil"})
}

export {
    registrar,
    perfil
}