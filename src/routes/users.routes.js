import { Router } from 'express';
import { methods } from '../controllers/users.controller';

const router = Router();

router.post("/users/login", methods.login)
router.get("/users/getUsers", methods.getUsers);
router.post("/users/createUser", methods.createUser);
router.get("/users/getUser/:Id", methods.getUser);
router.delete("/users/deleteUser/:Id", methods.deleteUser);
router.put("/users/updateUser/:Id", methods.updateUser);

export default router;

