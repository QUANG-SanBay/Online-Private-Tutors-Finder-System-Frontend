import { Route, Routes } from 'react-router-dom'
import { learnerRouter, publicRouter } from './routes'


function AppRouter() {
    return (
        //public router
        <Routes>
            {publicRouter.map((item, index) => (
                <Route key={index} path={item.path} element={item.element}></Route>
            ))}
        {/* learner chỉ được vào */}
            {learnerRouter.map((item, index) => (
                <Route key={index} path={item.path} element={item.element}></Route>
            ))}
        </Routes>
    )
}
export default AppRouter;