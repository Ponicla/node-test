
import { getConnection } from "./../database/database"

const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try{
        const { Pone, password } = req.body;
        
        if(Pone == undefined || password == undefined){
            res.status(400).json({ message : "Bad request"});
        }
        
        const l_user = { Pone, password }
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM users WHERE Pone = ? AND password = ?", [l_user.Pone, l_user.password]);
        jwt.sign(l_user, 'secretkey', (err, token) => {
            let obj = {
                "user": result[0],
                "access_token": token
            }
            res.json(obj);
        })
    }catch{
        res.status(500);
        console.log(error.message);
    }
};

const getUsers = async (req, res) => {
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM users");
        res.json(result);
    }catch{
        res.status(500);
        res.send(error.message);
    }
};

const createUser = async (req, res) => {
    try{
        const { Email, Name, Pone, address, password } = req.body;
        
        if(Email == undefined || Name == undefined){
            res.status(400).json({ message : "Bad request"});
        }
        
        const i_user = { Email, Name, Pone, address, password }
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO users SET ?", i_user);
        res.json({message : "User correctly add"});
    }catch{
        res.status(500);
        console.log(error.message);
    }
};

const getUser = async (req, res) => {
    try{
        const { Id } = req.params;
        
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM users WHERE Id = ?", Id);
        res.json(result);
    }catch{
        res.status(500);
        console.log(error.message);
    }
};

const deleteUser = async (req, res) => {
    try{
        const { Id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM users WHERE Id = ?", Id);
        res.status(204).send({ message : "User deleted"});
    }catch{
        res.status(500);
        console.log(error.message);
    }
};

const updateUser = async (req, res) => {
    try{
        const { Id } = req.params;
        const { Email, Name, Pone, address, password } = req.body;
        
        if(Id == undefined){
            res.status(400).json({ message : "Bad request"});
        }
        
        const u_user = { Email, Name, Pone, address, password }
        const connection = await getConnection();
        const result = await connection.query("UPDATE users SET ? WHERE Id = ?", [u_user, Id]);
        res.json(result);
    }catch{
        res.status(500);
        console.log(error.message);
    }
};

export const methods = {
    getUsers,
    createUser,
    getUser,
    deleteUser,
    updateUser,
    login
}