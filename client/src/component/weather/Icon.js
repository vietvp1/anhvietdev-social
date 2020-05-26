import React from "react";

import OnlyCloudy from "../../images/weather/cloudy-only.svg";
import CloudyLight from "../../images/weather/cloudy-day-light.svg";
import Cloudy from "../../images/weather/cloudy.svg";
import Sun from "../../images/weather/sun.svg";

import ThunderAndRain from "../../images/weather/thunder-rainy.svg";
import ThunderAndBigRain from "../../images/weather/thunder-big-rainy.svg";
import Thunder from "../../images/weather/thunder.svg";

import RainyLight from "../../images/weather/rainy-light.svg";
import RainyMoreLight from "../../images/weather/rainy-more-light.svg";
import Rainy from "../../images/weather/rainy.svg";
import RainyHeavy from "../../images/weather/rainy-heavy.svg";

import SnowLight from "../../images/weather/snowy-light.svg";
import Snow from "../../images/weather/snowy.svg";
import SnowHeavy from "../../images/weather/snow-heavy.svg";
import SnowHeavyAndRain from "../../images/weather/snow-heavy-and-rain.svg";

const Icon = ({ icon }) => {
  switch (icon) {
    case 800:
      return <img className="avatar-70" src={Sun} alt={Sun} />;
    case 801:
    case 802:
      return <img className="avatar-70" src={Cloudy} alt={Cloudy} />;
    case 803:
      return <img className="avatar-70" src={CloudyLight} alt={CloudyLight} />;
    case 200:
    case 301:
    case 500:
    case 520:
      return <img className="avatar-70" src={RainyMoreLight} alt={RainyMoreLight} />;
    case 201:
      return <img className="avatar-70" src={ThunderAndRain} alt={ThunderAndRain} />;
    case 202:
      return <img className="avatar-70" src={ThunderAndBigRain} alt={ThunderAndBigRain} />;
    case 230:
    case 231:
    case 232:
    case 233:
      return <img className="avatar-70" src={Thunder} alt={Thunder} />;
    case 300:
      return <img className="avatar-70" src={RainyLight} alt={RainyLight} />;
    case 302:
    case 501:
    case 521:
      return <img className="avatar-70" src={Rainy} alt={Rainy} />;
    case 502:
    case 511:
    case 522:
      return <img className="avatar-70" src={RainyHeavy} alt={RainyHeavy} />;


    case 600:
      return <img className="avatar-70" src={SnowLight} alt={SnowLight} />;
    case 601:
      return <img className="avatar-70" src={Snow} alt={Snow} />;
    case 602:
    case 610:
    case 611:
    case 612:
    case 621:
      return <img className="avatar-70" src={SnowHeavy} alt={SnowHeavy} />;
    case 622:
    case 623:
      return <img className="avatar-70" src={SnowHeavyAndRain} alt={SnowHeavyAndRain} />;

    default:
      return (
        <React.Fragment>
          <img className="avatar-70" src={OnlyCloudy} alt={OnlyCloudy} />
        </React.Fragment>
      );
  }
};

export default Icon;
