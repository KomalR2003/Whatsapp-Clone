import User from "../model/User.js";

export const addUser = async (request, response) => {
    try{
        let exist = await User.findOne({sub: request.body.sub}); //chack user are already exist or not
        
        if(exist){
            response.status(200).json({msg: 'user already exist'});
            return;
        }

        const newUser =  new User(request.body);
        await newUser.save();
        return response.status(200).json(newUser);

    }catch(error){
        return response.status(500).json(error.message);
    }
}

// get data 

export const getUsers = async (request, response) => {
    try{
        const users =  await User.find({});
        return response.status(200).json(users);
    }catch(error){
        return response.status(500).json(error.message);
    }
}

