import React from 'react';
import {Firebase} from "./utils/firebase";

export default class App extends React.Component<{}>{



    render() {
        const fb = new Firebase()
        fb.login('yasirusellahewa@gmail.com', '121212')
        return (
            <div className="container">
sdfsd
            </div>
        );
    }

}

