import React from 'react';
import LinkExport from './Link';
import LinkListExport from './LinkList';
import LinkFormExport from './LinkForm';
import LinkTableExport from './LinkTable';
import LinkSearchExport from './LinkSearch';
import LinkViewExport from './LinkView';

export function LinkUrl(props: any) {

  return <LinkExport {...props}/>; 
  
}
export function LinkSearch(props: any) {

  return <LinkSearchExport {...props}/>; 
  
}
export function LinkTable(props: any) {

  return <LinkTableExport {...props}/>; 
  
}
export function LinkList(props: any) {

  return <LinkListExport {...props}/>; 
  
}
export function LinkForm(props: any) {

  return <LinkFormExport {...props}/>; 
}
export function LinkView(props: any) {

  return <LinkViewExport {...props}/>; 
}