import React from 'react';
import PdfViewerExport from './PdfViewer'
import ExamplePdfViewerExport from './ExamplePdfViewer'

export function PdfViewer(props: any) {

  return <PdfViewerExport {...props}/>; 
  
}
export function ExamplePdfViewer(props: any) {

  return <ExamplePdfViewerExport {...props}/>; 
  
}