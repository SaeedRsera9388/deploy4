import React from 'react'
import { IoMenu } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { CiHome } from "react-icons/ci";
import { HiInformationCircle } from "react-icons/hi";
import { MdReadMore } from "react-icons/md";

export const SidebarData = [
    {title:'Home',
    path: '/',
    icon: <CiHome />,
    cName: 'nav-text'
},
    {title:'About',
    path: '/About',
    icon: <HiInformationCircle />,
    cName: 'nav-text'
},
//     {title:'Pricing',
//     path: '/Pricing',
//     icon: <MdReadMore />,
//     cName: 'nav-text'
// },
    {title:'Service',
    path: '/Service',
    icon: <MdReadMore />,
    cName: 'nav-text'
},
    {title:'More',
    path: '/More',
    icon: <MdReadMore />,
    cName: 'nav-text'
}
]