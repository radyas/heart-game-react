import React from "react";
import {Navigation} from "react-minimal-side-navigation";
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

export class SidebarComponent extends React.Component<any, any>{
    history
    menu_items: any

    constructor(props: any) {
        super(props);
        this.history = props.history
        this.menu_items = [
            {
                title: 'Home',
                itemId: '/',
            },
            {
                title: 'Statistics',
                itemId: '/statistics',
            },
        ]
        if(props.user?.role === 'admin'){
            this.menu_items.push(
                {
                    title: 'Users',
                    itemId: '/users',
                    subNav: [
                        {
                            title: 'Add User',
                            itemId: '/users/add',
                        },
                        {
                            title: 'View Users',
                            itemId: '/users',
                        },
                    ],
                },
                {
                    title: 'Levels',
                    itemId: '/levels',
                    subNav: [
                        {
                            title: 'Add Level',
                            itemId: '/levels/add',
                        },
                        {
                            title: 'View Levels',
                            itemId: '/levels',
                        },
                    ],
                },
            )
        }
        else {
            this.menu_items.push(
                {
                    title: 'Levels',
                    itemId: '/levels',
                },
            )
        }
    }


    render() {
        return (
            <>
                <div className="col-md-3 col-lg-2 d-md-block border-end sidebar collapse vh-100 position-fixed pt-3">
                    <Navigation
                        activeItemId="/"
                        onSelect={({itemId}) => {
                            this.history.push(itemId)
                        }}
                        items={this.menu_items}
                    />
                </div>

            </>
        )
    }
}