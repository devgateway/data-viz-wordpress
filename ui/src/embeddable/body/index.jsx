import React from "react";
import { Container } from "semantic-ui-react";

import Background from "./Background";
import Stomach from "./Stomach";
import Liver from "./Liver";
import Bounds from "./Bounds";
import Blood from "./Blood";
import Lungs from "./Lungs";
import Head from "./Head";
import Eyes from "./Eyes";
import Brain from "./Brain";
import Heart from "./Heart";
import Erectile from "./Erectile";
import * as d3 from "d3"; // d3 plugin

import Ectopic from "./Ectopic";
import { injectIntl, ***REMOVED*** } from "react-intl";
import messages_en from "../../translations/en.json";
import messages_fr from "../../translations/fr.json";

import getDeviceType from "../../utils/deviceType";

const Body = ({ intl }) => {
  const [counter, setCounter] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(["mobile", "tablet"].includes(getDeviceType()));
  const [isClicked, setIsClicked] = React.useState(false);
  const [***REMOVED***, ***REMOVED***] = React.useState("Cancers");

  const updateLayout = () => {
    setIsMobile(["mobile", "tablet"].includes(getDeviceType()));
  };

  const ***REMOVED*** = (e) => {
    if (!isMobile) return;

    const svg = e.target.closest("svg");
    const titleText = e.target.closest(".title");
    const btn = e.target.closest(".title-rect");

    if (titleText || btn) {
      // Remove the 'on' class from all .title, .title-rect, and .title-line elements
      [...svg.***REMOVED***(".title, .title-rect, .title-line")].forEach((node) =>
        node.classList.remove("on")
      );

      const ***REMOVED*** = titleText || btn;

      // Add the 'on' class to the clicked title and title-rect
      ***REMOVED***.classList.add("on");

      // Add the 'on' class to the corresponding title-line
      const titleLine = ***REMOVED***.closest("g").querySelector(".title-line");
      if (titleLine) {
        titleLine.classList.add("on");
      }

      // Update the selected option state
      ***REMOVED***(titleText ? titleText.innerHTML : btn.nextSibling.innerHTML);
    }
  };

  const onMouseOut = () => {
    d3.select(".body.parts")
      .selectAll("g.system")
      .transition()
      .duration(0)
      .delay(200)
      .style("opacity", 1);
    d3.select(".body.parts").selectAll("circle").remove();
    d3.select(".body.parts").selectAll("line").remove();
  };

  const onMouseOver = (selector, source, target) => {
    const root = d3.select(".body.parts");

    const element = root.select(selector);
    if (selector) {
      root.selectAll("g.system").transition().duration(200).style("opacity", 0);
      element.transition().style("opacity", 1);
    }
    const bbox = source.node().getBBox();

    let x1, y1, x2, y2;
    if (bbox.x < 0) {
      ///Left side
      x1 = bbox.x + bbox.width + 5;
      x2 = x1 > 0 ? 30 : -5;
      y1 = bbox.y + bbox.height / 2;
      y2 = bbox.y + bbox.height / 2;
    } else {
      x1 = bbox.x - 5;
      x2 = 140;
      y1 = bbox.y + bbox.height / 2;
      y2 = bbox.y + bbox.height / 2;
    }

    root
      .select("svg")
      .append("line")
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x1)
      .attr("y2", y1)
      .transition()
      .duration(100)
      .attr("x2", x2)
      .attr("y2", y2);

    root
      .select("svg")
      .append("line")
      .attr("x1", x2)
      .attr("y1", bbox.y + bbox.height / 2)
      .attr("x2", x2)
      .attr("y2", bbox.y + bbox.height / 2)
      .transition()
      .duration(100)
      .delay(100)
      .attr("x2", target.tx)
      .attr("y2", target.ty);

    root
      .select("svg")
      .append("circle")
      .attr("r", 0)
      .attr("cx", target.tx)
      .attr("cy", target.ty)
      .attr("opacity", 0.6)
      .attr("fill", "#000")
      .transition()
      .delay(200)
      .duration(30)
      .attr("r", 6);
  };

  const addOnClassToSelectedElements = () => {
    const svg = document.querySelector("svg");

    // Find the text element and the corresponding line for the selected option
    let ***REMOVED***, ***REMOVED***;

    if (***REMOVED*** === "Cancers") {
      ***REMOVED*** = svg.querySelector(".title");
      ***REMOVED*** = svg.querySelector(".title-line");
    } else if (***REMOVED*** === "***REMOVED***") {
      // Assuming the second text and line refer to "Other conditions"
      ***REMOVED*** = svg.***REMOVED***(".title")[1];
      ***REMOVED*** = svg.***REMOVED***(".title-line")[1];
    }

    // Add the 'on' class if the elements exist
    if (***REMOVED*** && ***REMOVED***) {
      ***REMOVED***.classList.add("on");
      ***REMOVED***.classList.add("on");
    }
  };

  const ***REMOVED*** = () => {
    const root = d3.select(".body.parts");
    let messages = {
      en: messages_en,
      fr: messages_fr,
    };
    messages = messages[intl.locale];

    const left = [
      {
        label: intl.formatMessage({
          id: "oropharyngeal.cancer",
          ***REMOVED***: messages["oropharyngeal.cancer"],
        }),
        selector: ".stomach",
        tx: 90,
        ty: 60,
      },
      {
        label: intl.formatMessage({
          id: "laryngeal.cancer",
          ***REMOVED***: messages["laryngeal.cancer"],
        }),
        selector: ".larynx",
        tx: 80,
        ty: 90,
      },
      {
        label: intl.formatMessage({
          id: "oesophageal.ancer",
          ***REMOVED***: messages["oesophageal.cancer"],
        }),
        selector: ".stomach",
        tx: 77,
        ty: 95,
      },
      {
        label: intl.formatMessage({
          id: "tracheal.bronchial.lung.cancer",
          ***REMOVED***: messages["tracheal.bronchial.lung.cancer"],
        }),
        selector: ".larynx",
        tx: intl.locale === "en" ? 80 : 90,
        ty: 120,
      },
      {
        label: intl.formatMessage({
          id: "acute.myeloid.leukaemia",
          ***REMOVED***: messages["acute.myeloid.leukaemia"],
        }),
        selector: ".blood",
        tx: 90,
        ty: 200,
      },
      {
        label: intl.formatMessage({
          id: "stomach.cancer",
          ***REMOVED***: messages["stomach.cancer"],
        }),
        selector: ".stomach",
        tx: 80,
        ty: 150,
      },
      {
        label: intl.formatMessage({
          id: "liver.cancer",
          ***REMOVED***: messages["liver.cancer"],
        }),
        selector: ".stomach",
        tx: 80,
        ty: 150,
      },
      {
        label: intl.formatMessage({
          id: "pancreatic.cancer",
          ***REMOVED***: messages["pancreatic.cancer"],
        }),
        selector: ".stomach",
        tx: 105,
        ty: 160,
      },
      {
        label: intl.formatMessage({
          id: "colorectal.cancer",
          ***REMOVED***: messages["colorectal.cancer"],
        }),
        selector: ".stomach",
        tx: 85,
        ty: 250,
      },
      {
        label: intl.formatMessage({
          id: "kidney.cancer",
          ***REMOVED***: messages["kidney.cancer"],
        }),
        selector: ".stomach",
        tx: 65,
        ty: 185,
      },
      {
        label: intl.formatMessage({
          id: "bladder.cancer",
          ***REMOVED***: messages["bladder.cancer"],
        }),
        selector: ".erectile",
        tx: 85,
        ty: 250,
      },
      {
        label: intl.formatMessage({
          id: "cervical.cancer",
          ***REMOVED***: messages["cervical.cancer"],
        }),
        selector: ".Ectopic",
        tx: 85,
        ty: 275,
      },
    ];

    const right = [
      {
        label: intl.formatMessage({
          id: "stroke",
          ***REMOVED***: messages["stroke"],
        }),
        selector: ".brain",
        tx: 97,
        ty: 39,
      },
      {
        label: intl.formatMessage({
          id: "blindness.decreased.eyesight",
          ***REMOVED***: messages["blindness.decreased.eyesight"],
        }),
        selector: ".eyes",
        tx: 97,
        ty: 39,
      },
      {
        label: intl.formatMessage({
          id: "periodontitis",
          ***REMOVED***: messages["periodontitis"],
        }),
        selector: ".stomach",
        tx: 90,
        ty: 60,
      },
      {
        label: intl.formatMessage({
          id: "aortic.aneurysm",
          ***REMOVED***: messages["aortic.aneurysm"],
        }),
        selector: ".blood",
        tx: 90,
        ty: 120,
      },
      {
        label: intl.formatMessage({
          id: "heart.disease",
          ***REMOVED***: messages["heart.disease"],
        }),
        selector: ".heart",
        tx: 90,
        ty: 140,
      },
      {
        label: intl.formatMessage({
          id: "pneumonia",
          ***REMOVED***: messages["pneumonia"],
        }),
        selector: ".lungs",
        tx: 85,
        ty: 130,
      },
      {
        label: intl.formatMessage({
          id: "***REMOVED***.peripheral.vascular.disease",
          ***REMOVED***:
            messages["***REMOVED***.peripheral.vascular.disease"],
        }),
        selector: ".blood",
        tx: 90,
        ty: 380,
      },
      {
        label: intl.formatMessage({
          id: "copd",
          ***REMOVED***: messages["copd"],
        }),
        selector: ".lungs",
        tx: 85,
        ty: 130,
      },
      {
        label: intl.formatMessage({
          id: "tuberculosis",
          ***REMOVED***: messages["tuberculosis"],
        }),
        selector: ".lungs",
        tx: 85,
        ty: 130,
      },
      {
        label: intl.formatMessage({
          id: "asthma",
          ***REMOVED***: messages["asthma"],
        }),
        selector: ".lungs",
        tx: 85,
        ty: 130,
      },
      {
        label: intl.formatMessage({
          id: "diabetes",
          ***REMOVED***: messages["diabetes"],
        }),
        selector: ".stomach",
        tx: 105,
        ty: 160,
      },
      {
        label: intl.formatMessage({
          id: "hip.fractures",
          ***REMOVED***: messages["hip.fractures"],
        }),
        selector: ".bounds",
        tx: 90,
        ty: 230,
      },
      {
        label: intl.formatMessage({
          id: "rheumatoid.arthritis",
          ***REMOVED***: messages["rheumatoid.arthritis"],
        }),
        selector: ".bounds",
        tx: 134,
        ty: 275,
      },
      {
        label: intl.formatMessage({
          id: "impaired.immune.function",
          ***REMOVED***: messages["impaired.immune.function"],
        }),
        selector: null,
        tx: 85,
        ty: 130,
      },
      {
        label: intl.formatMessage({
          id: "erectile.dysfunction",
          ***REMOVED***: messages["erectile.dysfunction"],
        }),
        selector: ".erectile",
        tx: 107,
        ty: 290,
      },
      {
        label: intl.formatMessage({
          id: "reduced.fertility.men",
          ***REMOVED***: messages["reduced.fertility.men"],
        }),
        selector: ".erectile",
        tx: 95,
        ty: 290,
      },
      {
        label: intl.formatMessage({
          id: "ectopic.pregnancy",
          ***REMOVED***: messages["ectopic.pregnancy"],
        }),
        selector: ".Ectopic",
        tx: 90,
        ty: 250,
      },
      {
        label: intl.formatMessage({
          id: "reduced.fertility.women",
          ***REMOVED***: messages["reduced.fertility.women"],
        }),
        selector: ".Ectopic",
        tx: 95,
        ty: 242,
      },
    ];

    // Clear existing labels
    root.select("svg").selectAll("text.label").remove();

    let data = ***REMOVED*** === "Cancers" ? left : right;
    let sy = 60;

    const calculateX = (d, i) => {
      if (isMobile) return 160;
      return -250;
    };

    if (intl.locale === "en") {
      if (!isMobile) {
        sy = 90;
        root
          .select("svg")
          .selectAll("text.left")
          .data(left)
          .enter()
          .append("text")
          .attr("class", "label")
          .attr("x", (d, i) => -250)
          .attr("y", (d, i) => {
            return sy + i * 25;
          })
          .text((d) => d.label);

        root
          .select("svg")
          .selectAll("text.rigth")
          .data(right)
          .enter()
          .append("text")
          .attr("class", "label")
          .attr("x", (d, i) => 200)
          .attr("y", (d, i) => {
            return sy + i * 25;
          })
          .text((d) => d.label);
      } else {
        root
          .select("svg")
          .selectAll("text.label")
          .data(data)
          .enter()
          .append("text")
          .attr("class", "label")
          .attr("x", calculateX)
          .attr("y", (d, i) => sy + i * 25)
          .text((d) => d.label);
      }
    } else {
      root
        .select("svg")
        .selectAll("text.left")
        .data(left)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (d, i) => -280)
        .attr("y", (d, i) => {
          return sy + i * 25;
        })
        .text((d) => d.label);

      root
        .select("svg")
        .selectAll("text.right")
        .data(right)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (d, i) => 200)
        .attr("y", (d, i) => {
          return sy + i * 25;
        })
        .text((d) => d.label);
    }

    root
      .select("svg")
      .selectAll("text.label")
      .on("mouseover", (event, d) => {
        onMouseOver(d.selector, d3.select(event.currentTarget), d, {
          tx: d.tx,
          ty: d.ty,
        });
      })
      .on("mouseout", (event, d) => {
        onMouseOut();
      });
  };

  React.useEffect(() => {
    window.***REMOVED***("resize", updateLayout);
    updateLayout();
    ***REMOVED***();
    addOnClassToSelectedElements();

    return () => {
      window.***REMOVED***("resize", updateLayout);
    };
  }, []);

  React.useEffect(() => {
    ***REMOVED***();
    addOnClassToSelectedElements();
  }, [***REMOVED***]);

  const mobileOptions = {
    Cancers: {
      x: 180,
      y: 25,
    },
    ***REMOVED***: {
      x: 320,
      y: 25,
    },
    viewBoxDims: "0 0 500 520",
  };

  return (
    <Container className="body parts">
      <svg
        className="body root"
        viewBox={
          isMobile
            ? mobileOptions["viewBoxDims"]
            : "-300 0 900 520"
        }
        xmlns="http://www.w3.org/2000/svg"
      >
        <Background className="backGround" />
        <Bounds className="system bounds" />
        <Head className="system head" />
        <Lungs className="system larynx" />
        <Lungs className="system lungs" />
        <Stomach className="system stomach" />
        <Liver className="system liver" />
        <Brain className="system brain" />
        <Eyes className="system eyes" />
        <Blood className="system blood" />
        <Heart className="system heart" />
        <Erectile className="system erectile" />
        <Ectopic className="system Ectopic" />
        <g onClick={***REMOVED***}>
          <rect
            className="title-rect"
            x={isMobile ? mobileOptions["Cancers"]["x"] - 20 : ""}
            y={isMobile ? mobileOptions["Cancers"]["y"] - 20 : "60"}
            rx="5"
            ry="5"
            width="100"
            height="30"
          />
          <text
            x={isMobile ? mobileOptions["Cancers"]["x"] : "-250"}
            y={isMobile ? mobileOptions["Cancers"]["y"] : "60"}
            className="title"
          >
            <***REMOVED*** id="ailments.title" ***REMOVED***="Cancers" />
          </text>
          {isMobile && (
            <rect
              className="title-line"
              x={isMobile ? mobileOptions["Cancers"]["x"] -18 : "-250"}
              y={isMobile ? mobileOptions["Cancers"]["y"] + 7 : ""}
              width="58"
              height="3"
              fill="#E5EBED"
            />
          )}
        </g>
        <g onClick={***REMOVED***}>
          <rect
            className="title-rect"
            x={isMobile ? mobileOptions["***REMOVED***"]["x"] - 65 : ""}
            y={isMobile ? mobileOptions["***REMOVED***"]["y"] - 20 : "60"}
            rx="5"
            ry="5"
            width="155"
            height="30"
          />
          <text
            x={isMobile ? mobileOptions["***REMOVED***"]["x"] - 50 : "200"}
            y={isMobile ? mobileOptions["***REMOVED***"]["y"] : "60"}
            className="title"
          >
            <***REMOVED***
              id="ailments.***REMOVED***"
              ***REMOVED***="Other conditions"
            />
          </text>
          {isMobile && (
            <rect
              className="title-line"
              x={isMobile ? mobileOptions["***REMOVED***"]["x"] - 68 : "200"}
              y={isMobile ? mobileOptions["***REMOVED***"]["y"] + 7 : "60"}
              width="118"
              height="3"
              fill="#E5EBED"
            />
          )}
        </g>
      </svg>
    </Container>
  );
};

export default injectIntl(Body);