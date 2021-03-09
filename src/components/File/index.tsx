import React from 'react';
import FileExport from './File';
import FileListExport from './FileList';
import FileFormExport from './FileForm';
import FileTableExport from './FileTable';
import FileSearchExport from './FileSearch';



export function FileUrl(props: any) {

  return <FileExport {...props}/>; 
  
}
export function FileSearch(props: any) {

  return <FileSearchExport {...props}/>; 
  
}
export function FileTable(props: any) {

  return <FileTableExport {...props}/>; 
  
}
export function FileList(props: any) {

  return <FileListExport {...props}/>; 
  
}
export function FileForm(props: any) {

  return <FileFormExport {...props}/>; 
}

