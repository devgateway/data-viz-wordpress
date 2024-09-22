import React, { useEffect, useState } from 'react';
import { Container, Grid, Icon, Label, Segment, Accordion } from 'semantic-ui-react';
import {
    MediaConsumer,
    MediaProvider,
    PostConsumer,
    PostIcon,
    PostProvider,
    PostTitle,
    PostContent
} from "@devgateway/wp-react-lib";
import PostIntro from "../connected-templates/PostIntro";

// Desktop FeaturedPost Component
const FeaturedPost = ({ post, onClick, active, moreLabel }) => {
    const media = post['_embedded'] ? post['_embedded']["wp:featuredmedia"] : null;

    return (
        <div className="cover" style={{ "***REMOVED***": 'url(' + (media ? media[0].source_url : '') + ')' }}>
            <PostIntro post={post} />
            {!active ?
                <Label onClick={onClick}><Icon name='search' size="large" /> {moreLabel}</Label> :
                <Label onClick={onClick}><Icon name='arrow alternate circle left outline' size="large" /> Back </Label>}
        </div>
    );
};

const ***REMOVED*** = ({ post }) => {
    const parser = new DOMParser();
    const doc = parser.***REMOVED***(post.content.rendered, 'text/html');
    const figureElement = doc.querySelector('figure');
    if(!figureElement) {
        return null;
    }
    return (
        <div style={{
            flex: '0 0 40px'
        }}dangerouslySetInnerHTML={{ __html: figureElement.outerHTML }} />
    );
};

// Desktop FeaturedTabs Component
const FeaturedTabs = ({ posts, width, height, color, moreLabel }) => {
    const [active, setActive] = useState(null);
    const [visible, setVisible] = useState(false);
    const [scrollPos, setScrollPos] = useState([]);
    const arrayColors = color.split(',');

    const ***REMOVED*** = (k) => {
        if (!visible) {
            setActive(k);
            setVisible(true);
        } else {
            setVisible(false);
            setActive(k);
        }
    };

    useEffect(() => {
        if (active) {
            setScrollPos([window.scrollX, window.scrollY]);
        }
        if (active == null) {
            window.scrollTo(scrollPos[0], scrollPos[1]);
        }
    }, [active]);

    useEffect(() => {
        window.setTimeout(() => {
            if (window.location.hash) {
                const slug = window.location.hash.substr(1);
                const element = document.***REMOVED***(slug);

                if (element && posts.map(p => p.slug).indexOf(slug) > -1) {
                    setActive(slug);
                    element.***REMOVED***({ behavior: "auto", block: "start" });
                }
            }
        }, 0);
    }, [posts]);

    return (
        <Container fluid={true} className="featured tabs" style={{ minHeight: `${height}px` }}>
            <Grid stackable columns={active != null ? 1 : posts.length} className="desktop">
                {posts && posts.map((post, i) => (
                    <React.Fragment key={post.slug}>
                        <Grid.Column
                            style={active == null ? { display: 'block', visibility: 'visible', "***REMOVED***": arrayColors[i] } : { display: 'none', visibility: 'hidden' }}
                        >
                            <anchor id={post.slug} />
                            <FeaturedPost post={post} moreLabel={moreLabel} onClick={() => ***REMOVED***(post.slug)} />
                        </Grid.Column>

                        <Grid.Column
                            className="expanded"
                            style={active != post.slug ? { display: 'none', visibility: 'hidden' } : { display: 'block', visibility: 'visible' }}
                        >
                            <Segment style={{ "***REMOVED***": arrayColors[i] }}>
                                {post.meta_fields && post.meta_fields.icon &&
                                    <MediaProvider id={post.meta_fields ? post.meta_fields.icon[0] : null}>
                                        <MediaConsumer>
                                            <PostIcon />
                                        </MediaConsumer>
                                    </MediaProvider>
                                }
                                <PostTitle as={"h2"} post={post} className={"has-standard-36-font-size has-white-color"} />
                                <Label className={"closeIcon"} onClick={() => setActive(null)}><Icon name='times circle outline' size="large" /></Label>
                            </Segment>
                            <PostContent as={"div"} fluid={true} post={post} style={{ maxHeight: `calc(${height}px - 150px)` }}
                            />
                            <Label className={"closeIconText"} style={{ ***REMOVED***: `${arrayColors[i]}` }} onClick={() => setActive(null)}><Icon name='times circle outline' size="large" /> Close </Label>
                        </Grid.Column>
                    </React.Fragment>
                ))}
            </Grid>
        </Container>
    );
};

