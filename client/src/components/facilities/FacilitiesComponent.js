import React, { Component } from "react";
import { Fade } from "react-reveal";
import { data } from "./FacilitiesData";

export default class Facilitiescomponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      elements: null,
      data,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (name) => (evt) => {
    this.setState({
      name: name,
    });
    this.setState((prevState) => ({
      data: prevState.data.map((facility) =>
        facility.name === name
          ? Object.assign(facility, { isOpened: true })
          : facility.isOpened === true
          ? Object.assign(facility, { isOpened: false })
          : facility
      ),
    }));
  };

  render() {
    const FacilitiesCategory = ({ name }) => {
      let facility = this.state.data.find((facility) => facility.name === name);
      return (
        <>
          <Fade cascade>
            <div className="facilities__category">
              <div className="facilities__category-heading">
                <h1>{facility.name}</h1>
              </div>
              <div className="facilities__category-description">
                {facility.description}
              </div>
            </div>
            <div className="facilities__card-container">
              {facility.cards.map((card, index) => (
                <div className="facilities__card" key={card+index}>
                  <div className="facilities__card-header">
                    <h3 className="facilities__card-heading">{card.title}</h3>
                  </div>
                  <div className="facilities__card-body">
                    {card.description}
                  </div>
                </div>
              ))}
            </div>
          </Fade>
        </>
      );
    };
    const RenderImage = () => {
      return (
        <Fade cascade>
          <div className="facilities__imagesContainer">
            <div className="facilities__image">
              <div className="facilities__image__1 electronics"></div>
            </div>
            <div className="facilities__image">
              <div className="facilities__image__1 gaming"></div>
            </div>
            <div className="facilities__image">
              <div className="facilities__image__1 pouch_battery"></div>
            </div>
            <div className="facilities__image">
              <div className="facilities__image__1 robotics"></div>
            </div>
            <div className="facilities__image">
              <div className="facilities__image__1 mechanical"></div>
            </div>
          </div>
        </Fade>
      );
    };
    const renderListTabs = this.state.data.map((category,ind) => {
      return (
        <li className={"facilities__tab-item"} key={category+ind}>
          <div
            role="button"
            className={
              category.isOpened
                ? "facilities__tab-link facilities__tab-link-active"
                : "facilities__tab-link"
            }
            onClick={this.handleClick(category.name)}
          >
            {category.name}
          </div>
        </li>
      );
    });
    const RenderTabs = () => {
      return (
        <Fade cascade>
          <div className="facilities__tabs">
            <ul className="facilities__tabs-list">{renderListTabs}</ul>
          </div>
        </Fade>
      );
    };
    return (
      <main className="facilities__main-content">
        <Fade cascade>
          <section className="facilities__headerSection">
            <div className="facilities__headerSection--Headingdiv">
              <h1 className="facilities__mainHeading">FACILITIES</h1>
              <span className="facilities__byline">
                TO HELP YOU CRAFT YOUR DREAMS
              </span>
            </div>
          </section>
        </Fade>
        <RenderTabs />
        <div className="facilities__category-main">
          {this.state.name ? (
            <FacilitiesCategory name={this.state.name}></FacilitiesCategory>
          ) : (
            <RenderImage />
          )}
        </div>
      </main>
    );
  }
}
