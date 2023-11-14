import './App.css';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/home/Home';
import Shop from './pages/shop/Shop';
import Featured from './pages/featured/Featured';
import Recommended from './pages/recommended/Recommended';
import Signup from './pages/signup/Signup';
import Signin from './pages/signin/Signin';
import ForgetPassword from './pages/forget-passoword/ForgetPassword';
import ProductItem from './pages/product-item/ProductItem';
import CheckoutOrder from './pages/checkout/CheckoutOrder';
import CheckoutShipping from './pages/checkout/CheckoutShipping';
import CheckoutPayment from './pages/checkout/CheckoutPayment';
import UserAccount from './pages/user-account/UserAccount';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';
import EditProfile from './pages/user-account/EditProfile'
import { Toaster } from 'react-hot-toast';



function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="shop" element={<Shop />} />
                        <Route path="product/:id" element={<ProductItem />} />
                        <Route path="featured" element={<Featured />} />
                        <Route path="recommended" element={<Recommended />} />
                        <Route path="signup" element={<OpenRoutes><Signup /></OpenRoutes>} />
                        <Route path="signin" element={<OpenRoutes><Signin /></OpenRoutes>} />
                        <Route path="forget-password" element={<ForgetPassword />} />
                        <Route path="checkout/step1" element={<PrivateRoutes><CheckoutOrder /></PrivateRoutes>} />
                        <Route path="checkout/step2" element={<PrivateRoutes><CheckoutShipping /></PrivateRoutes>} />
                        <Route path="checkout/step3" element={<PrivateRoutes><CheckoutPayment /></PrivateRoutes>} />
                        <Route path="account/:panel" element={<PrivateRoutes><UserAccount /></PrivateRoutes>} />
                        <Route path="account/edit" element={<PrivateRoutes><EditProfile /></PrivateRoutes>} />

                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </>
    )
}

export default App;

