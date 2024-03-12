import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService:JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = request.handshake.headers.authorization.split(" ")[1];
        try {
            request.data.payload = this.jwtService.verify(token);
        } catch (error) {
            throw new WsException(error.message);
        }

        return true;
    }
}