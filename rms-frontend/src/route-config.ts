import ApplicantProfile from "./applicant/ApplicantProfile";
import EditApplicantProfile from "./applicant/EditApplicantProfile";
import AddNewUser from "./auth/AddNewUser";
import LoginOrRegister from "./auth/LoginOrRegister";
import RegisterCompany from "./auth/RegisterCompany";
import Users from "./auth/Users";
import CompanyProfile from "./company/CompanyProfile";
import Dashboard from "./company/Dashboard";
import EditCompanyProfile from "./company/EditCompanyProfile";
import HomePage from "./HomePage";
import JobDetails from "./job/JobDetails";
import NewJob from "./job/NewJob";
import SearchJobs from "./job/SearchJobs";
import LandingPage from "./LandingPage";
import History from "./applicant/History";
import Archive from "./company/Archive";

const routes = [
    { path: '/login-or-register', element: LoginOrRegister },
    { path: '/register-company', element: RegisterCompany },

    { path: '/users', element: Users },
    { path: '/users/add-new-user', element: AddNewUser },

    { path: '/company-profile/:id', element: CompanyProfile },
    { path: '/company-profile/edit/:id', element: EditCompanyProfile },

    { path: '/user-profile/:id', element: ApplicantProfile },
    { path: '/user-profile/edit/:id', element: EditApplicantProfile },

    { path: '/create-new-job', element: NewJob },
    { path: '/job-details/:id', element: JobDetails },

    { path: '/dashboard', element: Dashboard },
    { path: '/archive', element: Archive },
    
    { path: '/home', element: HomePage },
    { path: '/search', element: SearchJobs },
    { path: '/history', element: History },

    { path: '/', element: LandingPage }
];

export default routes;