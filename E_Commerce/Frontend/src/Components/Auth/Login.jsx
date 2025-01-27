import React from 'react'

const Login = () => {
    return (
        <div>
            <div className="w-full h-screen flex px-20 mt-[-55px]">
                <div className="w-1/2 flex items-center justify-center h-screen">
                    <div className="w-full px-32">
                        <h3 className="text-4xl">welcome to <span className="text-blue-400 font-semibold">Starway Collections</span></h3>
                        <h4 className="text-2xl mb-5">create your account</h4>
                        <form autoComplete="off" action="/user/register" method="post">
                            <input
                                className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                                type="text" placeholder="Full Name" name="fullname" />
                            <input
                                className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                                type="email" placeholder="Email" name="email" />
                            <input
                                className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                                type="password" placeholder="Password" name="password" />
                            <div className="flex gap-3">
                                <input className="px-5 rounded-full py-3 mt-2 bg-blue-500 text-white cursor-pointer" type="submit"
                                    value="Create My Account" />
                                <div className="px-5 rounded-full py-3 mt-2 bg-blue-500 text-white">
                                    <a href="login/owner_register">Register As Owner</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="w-1/2 flex items-center justify-center h-screen">
                    <div className="w-full px-32">
                        <h4 className="text-2xl capitalize mb-5">login your account</h4>
                        <form autoComplete="off" action="/user/login" method="post">
                            <input
                                className="block bg-zinc-100 w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                                type="email" placeholder="Email" name="email" />
                            <input
                                className="block bg-zinc-100 w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                                type="password" placeholder="Password" name="password" />
                            <input className="px-5 block rounded-full py-3 mt-2 bg-blue-500 text-white cursor-pointer" type="submit"
                                value="Login" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;