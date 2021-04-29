// dashbaord
import Default from '../components/dashboard/default'
import Ecommerce from '../components/dashboard/dashboard'

// widgets
import GeneralWidget from '../components/widgets/general'
import ChartsWidget from '../components/widgets/charts'

 // Forms
 import FormValidation from '../components/forms/form-control/form-validation'
 import BaseInput from '../components/forms/form-control/baseInput'
 import InputGroup from '../components/forms/form-control/inputGroup'
 import MegaOption from '../components/forms/form-control/megaOption'
 import CheckboxandRadio from '../components/forms/form-control/checkboxandRadio'
 
 // Form Layout
 import FormDefault from '../components/new/form-layout/formDefault'
 import FormWizard1 from '../components/forms/form-layout/form-wizard-1/formwizard1'
 
  // Forms widgets
 import Datepicker from '../components/forms/form-widget/datepicker'
 import Timepicker from '../components/forms/form-widget/timepickerComponent/timepicker'
 import Typeahead from '../components/forms/form-widget/typeaheadComponent/typeahead'
 


 // Charts
// import Apexcharts from "../components/charts/apexCharts"
// import GoogleCharts from "../components/charts/googleCharts"
// import KnobChart from "../components/charts/knobChart"
// import Chartsjs from "../components/charts/chartsjs"
// import Chartist from "../components/charts/chartistCharts"



// Users
import UserProfile from "../components/users/userProfile"
import UserEdit from "../components/users/userEdit"
import UserCards from "../components/users/userCards"



// Search page 
// import Search from "../components/search"


import MembersTable from "../components/new/MembersTable";
import SaccoTable from "../components/new/SaccoTable";
import SaccoMemberRegistration from "../components/new/Formik/SaccoMemberRegistration";
import SaccoRegistration from "../components/new/Formik/SaccoRegistration";
import Login from "../components/new/Login";

export const routes = [
        // { path:"/dashboard/default", Component:Default},
        { path:"/dashboard/", Component:Ecommerce},
        { path:"/dashboard/members", Component:MembersTable},
        { path:"/dashboard/saccos", Component:SaccoTable},
        { path:"/dashboard/members/new", Component:SaccoMemberRegistration},
        { path:"/dashboard/saccos/new", Component:SaccoRegistration},
        { path:"/dashboard/login", Component:Login},

        { path:"/widgets/general", Component:GeneralWidget},
        { path:"/widgets/chart", Component:ChartsWidget},

        { path:"/forms/form-validation", Component:FormValidation},
        { path:"/forms/baseInput", Component:BaseInput},
        { path:"/forms/inputGroup", Component:InputGroup},
        { path:"/forms/megaOptions", Component:MegaOption},
        { path:"/forms/radio-checkbox", Component:CheckboxandRadio},
        { path:"/form-layout/formDefault", Component:FormDefault},
        { path:"/form-layout/formWizard", Component:FormWizard1},

        { path:"/form-widget/datepicker", Component:Datepicker},
        { path:"/form-widget/timepicker", Component:Timepicker},
        { path:"/form-widget/typeahead", Component:Typeahead},

        // { path:"/charts/apexCharts", Component:Apexcharts},
        // { path:"/charts/googleChart", Component:GoogleCharts},
        // { path:"/charts/knobChart", Component:KnobChart},
        // { path:"/charts/chartJs", Component:Chartsjs},
        // { path:"/charts/chartistComponent", Component:Chartist},

        { path:"/app/users/userProfile", Component:UserProfile},
        { path:"/app/users/userEdit", Component:UserEdit},
        { path:"/app/users/userCards", Component:UserCards},




       

        

]