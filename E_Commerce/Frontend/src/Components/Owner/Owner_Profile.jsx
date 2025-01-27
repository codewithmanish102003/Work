import React from 'react'

const Owner_Profile = () => {
    return (
        <div>
            <div class="container mx-auto p-6">
                <h1 class="text-3xl font-bold text-primary mb-6">Owner Profile</h1>

                {/* <!-- Owner Details --> */}
                <div class="bg-white p-6 rounded-lg shadow-lg mb-6">
                    <div class="flex gap-4 items-center">
                        <div>
                            <div class="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                                No Image
                            </div>
                        </div>
                        <div>
                            <p class="text-gray-600"><span class="font-semibold">Full Name:</span>Manish Prajapati</p>
                            <p class="text-gray-600"><span class="font-semibold">Email:</span>marveluniverse1942@gmail.com</p>
                            <p class="text-gray-600"><span class="font-semibold">GST No:</span>GST NO.</p>
                        </div>

                    </div>
                </div>

                {/* <!-- Products Created by Owner --> */}
                <div class="bg-white p-6 rounded-lg shadow-lg mb-6">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Products Created</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* <div class="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <h3 class="text-xl font-semibold text-gray-800">Cling Bag</h3>
                            <p class="text-gray-600">Price:1200 </p>
                            <p class="text-gray-600">Discount: 100</p>
                            <p class="text-gray-600">Created At: date</p>
                        </div> */}
                        <p>No products created yet.</p>
                    </div>
                </div>

                {/* <!-- Users Who Added Products to Cart --> */}
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Users with Products in Cart</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div class="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <h3 class="text-xl font-semibold text-gray-800">full name</h3>
                            <p class="text-gray-600">Email: </p>
                            <p class="text-gray-600">Products in Cart:</p>
                            {/* <ul class="list-disc list-inside">
                            <% user.cart.forEach(product => { %>
                                <li class="text-gray-600"><%= product.name %></li>
                            <% }); %>
                        </ul> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Owner_Profile
