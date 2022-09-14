import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
   try {
        console.log("request",req.headers)
       const token = req.headers.authorization.split(' ')[1];
       
       const  isCustomAuth = token.length < 500;
       let decodedData;

       if(token && isCustomAuth) {
        decodedData = jwt.verify(token, "TEST");

        req.userId = decodedData?.id;
       } else {
        decodedData = jwt.decode(token);
        req.userId = decodedData.sub;
        // console.log("hello")
       }

       console.log("token", token)
       next();
    }
     
    catch (error) {
        console.log(error)
    }
}

export default auth;