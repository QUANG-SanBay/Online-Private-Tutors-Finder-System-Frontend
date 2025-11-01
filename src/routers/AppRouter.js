import { Route, Routes } from 'react-router-dom'
import { learnerRouter, publicRouter, tutorRouter } from './routes'
import  {DefaultLayout}  from '~/components/layouts/';
import TutorLayout from '~/components/layouts/tutorLayout/TutorLayout';

function AppRouter() {
    return (
        //public router
        <Routes>
            {publicRouter.map((item, index) => (
                <Route key={index} path={item.path} element={item.element}></Route>
            ))}
        {/* learner chỉ được vào */}
            {learnerRouter.map((item, index) => (
                <Route key={index} path={item.path} element={
                    <DefaultLayout>
                        {item.element}
                    </DefaultLayout>
                }></Route>
            ))}
            {/* tutor chỉ được vào */}
            {tutorRouter.map((item, index) => (
                <Route key={index} path={item.path} element={
                    <TutorLayout>
                        {item.element}
                    </TutorLayout>
                }></Route>
            ))}
        </Routes>
    )
}
export default AppRouter;