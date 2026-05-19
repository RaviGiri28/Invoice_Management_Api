import { AppDataSource } from "../../data-source";
import { User } from "../../entities/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ENV } from "../../config/env";

const userRepository = AppDataSource.getRepository(User);

export const registerService = async (name: string, email: string, password: string) => {
    const existingUser = await userRepository.findOne({
        where: { email }
    });
    if (existingUser) {
        throw new Error('User with this email already exists!');
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({
        name,
        email,
        password: hashedpassword,
    });

    await userRepository.save(user);

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

export const loginService = async (email: string, password: string) => {
    const user = await userRepository.findOne({
        where: { email }
    });
    if (!user) {
        throw new Error('Invalid email or password');
    };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password!');
    }
    const token = jwt.sign(
        { id: user.id, email: user.email },
        ENV.JWT_SECRET,
        { expiresIn: '7d' }
    );

    const { password: _, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
}