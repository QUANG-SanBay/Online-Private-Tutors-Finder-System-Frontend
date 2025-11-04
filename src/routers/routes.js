import {
    Home, EBooks, Profile,
    RegisterTutor, RegisterLearner
} from '~/pages'

import LoginPage from '~/pages/account/login/Login';
import ForgotPassword from '~/pages/account/login/ForgotPassword'; 
import OTP from '~/pages/account/login/OTP';
import NewPassword from '~/pages/account/login/NewPassword';

//Leaner pages
import TutorList from '~/pages/learner/TutorList/TutorList';
import TutorDetail from '~/pages/learner/TutorDetail/TutorDetail';
import Schedule from '~/pages/learner/schedule/Schedule';

import ContactPage from '~/pages/learner/contact/Contact';
//tutor pages
import TutorHome from '~/pages/tutor/home/TutorHome';
import TutorSchedule from '~/pages/tutor/schedule/TutorSchedule';
import ParentRequest from '~/pages/tutor/parentRequest/ParentRequest';

const publicRouter = [
    {path: '/Login', element: <LoginPage/>},
    {path: '/ForgotPassword', element: <ForgotPassword/>},
    {path: '/OTP', element: <OTP/>},
    {path: '/NewPassword', element: <NewPassword/>},
    {path: '/register/tutor', element: <RegisterTutor/>},
    {path: '/register/learner', element: <RegisterLearner/>}
]

const learnerRouter = [
    {path: '/', element: <Home/>},
    {path: '/EBooks', element: <EBooks/>},
    {path: '/Profile', element: <Profile/>},
    {path: '/Tutor', element: <TutorList/>},
    {path: '/Tutor/:tutorId', element: <TutorDetail/>},
    {path: '/Schedule', element: <Schedule/>},

    {path: '/Contact', element: <ContactPage/>}
]

const tutorRouter = [
    {path: '/tutor/home', element: <TutorHome/>},
    {path: '/tutor/schedule', element: <TutorSchedule/>},
    {path: '/tutor/parent-requests', element: <ParentRequest/>}
];

export {learnerRouter, publicRouter, tutorRouter };