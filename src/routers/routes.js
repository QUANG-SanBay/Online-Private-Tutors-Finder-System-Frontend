import {
    Login, Register,
    Home, EBooks, Profile, Search

} from '~/pages'


const publicRouter = [
    {path: '/Login', element: <Login/>},
    {path: '/Register', element: <Register/>}
]

const learnerRouter = [
    {path: '/', element: <Home/>},
    {path: '/EBooks', element: <EBooks/>},
    {path: '/Profile', element: <Profile/>},
    {path: '/Search', element: <Search/>}
]

export {learnerRouter, publicRouter };