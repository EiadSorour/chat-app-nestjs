import { Controller, Get, Post } from "@nestjs/common";

@Controller("/api/user")
export class AuthController{
    
    @Post("/register")
    register(){
        return {message: "Hello my friend"}; 
    }

    @Get("/login")
    login(){
        
    }
}