import * as React from 'react';
import EditViewSection from "./components/EditViewSection/EditViewSection";
import CreateViewSection from "./components/CreateViewSection/CreateViewSection";
import CombinedMonthlyAndDepartmentComponents
    from "./components/CombinedMonthlyAndDepartmentalComponents/CombinedMonthlyAndDepartmentalComponents";
import LoginPage from "./components/LoginPage/LoginPage";
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/'} exact={true} component={CombinedMonthlyAndDepartmentComponents}/>
                <Route path={'/login'} exact={true} component={LoginPage}/>
                <Route path={'/edit'} exact={true} component={EditViewSection}/>
                <Route path={'/create'} exact={true} component={CreateViewSection} />
            </Switch>
        </BrowserRouter>
    )
}