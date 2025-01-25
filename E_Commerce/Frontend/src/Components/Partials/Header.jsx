import React from 'react'

const Header = () => {
  return (
      <div className="font-['helvetica_now_display']">
    <nav className="w-full flex justify-between px-5 py-3">
        <h3 className="text-xl">💫wayCollections</h3>
             <div className="flex gap-5">
            <a href="/shop">Shop</a>
            <a href="/cart">Cart</a>
            <a href="/profile">My Account</a>
            <a className="text-red-600" href="/user/logout">Logout</a>
        </div>
    </nav>
    </div>
  )
}

export default Header
