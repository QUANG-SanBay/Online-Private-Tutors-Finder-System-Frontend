import { Route, Routes } from 'react-router-dom'
import { learnerRouter, publicRouter, tutorRouter } from './routes'
import { DefaultLayout } from '~/components/layouts/';
import TutorLayout from '~/components/layouts/tutorLayout/TutorLayout';

function AppRouter() {
    let userType; // 'learner', 'tutor', 'admin', or null for public
    if(!userType){
        userType = false;
    }else if(userType === 'learner'){
        userType = 'learner';
    }else if(userType === 'tutor'){
        userType = 'tutor';
    }else{
        userType = 'admin';
    }

    return (
        //public router
        <Routes>
            {publicRouter.map((item, index) => (
                <Route key={index} path={item.path} element={
                    <DefaultLayout userType={userType}>
                        {item.element}
                    </DefaultLayout>
                }></Route>
            ))}
            {/* learner chỉ được vào */}
            {learnerRouter.map((item, index) => (
                <Route key={index} path={item.path} element={
                    <DefaultLayout userType={userType}>
                        {item.element}
                    </DefaultLayout>
                }></Route>
            ))}
            {/* tutor chỉ được vào */}
            {tutorRouter.map((item, index) => (
                <Route key={index} path={item.path} element={
                    <TutorLayout >
                        {item.element}
                    </TutorLayout>
                }></Route>
            ))}
        </Routes>
    )
}
export default AppRouter;