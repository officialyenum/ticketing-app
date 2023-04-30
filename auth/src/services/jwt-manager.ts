
import jwt, { JwtPayload } from "jsonwebtoken";

interface IPayload {
    id: string,
    email: string
}
export class JwtManager {
    static generate(payload: IPayload) {
        // Generate JWT
        const token = jwt.sign({
            id: payload.id,
            email:payload.email
        }, process.env.JWT_KEY!);
        return token;
    }

    static validate(token: string) {
        // Generate JWT
        const payload = jwt.verify(token, process.env.JWT_KEY!);
        return payload;
    }
}