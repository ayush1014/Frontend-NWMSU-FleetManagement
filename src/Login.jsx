import nwmsu_img_1 from './assets/northwestmissouri.jpg';
import nwmsu_logo from './assets/nwmsu-logo.svg';
import { React, useState, useEffect } from 'react';
import { replace, useNavigate } from 'react-router-dom';
import api from './Config/axios';
import { useUser } from './AppContext/userContext';
import { XCircleIcon } from '@heroicons/react/20/solid'
import { OrbitProgress } from 'react-loading-indicators'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useUser();
    const [failedLogin, setFailedLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const fromPortfolio = params.get('fromPortfolio');
      
        if (fromPortfolio === 'true') {
          setEmail("ayushkanaujia14@gmail.com");
          setPassword("ayush");
        }
      }, []);

      
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Following APi")
        setIsLoading(true)
        try {
            const response = await api.post('/login', {
                email,
                password
            });
            if (response.status == 200) {
                const data = response.data.user;
                login(data)
                navigate('/home', { replace: true });
                setIsLoading(false)
            } else {
                setFailedLogin(true);
                setIsLoading(false)
            }
        } catch (error) {
            console.error('Login error:', error);
            setFailedLogin(true);
            setIsLoading(false)
        }
    };


    return (
        <>
            {isLoading ? (
                <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
                    <OrbitProgress color={["#031a03", "#094709", "#0e750e", "#13a313"]} />
                </div>
            ) : (
                <div>
                </div>
            )}

            {failedLogin ? (<div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                    <div className="shrink-0">
                        <XCircleIcon aria-hidden="true" className="size-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Wrong login credentials</h3>
                        <div className="mt-2 text-sm text-red-700">
                            <ul role="list" className="list-disc space-y-1 pl-5">
                                <li>Please check your email</li>
                                <li>Make sure you are entering correct password</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>) : (<div></div>)}
            <div className="flex flex-1">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <img
                                alt="NWMSU Logo"
                                src={nwmsu_logo}
                                className="h-10 w-auto"
                            />
                            <h2 className="mt-8 text-2xl font-semibold leading-9 tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>

                        <div className="mt-10">
                            <div>
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder='Bearcat@nwmissouri.edu'
                                                required
                                                autoComplete="email"
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                required
                                                autoComplete="current-password"
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-grey-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                            <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-700">
                                                Remember me
                                            </label>
                                        </div>

                                        <div className="text-sm leading-6">
                                            <a href="#" className="font-semibold text-green-800 hover:text-red-600 transition-colors duration-200 ease-in-out">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="mt-10">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative hidden lg:flex lg:w-full h-screen">
                    <img
                        alt="Northwest Missouri State University"
                        src={nwmsu_img_1}
                        className="absolute inset-0 h-full w-full object-fit"
                    />
                </div>

            </div>
        </>
    )
}
