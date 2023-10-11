import React,{lazy,Suspense,useState} from "react";
import { BrowserRouter,Route,Switch } from "react-router-dom";
import MarketingApp from "./components/MarketingApp";
import Header from "./components/Header";
import { StylesProvider,createGenerateClassName } from "@material-ui/core/styles";
import Progress from "./components/Progress";

const MarketingLazy = lazy(() => import('./components/MarketingApp')) ;
const AuthLazy = lazy( () => import('./components/AuthApp')) ;
const DashboardLazy = lazy(() => import('./components/DashboardApp'));
const generateClassName = createGenerateClassName({
    productionPrefix: 'co'
});
export default ()=> {

    const [isSignedIn,setIsSignedIn] = useState(false);

    return <BrowserRouter>
    <StylesProvider generateClassName={generateClassName}>
    <div>
            <Header onSignOut={ ()=> setIsSignedIn(false)} isSignedIn={isSignedIn}/>
            <Suspense fallback={<div><Progress/></div>}>
                <Switch>
                    <Route path="/auth">
                        <AuthLazy onSignIn={ ()=>{
                            setIsSignedIn(true);

                        }} />
                    </Route>
                    <Route path="/dashboard" component={DashboardLazy}></Route>
                    <Route path="/" component={MarketingLazy}></Route>
                </Switch>
            </Suspense>
           
            
            <MarketingApp/>
        </div>
        </StylesProvider>
        </BrowserRouter>
};