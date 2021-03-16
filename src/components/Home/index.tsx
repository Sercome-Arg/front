import React from 'react';
import HomeExport from './Home'
import AgendaGralExport from './AgendaGral'


export function Home(props: any) {

  return <HomeExport {...props}/>;
  
}
export function AgendaGral(props: any) {

  return <AgendaGralExport {...props}/>;
  
}
