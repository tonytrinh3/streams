import React from 'react';
//les 258 change BrowserRouter to Router
import { Router, Route, Switch} from "react-router-dom";
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from "../history";

const App = () => {
    return (
        <div className = "ui container">
        {/* les 258 passing history through the BrowserRouter will use history instead of default */}
            <Router history = {history}>
                <div>
                    <Header/> 
                    {/* les 285 - switch allows exact component */}
                    <Switch>
                        <Route path="/" exact component = {StreamList}/>
                        <Route path="/streams/new" exact component = {StreamCreate}/>
                        {/* les 262 add id for each individual id of streams to edit - show stream edit regardless of are id number */}
                        <Route path="/streams/edit/:id" exact component = {StreamEdit}/>
                        {/* les 280 */}
                        <Route path="/streams/delete/:id" exact component = {StreamDelete}/>
                        {/* les284 */}
                        <Route path="/streams/:id" exact component = {StreamShow}/>
                    </Switch>
                </div>
            </Router>
        </div>
    )
};

export default App;