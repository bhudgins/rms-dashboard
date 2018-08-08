import * as React from 'react';
import {List} from "semantic-ui-react";
import {Link} from "react-router-dom";

interface MenuItem {
    link: string;
    name: string;
    description: string;
    accessLevels: string[];
}

const menuItems: MenuItem[] = [
    {
        link: '/',
        name: 'RMS Metrics',
        description: 'Rolling 12 Month View and Requests by Department',
        accessLevels: ['ROLE_USER']
    },
    {
        link: '/edit',
        name: 'Edit',
        description: 'Edit existing data',
        accessLevels: ['ROLE_ADMIN']
    },
    {
        link: '/create',
        name: 'Create',
        description: 'Input data that drives the visualizations for RMS Dashboard',
        accessLevels: ['ROLE_ADMIN']
    },
    {
        link: '/login',
        name: 'Login',
        description: 'Login to RMS Dashboard',
        accessLevels: []
    },
    {
        link: '/logout',
        name: 'Logout',
        description: 'Logout of RMS Dashboard',
        accessLevels: []
    }
];


export const getMenuItems = () => {
    return menuItems.map( (item: MenuItem, index: number) => (
        <List.Item key={index}>
            <List.Content>
                <List.Header><Link to={item.link} >{item.name}</Link></List.Header>
                <List.Description as={"p"}>{item.description}</List.Description>
            </List.Content>
        </List.Item>
    ));
};