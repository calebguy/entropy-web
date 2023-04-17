import { NextApiRequest, NextApiResponse } from "next";

export const authMiddleware = (req: NextApiRequest, res: NextApiResponse) => {
    const profileHandle = req.cookies.profileHandle;

    if (!profileHandle) {
        res.status(401).json({ message: "You need to be logged in to access this resource" });
    } else {
        console.log(`User ${profileHandle} is logged in`);
    }
};
export default authMiddleware;
