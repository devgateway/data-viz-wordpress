import React, { useEffect } from "react";
import {Menu} from 'semantic-ui-react'


const TopNavigator = () => {
    const [show, setShow] = React.useState(false);

    useEffect(() => {
       
        const handleScroll = () => {
            // const topNavigator = document.***REMOVED***("top-navigator");
            if (window.pageYOffset > 150) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.***REMOVED***('scroll', handleScroll);

        return () => {
            window.***REMOVED***('scroll', handleScroll);
        };
    }, [window.scroll]);

    const scrollToTop = () => {
        document.body.***REMOVED***({ behavior: "smooth", block: "start", inline: "start" });
    };

    return (
        <>
        {show && <div id="top-navigator" className="top-navigator">
            <Menu>
                <Menu.Item onClick={scrollToTop}>Back to the top</Menu.Item>
            </Menu>
        </div>}
        </>
        
    );
};

export default TopNavigator;
