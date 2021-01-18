import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {SECRET} from '../config';
import * as jwt from 'jsonwebtoken';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {

    const req = ctx.switchToHttp().getRequest();
    // console.log('data::: ', req.user)
    // if route is protected, there is a user set in auth.middleware
    if (!!req.user) {
        return !!data ? req.user[data] : req.user;
    }

    // in case a route is not protected, we still want to get the optional auth user from jwt
    const token = req.headers.authorization ? (req.headers.authorization as string).split(' ') : null;
    console.log('token 总该有吧 ', token)
    if (token && token[0]) {
        const decoded: any = jwt.verify(token[0], SECRET);
        console.log('decoded:::: ', decoded)
        return !!data ? decoded[data] : decoded.user;
    }
});
