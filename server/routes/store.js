import express from "express"; 
import storeController from "../controllers/store.js";




const router = express.Router(); 


//TODO: set up controllers to handle these routes


router.get("/", storeController.getHome); 




export default router; 
