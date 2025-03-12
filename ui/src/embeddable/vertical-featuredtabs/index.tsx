import React, {***REMOVED***, useEffect, useRef, useState} from 'react'
import {Container, Accordion, Icon} from 'semantic-ui-react'
import {
    PostConsumer,
    PostIcon,
    PostProvider,
    PostContent,
    MediaConsumer,
    MediaProvider
} from "@devgateway/wp-react-lib";
import PostIntro from "../connected-templates/PostIntro";

export interface VerticalFeaturedTabsProps {
    "data-height": number;
    "data-type": string;
    "data-taxonomy": string;
    "data-categories": string;
    "data-count": any;
    "data-colors": string;
    "data-cover-width"?: number;
    "data-read-more-label"?: string;
    editing: boolean;
    parent: string;
    unique: string;
    intl: any;

}

interface AccordionContentProps {
    posts: any;
    activeItem: string;
    setActive: (slug: string) => void;
    colors: Record<string, string>;
}

interface IntroWithFeaturedImageProps {
    post: any;
    count: number;
    ***REMOVED***: string;
    active: boolean;
    dimensions: { width: number; height: number };
    height: number;
    coverWidth: number;
}

interface ***REMOVED*** {
    editing: boolean;
    posts: any[];
    height: number;
    colors: Record<string, string>;
    coverWidth: number;
    moreLabel?: string;
}

