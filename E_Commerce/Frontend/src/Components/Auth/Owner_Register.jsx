import React from 'react'

const Owner_Register = () => {
    return (
        <div>
            <div className="w-full flex items-center justify-center h-screen mt-[-40px]">
                <div className="w-1/2 px-32">
                    <h3 className="text-4xl">welcome to <span className="text-blue-400 font-semibold">Starway Collections</span></h3>
                    <h4 className="text-2xl mb-5">create your account</h4>
                    <form autoComplete="off" action="/owners/register" method="post">
                        <input className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                            type="text" placeholder="Full Name" name="fullname" />
                        <input className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                            type="email" placeholder="Email" name="email" />
                        <input className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                            type="password" placeholder="Password" name="password" />
                        <input className="bg-zinc-100 block w-full px-3 py-2 border-[1px] rounded-md mb-3 border-zinc-200"
                            type="text" placeholder="Gst Number" name="gstno" />
                        <input className="px-5 rounded-full py-3 mt-2 bg-blue-500 text-white cursor-pointer" type="submit"
                            value="Create My Account" />
                    </form>
                </div>
                <div className="w-1/2 mt-[-100px]"> 
                    <img className="w-[80%]"
                        src="../public/529a37a2-4db1-4213-afb8-d18294c695e9.png"
                        alt="starway collections logo"
                    />
                </div>
            </div>
            <div className="flex justify-center items-center mt-[-100px]">
                <p>Already have an Account?? <a className="text-blue-700" href="/login">Login</a></p>
            </div>
        </div>
    )
}

export default Owner_Register;