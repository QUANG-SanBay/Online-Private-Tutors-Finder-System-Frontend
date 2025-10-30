import {
    Home, EBooks, Profile,
    Search, RegisterTutor, RegisterLearner
} from '~/pages'

import LoginPage from '../pages/account/login/Login';
import ForgotPassword from '../pages/account/login/ForgotPassword'; 
import OTP from '../pages/account/login/OTP';
import NewPassword from '../pages/account/login/NewPassword';


import TutorList from '../pages/learner/TutorList/TutorList';
import TutorDetail from '../pages/learner/TutorDetail/TutorDetail';


import ContactPage from '~/pages/learner/contact/Contact';

const publicRouter = [
    {path: '/Login', element: <LoginPage/>},
    {path: '/ForgotPassword', element: <ForgotPassword/>},
    {path: '/OTP', element: <OTP/>},
    {path: '/NewPassword', element: <NewPassword/>},
    {path: '/RegisterTutor', element: <RegisterTutor/>},
    {path: '/RegisterLearner', element: <RegisterLearner/>}
]

const learnerRouter = [
    {path: '/', element: <Home/>},
    {path: '/Search', element: <Search/>},
    {path: '/EBooks', element: <EBooks/>},
    {path: '/Profile', element: <Profile/>},
    {path: '/Tutor', element: <TutorList/>},
    {path: '/Tutor/:tutorId', element: <TutorDetail/>},

    {path: '/Contact', element: <ContactPage/>}
]

export {learnerRouter, publicRouter };