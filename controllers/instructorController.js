import Instructor from "../models/Instructor.js"
import generarJWT from '../helpers/generarJWT.js';
import generarId from '../helpers/generarId.js';



const registrar = async (req, res) => {
    const { email } = req.body;

    // Prevenir usuarios duplicados
    const existeInstructor = await Instructor.findOne({ email });
    if (existeInstructor) {
        const error = new Error("El usuario ya está registrado");
        return res.status(400).json({ msg: error.message });
    }


    try {
        // Guardar un nuevo instructor
        const instructor = new Instructor(req.body);
        const instructorGuardado = await instructor.save();
        res.json(instructorGuardado);

    } catch (error) {
        console.log(error);
    }
}

const perfil = (req, res) => {
    const { instructor } = req;
    res.json({ instructor });

}

const confirmar = async (req, res) => {
    const { token } = req.params;

    const usuarioConfirmar = await Instructor.findOne({ token });

    if (!usuarioConfirmar) {
        const error = new Error("Token no válido");
        return res.status(404).json({ msg: error.message });
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();


        res.json({ msg: "Usuario confirmado correctamente" });

    } catch (error) {
        console.log(error);
    }
}

const autenticar = async (req, res) => {
    const { email, password, confirmado } = req.body;

    // Comprobar si el usuario existe
    const usuario = await Instructor.findOne({ email });

    if (!usuario) {
        const error = new Error("El usuario no existe");
        return res.status(403).json({ msg: error.message });
    }

    // Comprobar si el usuario está confirmado
    if (!usuario.confirmado) {
        const error = new Error("Tu cuenta no ha sido confirmada");
        return res.status(403).json({ msg: error.message });
    }

    // Autenticar al usuario
    if (await usuario.comprobarPassword(password)) {
        // Autenticar al usuario
        res.json({ token: generarJWT(usuario.id) });

    } else {
        const error = new Error("El Password es incorrecto");
        return res.status(403).json({ msg: error.message });
    }
}

const olvidePassword = async (req, res) => {
    const { email } = req.body;

    // Comprobar si el usuario existe
    const existeInstructor = await Instructor.findOne({ email });            

    if(!existeInstructor){
        const error = new Error("Usuario no Registrado");
        return res.status(400).json({msg: error.message})
    }

    try {
        existeInstructor.token = generarId();
        await existeInstructor.save();
        res.json({msg: "Checa tu email para las instrucciones"});        
    } catch (error) {
        console.log(error);
    }
}
const comprobarToken = async (req, res) => {
    const { token } = req.params;

    const tokenValido = await Instructor.findOne({ token });

    if(tokenValido){
        console.log('Existe');
    } else {
        console.log('No Existe');
    }
}

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const instructor = await Instructor.findOne({ token });

    if (!instructor) {
        const error = new Error("Token no válido");
        return res.status(400).json({ msg: error.message });
    }

    try {
        instructor.token = null;

        instructor.password = password;
        await instructor.save();
        res.json({msg: "Password modificado correctamente"});
    } catch (error) {
        console.log(error);
    }
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}