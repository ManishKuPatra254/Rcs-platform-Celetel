import { MoreVertical, ChevronLast, ChevronFirst, SettingsIcon, HomeIcon } from "lucide-react";
import { useState, useContext, createContext } from "react";

const SidebarContext = createContext();

export default function Sidebar() {

    const sidebarItems = [
        { icon: <HomeIcon />, text: "Dashboard", active: true, alert: true },
        { icon: <HomeIcon />, text: "Send Rcs" },
        { icon: <HomeIcon />, text: "Templates" },
        { icon: <HomeIcon />, text: "Reports" },
        { icon: <HomeIcon />, text: "Chats" },
        { icon: <SettingsIcon />, text: "Settings" },
    ];

    const [expanded, setExpanded] = useState(true);

    // eslint-disable-next-line react/prop-types
    const SidebarItem = ({ icon, text, active, alert }) => {
        const { expanded } = useContext(SidebarContext);

        return (
            <li
                className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"
                    }`}
            >
                {icon}
                <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
                {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />}
                {!expanded && (
                    <div
                        className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
                    >
                        {text}
                    </div>
                )}
            </li>
        );
    };

    return (
        <SidebarContext.Provider value={{ expanded }}>
            <div className="flex h-screen">
                <aside className="border-r border-gray-200 h-full flex flex-col bg-white shadow-sm" style={{ width: expanded ? '250px' : '80px' }}>
                    <div className="p-4 pb-2 flex justify-between items-center">
                        <img
                            src="https://img.logoipsum.com/243.svg"
                            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
                            alt=""
                        />
                        <button
                            onClick={() => setExpanded((curr) => !curr)}
                            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                        >
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>
                    <ul className="flex-1 px-3">
                        {sidebarItems.map((item, index) => (
                            <SidebarItem
                                key={index}
                                icon={item.icon}
                                text={item.text}
                                active={item.active}
                                alert={item.alert}
                            />
                        ))}
                    </ul>
                    <div className="border-t flex p-3">
                        <img
                            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                            alt=""
                            className="w-10 h-10 rounded-md"
                        />
                        <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
                            <div className="leading-4">
                                <h4 className="font-semibold">John Doe</h4>
                                <span className="text-xs text-gray-600">johndoe@gmail.com</span>
                            </div>
                            <MoreVertical size={20} />
                        </div>
                    </div>
                </aside>
                <main className="flex-1 p-4">
                    {/* Your main content goes here */}
                    Main Content
                </main>
            </div>
        </SidebarContext.Provider>
    );
}
