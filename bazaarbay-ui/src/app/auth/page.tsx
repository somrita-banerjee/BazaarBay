'use client';

import { loginUser, registerUser } from '@/src/utils/api';
import { LoginRequestBodyDTO, RegisterRequestBodyDTO } from '@/src/utils/dto';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useState } from 'react';

export default function Auth() {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    if (isLogin) return <Login setIsLogin={setIsLogin} />;
    else return <Register setIsLogin={setIsLogin} />;
}
interface Props {
    setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const Login: React.FC<Props> = ({ setIsLogin }) => {
    const { register, handleSubmit } = useForm<LoginRequestBodyDTO>();
    const router = useRouter();

    const onSubmit = async (data: LoginRequestBodyDTO) => {
        try {
            await loginUser(data);
            toast.success('Login successful !');
            router.push('/');
        } catch (err) {
            toast.error('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="rounded-md shadow-lg space-y-2">
                        <div className="p-2 flex items-center text-xl justify-center shadow-sm">
                            <input
                                id="username"
                                type="text"
                                placeholder="Username"
                                {...register('username', {
                                    required: 'Username is required',
                                })}
                            />
                        </div>
                        <div className="p-2 flex items-center text-xl justify-center shadow-sm">
                            <input
                                id="password"
                                type="password"
                                placeholder="Password"
                                {...register('password', {
                                    required: 'Password is required',
                                })}
                                // className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${error.name ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                // placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Register: React.FC<Props> = ({ setIsLogin }) => {
    const { register, handleSubmit } = useForm<RegisterRequestBodyDTO>();
    const router = useRouter();

    const onSubmit = async (data: RegisterRequestBodyDTO) => {
        try {
            await registerUser(data);
            toast.success('Registration successful!');
            router.push('/login');
        } catch (err) {
            toast.error('Registration failed.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                {...register('username')}
                placeholder="Username"
                required
            />
            <input
                type="email"
                {...register('email')}
                placeholder="Email"
                required
            />
            <input
                type="password"
                {...register('password')}
                placeholder="Password"
                required
            />
            <input
                type="number"
                {...register('phone_no')}
                placeholder="Phone no"
                required
            />
            <input
                type="radio"
                {...register('type')}
                placeholder="UserType"
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};
