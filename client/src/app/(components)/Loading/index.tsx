import React from 'react';
import './../Loading/loading.scss';

type Props = {
    isLoading:boolean
}

const Loading = ({isLoading}: Props) => {
    
  if(!isLoading) return null;

  return (
    <div className="holder">
    <div className="preloader">
        <div></div><div></div><div></div>
        <div></div><div></div><div></div>
        <div></div>
        <div></div><div></div><div>
        </div></div>
    
    <div className="load-title">Loading...</div>
  </div>
  
  )
}

export default Loading