const JwtStrategy=require("passport-jwt").Strategy
const ExtractJwt=require("passport-jwt").ExtractJwt
const Utilizator=require("../models/Utilizator")
const key=require("./keys").secret

const opts={}
//extrage tokenul din header asa cum este
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey=key;
module.exports=passport=>{
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
        Utilizator.findById(jwt_payload._id).then(user=>{
            if(user) return done(null,user)
            return done(null,false)
        }).catch(err=>console.log(err))
    }))
}