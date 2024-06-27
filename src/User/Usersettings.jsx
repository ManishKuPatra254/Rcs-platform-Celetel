import { Layout } from '@/Layout/Layout'
import { Fragment } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Usersettings() {
    return (
        <Fragment>
            <Layout>
                <div className="space-y-6 p-10 pb-16 md:block w-full">
                    <div className="space-y-0.5">
                        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                        <span className="text-muted-foreground text-xs mt-5">Submit Your Bot Details
                        </span>
                    </div>
                    <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-6">

                    </div>
                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                        <aside className="-mx-4 lg:w-[14%]">
                            <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                                <Link>
                                    <a className="flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:cursor-pointer justify-start">Bots</a>
                                </Link>

                                <Link to={'/usersettings/createbot'}>
                                    <a className="flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 bg-muted hover:bg-muted justify-start">
                                        Create Bot
                                    </a>
                                </Link>

                                <Link>
                                    <a className="flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:bg-transparent hover:cursor-pointer justify-start">Account</a>
                                </Link>
                            </nav>
                        </aside>
                        <div className="lg:w-full">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}