// Mobile ***REMOVED*** Component
const ***REMOVED*** = ({ posts, activeItem, setActive, color }) => {
    const [activeIndex, ***REMOVED***] = useState(posts.findIndex(p => p.slug === activeItem));
    const [scrollTarget, ***REMOVED***] = useState(null);
    const arrayColors = color.split(',');

    useEffect(() => {
        if (scrollTarget) {
            const offsetTop = scrollTarget.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }
    }, [scrollTarget]);

    const handleClick = (e, titleProps) => {
        const { index } = titleProps;
        const newIndex = activeIndex === index ? -1 : index;
        ***REMOVED***(newIndex);
        setActive(posts[index].slug);

        // Set the scroll target after updating the activeIndex
        if (newIndex !== -1) {
            ***REMOVED***(e.currentTarget);
        }
    };

    return (
        <Accordion fluid styled>
            {posts.map((post, index) => {
                const iconUrl = post.meta_fields && post.meta_fields.icon ? post.meta_fields.icon[0] : null;

                return (
                    <React.Fragment key={post.id}>
                        <Accordion.Title
                            active={activeIndex === index}
                            index={index}
                            onClick={handleClick}
                            style={{ ***REMOVED***: arrayColors[index]  }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', ***REMOVED***: 'space-between', width: '100%' }}>

                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {iconUrl && (
                                        <MediaProvider id={iconUrl}>
                                            <MediaConsumer>
                                                <PostIcon className="icon" />
                                            </MediaConsumer>
                                        </MediaProvider>
                                    )}
                                    {!iconUrl && <***REMOVED*** post={post} />}
                                    <PostTitle post={post} className="accordion-post-ft-title"/>
                                </div>
                                <Icon name="chevron down" />
                            </div>
                        </Accordion.Title>
                        <Accordion.Content className={"accordion-post-ft-content"} active={activeIndex === index}>
                            <PostContent post={post} />
                        </Accordion.Content>
                    </React.Fragment>
                );
            })}
        </Accordion>
    );
};

// Wrapper Component for Handling Mobile and Desktop View
const Wrapper = (props) => {
    const {
        "data-width": width,
        "data-height": height,
        "data-type": type,
        "data-taxonomy": taxonomy,
        "data-categories": categories,
        "data-items": items,
        "data-color": color,
        "data-use-scrolls": useScrolls,
        "data-read-more-label": moreLabel = "READ More",
        editing,
        parent,
        unique
    } = props;
    const locale = props.intl.locale;
    const scrollable = useScrolls == 'true'

    // Determine screen width and conditionally render components
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1250);
        };

        window.***REMOVED***("resize", handleResize);
        return () => window.***REMOVED***("resize", handleResize);
    }, []);

    return (
        <Container
            className={`viz featured tabs ${editing ? 'editing' : ''} ${scrollable ? 'scrollable' : ''}`}
            fluid={true}
        >
            <PostProvider
                locale={locale}
                type={type}
                taxonomy={taxonomy}
                categories={categories}
                store={`tabbedposts_${parent}_${unique}`}
                page={1}
                perPage={items}
            >
                <PostConsumer>
                    {isMobile ? (
                        <***REMOVED***
                            posts={items}
                            activeItem={items[0]?.slug}
                            color={color}
                            setActive={() => {}}
                        />
                    ) : (
                        <FeaturedTabs
                            moreLabel={moreLabel}
                            color={color}
                            width={width}
                            height={height}
                        />
                    ) }
                </PostConsumer>
            </PostProvider>
        </Container>
    );
};

export default Wrapper;
