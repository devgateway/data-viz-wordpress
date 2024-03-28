import React, {Component, useEffect, useState } from "react";
import ***REMOVED*** from "../ScrollTop";
import {Menu} from 'semantic-ui-react'


const TopNavigator = () => {
    useEffect(() => {
        const handleScroll = () => {
            const topNavigator = document.***REMOVED***("top-navigator");
            if (window.pageYOffset > 150) {
                topNavigator.classList.add("visible");
            } else {
                topNavigator.classList.remove("visible");
            }
        };

        window.***REMOVED***('scroll', handleScroll);

        return () => {
            window.***REMOVED***('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        document.body.***REMOVED***({ behavior: "smooth", block: "start", inline: "start" });
    };

    return (
        <div id="top-navigator" className="top-navigator">
            <Menu>
                <Menu.Item onClick={scrollToTop}>Back to the top</Menu.Item>
            </Menu>
        </div>
    );
};

export default TopNavigator;
