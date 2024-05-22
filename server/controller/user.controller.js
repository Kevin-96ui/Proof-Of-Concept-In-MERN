const user=require("../model/user.model.js")

const getUsers=async (req,res)=>{
    try{
        const users=await user.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message:error.message,
        });
    } 
};
const getUser=async (req,res)=>{
    try{
        const{id}=req.params;
        const users=await user.findById(id);
        if(!users) {
            return res.status(404).json("User doesnt exist");
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message:error.message,
        });
    } 
};

const createUser=async(req,res)=>{
    try{
        const {email}=req.body;
        const existinguser = await user.findOne({email});
        if (existinguser) {
            return res.status(400).json({message:"User with same email id already exist"});//400 already exist 404 not found 200 success 500bad request
        }
        const users = await user.create(req.body);
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({
            message:error.message,
        });
    }
};

const deleteUser=async(req,res)=>{
    try {
        const {id} =req.params;
        const users = await user.findByIdAndDelete(id);
        if(!users) {
            return res.status(404).json("User doesnt exist");
        }
        res.status(200).json("User Deleted");
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateUser = async(req,res)=>{
    try {
        const {email} = req.body;
        const {id} = req.params;
        const exisitinguser = await user.findOne({email});
        if (exisitinguser && exisitinguser._id !== id) {
            return res.status(400).json({message:"Already user exist with this email id!"});
        } 
        const users = await user.findByIdAndUpdate(id, req.body);
        if(!users) {
            return res.status(404).json("User doesnt exist");
        }
        res.status(200).json("User Updated successfully !");   
    } catch (error) {
        res.status(500).json({
            message: error.message,
        }); 
    }
}

module.exports={
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
}