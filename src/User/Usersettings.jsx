import { Layout } from '@/Layout/Layout';
import { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Usersettings() {
    return (
        <Fragment>
            <Layout>
                <div className="space-y-6 p-10 pb-16 md:block w-full">
                    <div className="space-y-0.5">
                        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                        <span className="text-muted-foreground text-xs mt-5">Submit Your Bot Details</span>
                    </div>
                    <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full my-6"></div>
                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                        <aside className="-mx-4 lg:w-[14%]">
                            <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                                <Link
                                    to={'/usersettings/botlist'}
                                    className="flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:cursor-pointer justify-start focus:bg-slate-300"
                                >
                                    Bots
                                </Link>
                                <Link
                                    to={'/usersettings/createbot'}
                                    className="flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 hover:cursor-pointer justify-start h-9 px-4 py-2  hover:bg-muted active:bg-slate-300 focus:bg-slate-300 focus:outline-none"
                                >
                                    Create Bot
                                </Link>
                                <Link
                                    to={'/usersettings/account'}
                                    className="flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 px-4 py-2 hover:cursor-pointer justify-start focus:bg-black focus:text-white"
                                >
                                    Account
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
    );
}
