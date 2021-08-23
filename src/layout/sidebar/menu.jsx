import {DirectionsBike, Home, Group} from '@material-ui/icons'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import PaymentIcon from '@material-ui/icons/Payment';
import NotificationsIcon from '@material-ui/icons/Notifications';

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
        menutitle:"Sacco",
        menucontent:"",
        Items:[
            {
                title: 'Sacco Details', icon: AirportShuttleIcon, type: 'sub', active: false, children: [
                    { path: `/dashboard/members`, title: 'Sacco Members', type: 'link' },
                    { path: `/dashboard/sacco/profile`, title: 'Sacco Profile', type: 'link' },
                    { path: `/dashboard/members/import`, title: 'Import Members', type: 'link' },
                    { path: `/dashboard/members/new`, title: 'Add Member', type: 'link' },
                ]
            }
        ]
    },
    {
        menutitle:"Hospitals",
        menucontent:"",
        Items:[
            {
                title: 'Hospitals', icon: LocalHospitalIcon, type: 'sub', active: false, children: [
                    { path: `/dashboard/hospitals`, title: 'All Hospitals', type: 'link' }
                ]
            }
        ]
    },
    {
        menutitle:"Billing",
        menucontent:"",
        Items:[
            {
                title: 'Billing', icon: PaymentIcon, type: 'sub', active: false, children: [
                    { path: `/dashboard/billing/payment`, title: 'Lipa Na Mpesa Online', type: 'link' },
                    { path: `/dashboard/billing/payment`, title: 'Mpesa Paybill Online', type: 'link' },
                    { path: `/dashboard/billing/card-payment`, title: 'Mastercard Payment', type: 'link' },
                    { path: `/dashboard/billing/transactions`, title: 'Transaction Logs', type: 'link' },
                ]
            }
        ]
    },
    {
        menutitle:"Notifications",
        menucontent:"",
        Items:[
            {
                title: 'Notifications', icon: NotificationsIcon, type: 'sub', active: false, children: [
                    { path: `/dashboard/notifications/reminder/sms`, title: 'SMS Reminders', type: 'link' },
                    // { path: `/dashboard/notification/reminder/email`, title: 'Email Reminders', type: 'link' },
                ]
            }
        ]
    }
]