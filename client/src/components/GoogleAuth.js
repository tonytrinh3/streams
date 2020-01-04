import React from 'react';

class GoogleAuth extends React.Component{
    state = { isSignedIn: null};

    componentDidMount(){
        //async request or something - calling to google server to load for stuff
        //google server is called through <script src = "https://apis.google.com/js/api.js"></script> in index.html
        //gapi variable only avaiable on window scope
        //scope is what we want access

        window.gapi.load('client:auth2', () => {
            //promise
            window.gapi.client.init({
                clientId: '638380569491-l2d28ekum7fp1nh1lspj4eg6vrupp4rh.apps.googleusercontent.com',
                scope: "email"
            }).then(() =>{
                //getAuthInstance() retrieves mutliple methods from google server 
                //by assigning to this.auth - it is available throughout the class GoogleAuth
                // so you don't have call it like a variable.
                //it is variable similar to this.auth = auth in a constructor
                //and ComponentDidMount() is like constructor()
                this.auth = window.gapi.auth2.getAuthInstance();
                //true or false 
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                //the listen - pass call back function to change the state to refresh the page
                //this updates the text of the google button every time someone signs in and out 
                this.auth.isSignedIn.listen(this.onAuthChange);
            }

            )
        });
    };
    //ability to state auth on the fly - whhy do you care?
    onAuthChange = () =>{
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };


    onSignIn = () =>{
        //how the fuck is this.auth now a global variable
        this.auth.signIn();
    };

    onSignOut = () =>{
        this.auth.signOut();
    };

    renderAuthButton(){
        if (this.state.isSignedIn === null){
            return null;
        } else if (this.state.isSignedIn){
            return (
                <button onClick = {this.onSignOut} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick = {this.onSignIn} className="ui red google button">
                    <i className="google icon"/>
                    Sign In With Google
                </button>
            )
        }
    };





    render(){
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
};

export default GoogleAuth;