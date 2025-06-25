import React from 'react'

import { Link } from "react-router"

import { PlusIcon } from 'lucide-react'

const Header = () => {
    return (
        <header className='bg-base-300 border-b border-base-content/10'>
            <div className='mx-auto max-w-6xl p-4'>
                <div className="flex items-center justify-between">
                    <h1 className='text-3xl font-bold text-primary font-mono tracking-tighter'>IdeaBoard</h1>
                    <div className='flex items-center gap-4'>
                        <Link to={"/create"} className="btn btn-primary">
                            <PlusIcon className="size-5" />
                            <span>New Note</span>
                        </Link>
                        <button
                            onClick={() => {
                                localStorage.removeItem('authToken');
                                window.location.href = '/';
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded-xl"
                        >
                            Logout
                        </button>

                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header