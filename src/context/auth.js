import React from 'react';
import Cookies from 'js-cookie'

const token= Cookies.get('token')? true : false 
const Auth= React.createContext(token);

export {Auth as default}