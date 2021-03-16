import Buttons from "views/Components/Buttons.js";
import Calendar from "views/Calendar/Calendar.js";
import Charts from "views/Charts/Charts.js";
import Dashboard from "views/Dashboard/Dashboard.js";
import ErrorPage from "views/Pages/ErrorPage.js";
import ExtendedForms from "views/Forms/ExtendedForms.js";
import ExtendedTables from "views/Tables/ExtendedTables.js";
import FullScreenMap from "views/Maps/FullScreenMap.js";
import GoogleMaps from "views/Maps/GoogleMaps.js";
import GridSystem from "views/Components/GridSystem.js";
import Icons from "views/Components/Icons.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";
import LoginPage from "views/Pages/LoginPage.js";
import Notifications from "views/Components/Notifications.js";
import Panels from "views/Components/Panels.js";
import PricingPage from "views/Pages/PricingPage.js";
import RTLSupport from "views/Pages/RTLSupport.js";
import ReactTables from "views/Tables/ReactTables.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import RegularForms from "views/Forms/RegularForms.js";
import RegularTables from "views/Tables/RegularTables.js";
import SweetAlert from "views/Components/SweetAlert.js";
import TimelinePage from "views/Pages/Timeline.js";
import Typography from "views/Components/Typography.js";
import UserProfile from "views/Pages/UserProfile.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import VectorMap from "views/Maps/VectorMap.js";
import Widgets from "views/Widgets/Widgets.js";
import Wizard from "views/Forms/Wizard.js";

import SevenAForms from 'views/Forms/SevenAForms'
import FormTemplate from 'views/FormTemplate/FormTemplate'
import FormDetail from 'components/FormDetail/FormDetail'
import FieldDetail from 'components/FieldDetail/FieldDetail'

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
import Place from "@material-ui/icons/Place";
import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/sevenaforms",
    name: "7(a)ware Forms",
    icon: "content_paste",
    component: SevenAForms,
    layout: "/admin"
  },
  {
    collapse: true,
    name: "7(a) Screens",
    icon: GridOn,
    invisible: true,
    views: [
      {
        path: "/formdetail",
        name: "Form Detail",
        component: FormDetail,
        layout: "/admin"
      },
      {
        path: "/fielddetail",
        name: "Field Detail",
        component: FieldDetail,
        layout: "/admin"
      },
      {
        path: "/formtemplate",
        name: "Form Tempalte",
        component: FormTemplate,
        layout: "/admin"
      },
      {
        path: "/user-page",
        name: "User Profile",
        component: UserProfile,
        layout: "/admin"
      },
    ]
  },  
];
export default dashRoutes;
