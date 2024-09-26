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
            const resp = await loginUser(data);
            sessionStorage.setItem('accessToken', resp.data.accessToken);
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
                            <button
                                onClick={() => setIsLogin(false)}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Don't have an account? Register
                            </button>
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
            setIsLogin(true);
        } catch (err) {
            toast.error('Registration failed.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Register in to BazaarBay.
                    </h2>
                </div>
                <form
                    className="mt-8 space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="rounded-md shadow-lg space-y-2">
                        <div className="p-2 flex items-center text-xl justify-center shadow-sm">
                            <input
                                type="text"
                                {...register('username')}
                                placeholder="Username"
                                required
                            />
                        </div>
                        <div className="p-2 flex items-center text-xl justify-center shadow-sm">
                            <input
                                type="email"
                                {...register('email')}
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="p-2 flex items-center text-xl justify-center shadow-sm">
                            <input
                                type="password"
                                {...register('password')}
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="p-2 flex items-center text-xl justify-center shadow-sm">
                            <input
                                type="text"
                                {...register('phone_no')}
                                placeholder="Phone no"
                                required
                            />
                        </div>
                        <div className="p-2 flex items-center text-xl justify-center shadow-sm">
                            <input
                                type="radio"
                                {...register('type')}
                                placeholder="UserType"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <button
                                onClick={() => setIsLogin(true)}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Have an account? Sign in.
                            </button>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
