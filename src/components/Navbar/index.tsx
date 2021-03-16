import React from 'react';
import NavbarExport from './Navbar'
import WhiteNavbarExport from './WhiteNavbar'

export function Navbar(props: any) {

  return <NavbarExport {...props}/>; 
  
}
export function WhiteNavbar(props: any) {

  return <WhiteNavbarExport {...props}/>; 
  
}