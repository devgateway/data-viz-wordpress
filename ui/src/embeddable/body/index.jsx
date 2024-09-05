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

class Body extends React.Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = {
      counter: 0,
      isMobile: ["mobile", "tablet"].includes(getDeviceType()),
      isClicked: false,
      ***REMOVED***: "Cancers",
    };
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.***REMOVED*** = this.***REMOVED***.bind(this);
    this.***REMOVED*** = this.***REMOVED***.bind(this);
  }

  updateLayout() {
    this.setState({ isMobile: ["mobile", "tablet"].includes(getDeviceType()) });
  }

  ***REMOVED***(e) {
    if (!this.state.isMobile) return;
    const svg = e.target.closest("svg");
    const titleText = e.target.closest(".title");
    const btn = e.target.closest(".title-rect");

    if (titleText || btn) {
      [...svg.***REMOVED***(".title, .title-rect")].forEach((node) =>
        node.classList.remove("on")
      );

      const ***REMOVED*** = titleText || btn;
      ***REMOVED***.classList.add("on");
      (titleText ? titleText.***REMOVED*** : btn.nextSibling)?.classList.add(
        "on"
      );

      this.setState({
        ***REMOVED***: (titleText ? titleText : btn.nextSibling).innerHTML,
      });
    }
  }

  onMouseOut() {
    d3.select(".body.parts")
      .selectAll("g.system")
      .transition()
      .duration(0)
      .delay(200)
      .style("opacity", 1);
    d3.select(".body.parts").selectAll("circle").remove();
    d3.select(".body.parts").selectAll("line").remove();
  }

  onMouseOver(selector, source, target) {
    const root = d3.select(".body.parts");

    const element = root.select(selector);
    if (selector) {
      root.selectAll("g.system").transition().duration(200).style("opacity", 0);
      element.transition().style("opacity", 1);
    }
    var bbox = source.node().getBBox();

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

    //  <line stroke="#000" x1="" y1="153.***REMOVED***" x2="-57.0522107618267" y2="110.***REMOVED***"/>
  }

  ***REMOVED***() {
    window.***REMOVED***("resize", this.updateLayout);
    this.updateLayout();
    this.***REMOVED***();
  }

  ***REMOVED***() {
    const root = d3.select(".body.parts");
    let messages = {
      en: messages_en,
      fr: messages_fr,
    };
    const intl = this.props.intl;
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

    const { ***REMOVED***, isMobile } = this.state;

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
        this.onMouseOver(d.selector, d3.select(event.currentTarget), d, {
          tx: d.tx,
          ty: d.ty,
        });
      })
      .on("mouseout", (event, d) => {
        this.onMouseOut();
      });
  }

  ***REMOVED***(prevProps, prevState) {
    if (prevState.***REMOVED*** !== this.state.***REMOVED***) {
      this.***REMOVED***();
    }
  }

  mobileOptions = {
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

  render() {
    return (
      <Container className="body parts">
        <svg
          className="body root"
          viewBox={
            this.state.isMobile
              ? this.mobileOptions["viewBoxDims"]
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
          <g onClick={this.***REMOVED***}>
            <rect
              className="title-rect"
              x={
                this.state.isMobile
                  ? this.mobileOptions["Cancers"]["x"] - 20
                  : ""
              }
              y={
                this.state.isMobile
                  ? this.mobileOptions["Cancers"]["y"] - 20
                  : "60"
              }
              rx="5"
              ry="5"
              width="100"
              height="30"
            />
            <text
              x={
                this.state.isMobile
                  ? this.mobileOptions["Cancers"]["x"]
                  : "-250"
              }
              y={
                this.state.isMobile ? this.mobileOptions["Cancers"]["y"] : "60"
              }
              className="title"
            >
              <***REMOVED*** id="ailments.title" ***REMOVED***="Cancers" />
            </text>
          </g>
          <g onClick={this.***REMOVED***}>
            <rect
              className="title-rect"
              x={
                this.state.isMobile
                  ? this.mobileOptions["***REMOVED***"]["x"] - 15
                  : ""
              }
              y={
                this.state.isMobile
                  ? this.mobileOptions["***REMOVED***"]["y"] - 20
                  : ""
              }
              rx="5"
              ry="5"
              width="155"
              height="30"
            />
            <text
              x={
                this.state.isMobile
                  ? this.mobileOptions["***REMOVED***"]["x"]
                  : "200"
              }
              y={
                this.state.isMobile
                  ? this.mobileOptions["***REMOVED***"]["y"]
                  : "60"
              }
              className="title"
            >
              <***REMOVED***
                id="ailments.***REMOVED***"
                ***REMOVED***="Other conditions"
              />
            </text>
          </g>
        </svg>
      </Container>
    );
  }
}

export default injectIntl(Body);