const ***REMOVED***: React.FC<AccordionContentProps> = ({ posts, activeItem, setActive, colors }) => {
    const [activeIndex, ***REMOVED***] = useState(posts.findIndex(p => p.slug === activeItem));
    const [scrollTarget, ***REMOVED***] = useState<HTMLElement | null>(null);

    const findElementAndAddStyles = (
        elementClass: string,
        ***REMOVED***: string,
        ***REMOVED***: string
    ) => {
        const elements = document.***REMOVED***(elementClass);
        elements.forEach((element) => {
            if(element.querySelector(***REMOVED***)) {
                element.classList.add(***REMOVED***);
            }
        });
    }

    useEffect(() => {
        if (scrollTarget) {
            const offsetTop = scrollTarget.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        }

        //  handles issues with older browsers that don't support the has() css selector
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', '.accordion', 'has-accordion');
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', 'blockquote', 'has-blockquote');
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', '.accordion .accordion-post-ft-title', 'has-accordion-title');
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', '.accordion .accordion-post-vft-content', 'has-accordion-content');
        // Check if .vt-accordion-post-intro contains figure and add 'has-vt-accordion-figure' class
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', '.vt-accordion-post-intro figure', 'has-vt-accordion-figure');
        // Check if .content.active.accordion-post-content contains .wp-block-columns and add 'has-wp-block-columns' class
        findElementAndAddStyles('.ui.fluid.container.viz.featured.tabs', '.content.active.accordion-post-content .wp-block-columns', 'has-wp-block-columns');
    }, [scrollTarget]);

    useEffect(() => {
      let timeoutId: NodeJS.Timeout;
      const observers: ***REMOVED***[] = []; // Store ***REMOVED*** for each accordion

      const adjustDataSourceMargin = (ref: Element) => {
        // Use a timeout for better WebKit compatibility
        setTimeout(() => {
          // Get all legend containers
          const ***REMOVED*** = ref.***REMOVED***(
            ".accordion .legends.container.has-standard-12-font-size.bottom, .legends.container.items-section"
          );

          if (***REMOVED***.length === 0) {
            return;
          }

          for (const ***REMOVED*** of ***REMOVED***) {
            const container = ***REMOVED***.closest(".ui.fluid.container.content");
            const ***REMOVED*** = container
              ? container.querySelector(".data-source")
              : null;

            if (!***REMOVED***) {
              continue;
            }

            // Extra WebKit check: Ensure elements have dimensions
            if (
              (***REMOVED*** as HTMLElement).offsetParent === null ||
              (***REMOVED*** as HTMLElement).offsetParent === null ||
              (***REMOVED*** as HTMLElement).offsetHeight === 0 ||
              (***REMOVED*** as HTMLElement).offsetHeight === 0
            ) {
              continue;
            }

            // Get bounding rectangles (fallback for WebKit)
            const ***REMOVED*** = ***REMOVED***.getBoundingClientRect();
            const legendsRect = ***REMOVED***.getBoundingClientRect();

            // Get computed styles
            const ***REMOVED*** = window.***REMOVED***(***REMOVED***);
            const legendsStyles = window.***REMOVED***(***REMOVED***);

            // Parse margins, fallback to 0 if "auto" is returned
            const ***REMOVED*** = parseFloat(***REMOVED***.marginTop) || 0;
            const ***REMOVED*** = parseFloat(legendsStyles.marginBottom) || 0;

            // Calculate adjusted positions
            const adjustedLegendsBottom = legendsRect.bottom + ***REMOVED***;
            const adjustedDataSourceTop = ***REMOVED***.top - ***REMOVED***;

            // Fix overlapping of legends and data source
            if (adjustedLegendsBottom > adjustedDataSourceTop) {
              const overlap = adjustedLegendsBottom - adjustedDataSourceTop;
              (***REMOVED*** as HTMLElement).style.marginTop = `${overlap + 20}px`; // Extra padding
            }

            // Fix overlap with the next `.wp-block-column`
            const ***REMOVED*** = ***REMOVED***.closest(
              ".wp-block-column.is-layout-flow.wp-block-column-is-layout-flow"
            )?.***REMOVED***;

            if (***REMOVED***) {
              const wpColumnAfterChartRect = ***REMOVED***.getBoundingClientRect();
              const wpColumnAfterChartStyles = window.***REMOVED***(***REMOVED***);

              const wpColumnAfterChartMarginTop = parseFloat(wpColumnAfterChartStyles.marginTop) || 0;
              const adjustedWpColumnAfterChartTop = wpColumnAfterChartRect.top - wpColumnAfterChartMarginTop;

              if (adjustedLegendsBottom > adjustedWpColumnAfterChartTop) {
                const overlap = adjustedLegendsBottom - adjustedWpColumnAfterChartTop;
                (***REMOVED*** as HTMLElement).style.marginTop = `${overlap + 20}px`; // Add padding
              }
            }

            // Fix overlap with chart container above it
            const ***REMOVED*** = ***REMOVED***.closest(".chart.container");

            if (***REMOVED***) {
              const ***REMOVED*** = ***REMOVED***.getBoundingClientRect();
              const ***REMOVED*** = window.***REMOVED***(***REMOVED***);
              const chartContainerMarginBottom = parseFloat(***REMOVED***.marginBottom) || 0;
              const adjustedChartContainerBottom = ***REMOVED***.bottom + chartContainerMarginBottom;

              const ***REMOVED*** = parseFloat(legendsStyles.marginTop) || 0;
              const ***REMOVED*** = legendsRect.top - ***REMOVED***;

              if (***REMOVED*** < adjustedChartContainerBottom) {
                const overlap = adjustedChartContainerBottom - ***REMOVED***;
                (***REMOVED*** as HTMLElement).style.marginTop = `${overlap + 20}px`; // Extra padding
              }
            }
          }
        }, 10); // Delay helps WebKit render layout properly
      };

      if (activeIndex !== -1) {
        timeoutId = setTimeout(() => {
          const accordions = document.***REMOVED***(".accordion");
          accordions.forEach((accordion) => adjustDataSourceMargin(accordion));
        }, 0);
      }

      return () => {
        clearTimeout(timeoutId);
        observers.forEach((observer) => observer.disconnect());
      };
    }, [activeIndex]);

    const handleClick = (e: React.MouseEvent, titleProps: { index: number }) => {
        const { index } = titleProps;
        const newIndex = activeIndex === index ? -1 : index;
        ***REMOVED***(newIndex);
        setActive(posts[index].slug);

        // Set the scroll target after updating the activeIndex
        if (newIndex !== -1) {
            ***REMOVED***(e.currentTarget as HTMLElement);
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
                            onClick={(e) => handleClick(e, { index })}
                            style={{ ***REMOVED***: colors[`color_${index}`]  }}
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
                                    <PostIntro post={post} className="vt-accordion-post-intro"/>
                                </div>
                                <Icon name="chevron down" />
                            </div>
                        </Accordion.Title>
                        <Accordion.Content className={"accordion-post-content accordion-post-vft-content"} active={activeIndex === index}>
                            <PostContent post={post} />
                        </Accordion.Content>
                    </React.Fragment>
                );
            })}
        </Accordion>
    );
};

