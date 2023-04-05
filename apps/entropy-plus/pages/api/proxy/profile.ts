import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import verifyToken from './auth';
import jwt from 'jsonwebtoken';
import {
    Profile,
} from "../../../interfaces";

interface ProfileResponse {
    profile: string;
}

interface AuthenticatedRequest extends NextApiRequest {
    profile: Profile;
}

const verifyToken = (handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>) => async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { profile: Profile };
        const profile = decoded.profile;
        req.profile = profile; // Set the user property on the request object
        await handler(req as AuthenticatedRequest, res); // Cast req to AuthenticatedRequest to satisfy TypeScript
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export default verifyToken;
