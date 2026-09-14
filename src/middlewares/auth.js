const adminAuth = (req,res,next)=>{
    const token = "xyz"
    const authHead = "xyz" === token
    if(!authHead){
        res.status(401).send("Unauthorized")
    }else{
        next()
    }
}

const userAuth = (req,res,next)=>{
    const token = "xyz"
    const authHead = "xyz" === token
    if(!authHead){
        res.status(401).send("Unauthorized")
    }else{
        next()
    }
}

module.exports = { adminAuth, userAuth }