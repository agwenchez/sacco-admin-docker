import {DirectionsBike, Home, Group} from '@material-ui/icons'
export const MENUITEMS = [
    {
        menutitle:"Home",
        menucontent:"",
        Items:[
            {
                title: 'Dashboard', icon: Home, type: 'sub', active: false, children: [
                    { path: `/dashboard/`, title: 'Home', type: 'link' },
                ]
            }
        ]
    },
    {
        menutitle:"Sacco Members",
        menucontent:"",
        Items:[
            {
                title: 'Sacco', icon: DirectionsBike, type: 'sub', active: false, children: [
                    { path: `/dashboard/members`, title: 'Sacco Members', type: 'link' },
                    { path: `/dashboard/sacco/profile`, title: 'Sacco Profile', type: 'link' },
                ]
            }
        ]
    }
]