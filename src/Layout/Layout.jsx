import {
    Home,
    LineChart,
    Search,
    Settings,
    Send,
    Users2,
    LayoutPanelTop,
    GalleryHorizontalEnd,
    MessageCircleMore,
    ChevronDown,
    BellDot,
} from "lucide-react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Link as RouterLink } from 'react-router-dom';
import { Fragment } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import mainceltellogo from '../assets/Group (1).svg'
import mainlogofull from '../assets/main_logo.svg'
import { ThemeProvider } from "@/Theme/Themeprovider"
import { useTheme } from "@/Theme/Themeprovider"
import { Moon, Sun } from "lucide-react"
import Cookies from "js-cookie"

// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
const generateBreadcrumbs = (pathname) => {
    const pathnames = pathname.split('/').filter((x) => x);
    return pathnames.map((_, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const breadcrumb = capitalizeFirstLetter(pathnames[index].replace(/-/g, ' '));
        return {
            path: routeTo,
            breadcrumb,
        };
    });
};

// eslint-disable-next-line react/prop-types
const AdminLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const breadcrumbs = generateBreadcrumbs(location.pathname);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('typerole');
        navigate('/');
    };
    return (
        <Fragment>
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                    <Link
                        className="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                    >
                        <img
                            src="/src/assets/logo1.png"
                            alt="Description"
                            className="h-auto w-auto transition-all group-hover:scale-110 object-cover"
                        />
                    </Link>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                to="/admindashboard"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Home className="h-5 w-5" />
                                <span className="sr-only">Dashboard</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Dashboard</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                to={''}
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Send className="h-5 w-5" />
                                <span className="sr-only">Send Rcs</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Send Rcs</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                to={''}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <LayoutPanelTop className="h-5 w-5" />
                                <span className="sr-only">Templates</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Templates</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                to={'/userlists'}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Users2 className="h-5 w-5" />
                                <span className="sr-only">Users</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Users</TooltipContent>
                    </Tooltip>


                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                to={''}
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <LineChart className="h-5 w-5" />
                                <span className="sr-only">Reports</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Reports</TooltipContent>
                    </Tooltip>


                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Settings className="h-5 w-5" />
                                <span className="sr-only">Settings</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip>
                </nav>
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <GalleryHorizontalEnd className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    className="group flex shrink-0 items-start justify-start gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                                >
                                    <img
                                        src="/src/assets/main_logo.svg"
                                        alt="Description"
                                        className="h-auto w-auto transition-all group-hover:scale-110 object-cover"
                                    />
                                </Link>
                                <Link
                                    to={''}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <Link
                                    to={''}
                                    className="flex items-center gap-4 px-2.5 text-foreground"
                                >
                                    <Send className="h-5 w-5" />
                                    Send Rcs
                                </Link>
                                <Link
                                    to={''}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <LayoutPanelTop className="h-5 w-5" />
                                    Templates
                                </Link>
                                <Link
                                    to={'/userlists'}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Users2 className="h-5 w-5" />
                                    Users
                                </Link>
                                <Link
                                    to={''}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <LineChart className="h-5 w-5" />
                                    Reports
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <RouterLink to="/admindashboard">Dashboard</RouterLink>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {breadcrumbs.map((breadcrumb, index) => (
                                <Fragment key={breadcrumb.path}>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        {index === breadcrumbs.length - 1 ? (
                                            <BreadcrumbPage>
                                                {breadcrumb.breadcrumb}
                                            </BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <RouterLink to={breadcrumb.path}>
                                                    {breadcrumb.breadcrumb}
                                                </RouterLink>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                </Fragment>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="overflow-hidden rounded-full"
                            >
                                <img
                                    src="/src/assets/main_logo.svg"
                                    width={36}
                                    height={36}
                                    alt="Avatar"
                                    className="overflow-hidden rounded-full"
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenu>
                                <Link to="/adminprofile" className="no-underline text-inherit">
                                    <DropdownMenuItem>
                                        Profile
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenu>

                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenu>
                                <span onClick={handleLogout} className="no-underline text-inherit">
                                    <DropdownMenuItem>
                                        Logout
                                    </DropdownMenuItem>
                                </span>
                            </DropdownMenu>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main>
                    {children}
                </main>
            </div>
        </Fragment>

    )
};


// eslint-disable-next-line react/prop-types
const UserLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const breadcrumbs = generateBreadcrumbs(location.pathname);
    const { setTheme } = useTheme();


    const handleLogoutUser = () => {
        Cookies.remove('logins');
        navigate('/');
    };

    const logins = Cookies.get('logins');
    let username = '';
    // let typerole = '';

    if (logins) {
        try {
            const parsedLogins = JSON.parse(logins);
            if (parsedLogins.length > 0) {
                const lastLogin = parsedLogins[parsedLogins.length - 1];
                username = lastLogin.username;
                // typerole = lastLogin.typerole;
            }
        } catch (e) {
            console.error("Failed to parse logins cookie:", e);
        }
    }

    const firstLetter = username ? username.charAt(0).toUpperCase() : '';

    // const initialname = username.charAt(0);


    return (
        <Fragment>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">

                <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-background sm:flex">
                    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                        <Link
                            className="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                        >
                            <img
                                src={mainceltellogo}
                                alt="Description"
                                className="h-auto w-auto transition-all group-hover:scale-110 object-cover"
                            />
                        </Link>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to="/userdashboard"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <Home className="h-5 w-5" />
                                    <span className="sr-only">Dashboard</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Dashboard</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to={'/sendrcs'}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <Send className="h-5 w-5" />
                                    <span className="sr-only">Send Rcs</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Send Rcs</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to="/templateslist"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <LayoutPanelTop className="h-5 w-5" />
                                    <span className="sr-only">Templates</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Templates</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to={'/reports'}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <LineChart className="h-5 w-5" />
                                    <span className="sr-only">Reports</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Reports</TooltipContent>
                        </Tooltip>


                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to={'/chatdetails'}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <MessageCircleMore className="h-5 w-5" />
                                    <span className="sr-only">Chats</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Chats</TooltipContent>
                        </Tooltip>
                    </nav>
                    <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    to={'/usersettings'}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <Settings className="h-5 w-5" />
                                    <span className="sr-only">Settings</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Settings</TooltipContent>
                        </Tooltip>
                    </nav>
                </aside>



                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                    <header className="sticky top-0 z-30 flex h-14 items-center border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button size="icon" variant="outline" className="sm:hidden">
                                    <GalleryHorizontalEnd className="h-5 w-5" />
                                    <span className="sr-only">Toggle Menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="sm:max-w-xs">
                                <nav className="grid gap-6 text-lg font-medium">
                                    <Link
                                        className="group flex shrink-0 items-start justify-start gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                                    >
                                        <img
                                            src={mainlogofull}
                                            alt="Description"
                                            className="h-auto w-auto transition-all group-hover:scale-110 object-cover"
                                        />
                                    </Link>
                                    <Link
                                        to={'/userdashboard'}
                                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    >
                                        <Home className="h-5 w-5" />
                                        Dashboard
                                    </Link>
                                    <Link
                                        to={'/sendrcs'}
                                        className="flex items-center gap-4 px-2.5 text-foreground"
                                    >
                                        <Send className="h-5 w-5" />
                                        Send Rcs
                                    </Link>
                                    <Link
                                        to={'/templateslist'}
                                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    >
                                        <LayoutPanelTop className="h-5 w-5" />
                                        Templates
                                    </Link>

                                    <Link
                                        to={'/reports'}
                                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    >
                                        <LineChart className="h-5 w-5" />
                                        Reports
                                    </Link>

                                    <Link
                                        to={'/chatdetails'}
                                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    >
                                        <MessageCircleMore className="h-5 w-5" />
                                        Chats
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                        <Breadcrumb className="hidden md:flex">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <RouterLink to="/userdashboard">Dashboard</RouterLink>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {breadcrumbs.map((breadcrumb, index) => (
                                    <Fragment key={breadcrumb.path}>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            {index === breadcrumbs.length - 1 ? (
                                                <BreadcrumbPage>
                                                    {breadcrumb.breadcrumb}
                                                </BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink asChild>
                                                    <RouterLink to={breadcrumb.path}>
                                                        {breadcrumb.breadcrumb}
                                                    </RouterLink>
                                                </BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>
                                    </Fragment>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="relative ml-auto flex-1 md:grow-0">
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-2 mt-1">
                                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                    <span className="sr-only">Toggle theme</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                    Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                    System
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>


                        <Search className="mr-4 h-5 w-5" />
                        <BellDot className="mr-4 h-5 w-5" />

                        <Button
                            variant="ghost"
                            size="icon"
                            className="overflow-hidden rounded-full cursor-default p-0">
                            <Avatar className="p-0 h-8 w-8 mr-2">
                                <AvatarImage src="" alt={username} />
                                <AvatarFallback className="font-semibold bg-slate-300 text-slate-800">{firstLetter}</AvatarFallback>
                            </Avatar>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="p-0">
                                    <span className="font-semibold">{username}</span>
                                    <ChevronDown className="ml-1 h-5 w-5 text-slate-400" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                {/* <DropdownMenuLabel>{username}</DropdownMenuLabel> */}
                                <DropdownMenuSeparator />
                                <DropdownMenu>
                                    <Link to="/userprofile" className="no-underline text-inherit">
                                        <DropdownMenuItem>
                                            Profile
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenu>
                                <DropdownMenu>
                                    <Link to="/usersettings" className="no-underline text-inherit">
                                        <DropdownMenuItem>
                                            Settings
                                        </DropdownMenuItem>
                                    </Link>
                                </DropdownMenu>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenu>
                                    <span onClick={handleLogoutUser} className="no-underline text-inherit">
                                        <DropdownMenuItem>
                                            Logout
                                        </DropdownMenuItem>
                                    </span>
                                </DropdownMenu>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </header>

                    <main>
                        {children}
                    </main>

                </div>
            </div>
        </Fragment>

    )
};

// eslint-disable-next-line react/prop-types
const DefaultLayout = ({ children }) => {
    <Fragment>
        {children}
    </Fragment>
};



// eslint-disable-next-line react/prop-types
export function Layout({ children }) {

    let existingLogins = Cookies.get('logins');
    existingLogins = existingLogins ? JSON.parse(existingLogins) : [];

    // Get the 'typerole' of the last login (or handle as needed)
    let typeRole = existingLogins.length > 0 ? existingLogins[existingLogins.length - 1].typerole : null;

    console.log(typeRole, "responsetyperole");

    const renderLayout = () => {
        if (typeRole === 'admin') {
            return <AdminLayout>{children}</AdminLayout>;
        } else if (typeRole === 'user') {
            return <UserLayout>{children}</UserLayout>;
        } else {
            return <DefaultLayout>{children}</DefaultLayout>;
        }
    };

    return (
        <Fragment>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        {renderLayout()}
                    </main>
                </ThemeProvider>
            </div>
        </Fragment>
    );
}
