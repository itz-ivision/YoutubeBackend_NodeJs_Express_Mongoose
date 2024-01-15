import {Router} from 'express';
import { deleteUser, loginUser, logoutUser, refreshAccessToken, registerUser } from '../controllers/user.controllers.js';
import {upload} from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router()

// user register route
router.route('/register').post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
);

// user login route
router.route('/login').post(loginUser);

// secured routes
router.route('/logout').post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/delete-user").post(deleteUser);

export default router;