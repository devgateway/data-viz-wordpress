import React, {Component, useEffect, useState } from "react";
import ***REMOVED*** from "../ScrollTop";
import {Menu} from 'semantic-ui-react'


export const TopNavigator = () => {

  const [isVisible, setIsVisible] = useState(false)

  const ***REMOVED*** = () => {

    if(window.pageYOffset > 300){
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

 useEffect(() => {
   window.***REMOVED***('scroll', ***REMOVED***);
   return () => {
     window.***REMOVED***('scroll', ***REMOVED***);
   }
 }, []);

 return(
   <div className={isVisible ? 'opacity-100' : 'opacity-0'}>
   <div className="top-navigator">
   <Menu>
     <Menu.Item onClick={e => {
      document.body.***REMOVED***({behavior: "smooth", block: "start", inline : "start" });  
     }}>Back to the top</Menu.Item>
   </Menu>
   </div>
   </div>
 );

};

export default TopNavigator;