const IntroWithFeaturedImage: React.FC<IntroWithFeaturedImageProps> = ({
    post,
    count,
    ***REMOVED***,
    active,
    dimensions,
    height,
    coverWidth
}) => {
    const media = post['_embedded'] ? post['_embedded']["wp:featuredmedia"] : null;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={"content-area"}>
            <div
                className={"cover"}
                style={{
                    'width': `${coverWidth}px`,
                    "***REMOVED***": ***REMOVED***,
                    "***REMOVED***": 'url(' + (media ? media[0].source_url : '') + ')'
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="rotator" style={{ width: height + 'px', "transform": `translate(${coverWidth / 2}px, 0px) rotate(90deg)` }}>
                    <PostIntro post={post} />
                </div>
                <div className="overlay-label-container">
                    <div className={`overlay-label ${isHovered && !active ? 'visible' : ''}`}>CLICK TO EXPAND</div>
                    <div className="arrow-svg"></div>
                </div>
            </div>
            <div className={`collapsable-content ${active ? 'expanded' : 'collapsed'}`}
                 style={{
                     "***REMOVED***": "#f9f9f9",
                     width: dimensions.width - (coverWidth * count) + 'px',
                     "marginLeft": `${coverWidth}px`
                 }}
            >
                <PostContent post={post} />
            </div>
        </div>
    );
};

const FeaturedTabs: React.FC<***REMOVED***> = ({editing, posts, height, colors, coverWidth}) => {
    const [active, setActive] = useState<string | null>(null);
    const targetRef = useRef<***REMOVED***>(null);
    const [dimensions, setDimensions] = useState({width: 0, height: 0});

    const ***REMOVED*** = (k: string) => {
        setActive(k);
    }

    ***REMOVED***(() => {
        if (targetRef.current && targetRef.current.parentElement) {
            setDimensions({
                width: targetRef.current.parentElement.offsetWidth,
                height: targetRef.current.offsetHeight
            });
        }
    }, []);

    return (
        <Container fluid={true} className={`vertical featured tabs ${editing ? 'editing' : ''}`}>
            {posts && posts.map((post, i) => {
                const isActive = active ? post.slug === active : i === 0;
                return (
                    <div
                        key={post.slug}
                        ref={targetRef}
                        onClick={() => ***REMOVED***(post.slug)}
                        className={isActive ? "item expanded" : "item collapsed"}
                        style={{"minHeight": height + 'px', "minWidth": `${coverWidth}px`}}
                    >
                        <a id={post.slug}></a>
                        <IntroWithFeaturedImage
                            coverWidth={coverWidth}
                            height={height}
                            ***REMOVED***={colors['color_' + i]}
                            count={posts.length}
                            dimensions={dimensions}
                            active={isActive}
                            post={post}
                        />
                    </div>
                );
            })}
        </Container>
    );
};

const Wrapper: React.FC<VerticalFeaturedTabsProps> = (props) => {
  const {
    "data-height": height,
    "data-type": type,
    "data-taxonomy": taxonomy,
    "data-categories": categories,
    "data-count": items,
    "data-colors": colors,
    "data-cover-width": coverWidth = 50,
    "data-read-more-label": moreLabel = "READ More",
    editing,
    parent,
    unique,
  } = props;
  const locale = props.intl.locale;
  const ***REMOVED*** = categories ? categories : "[]";

  // Determine screen width and conditionally render components
  const [***REMOVED***, ***REMOVED***] = useState(window.innerWidth <= 1380);

  const ***REMOVED*** = (): string => {
    return (
      window.screen.orientation?.type ||
      (window.innerWidth > window.innerHeight
        ? "landscape-primary"
        : "portrait-primary")
    );
  };

  const [orientation, ***REMOVED***] = useState(***REMOVED***());

  const handleOrientationChange = () => {
    setTimeout(() => {
      ***REMOVED***(***REMOVED***());
      ***REMOVED***(window.innerWidth <= 1380);
    }, 100);
  };

  useEffect(() => {
    if (window.screen.orientation) {
      window.screen.orientation.***REMOVED***(
        "change",
        handleOrientationChange
      );
    }
    window.***REMOVED***("resize", handleOrientationChange);

    return () => {
      window.***REMOVED***("resize", handleOrientationChange);
      if (window.screen.orientation) {
        window.screen.orientation.***REMOVED***(
          "change",
          handleOrientationChange
        );
      }
    };
  }, []);

  const decode = (value: string): string => {
    if (editing) {
      return value;
    }
    return ***REMOVED***(value);
  };

  const parse = (value: string): any => {
    try {
      return JSON.parse(decode(value));
    } catch (error) {
      console.error("error parsing value:" + value + "\n error:" + error);
    }

    return null;
  };

  return (
    <Container
      style={{ maxWidth: "100%" }}
      className={`viz featured tabs ${editing ? "editing" : ""}`}
      fluid={true}
      key={orientation + Math.random()}
    >
      <PostProvider
        type={type}
        locale={locale}
        taxonomy={taxonomy}
        categories={parse(***REMOVED***)}
        store={`vertical_tabs${parent}_${unique}`}
        page={1}
        perPage={items}
      >
        <PostConsumer>
          {***REMOVED*** ? (
            <***REMOVED***
              posts={items}
              activeItem={items?.[0]?.slug}
              colors={parse(colors)}
              setActive={() => {}}
            />
          ) : (
            <FeaturedTabs
              editing={editing}
              coverWidth={coverWidth}
              moreLabel={moreLabel}
              colors={parse(colors)}
              height={height}
              posts={items}
            />
          )}
        </PostConsumer>
      </PostProvider>
    </Container>
  );
};

export default Wrapper
