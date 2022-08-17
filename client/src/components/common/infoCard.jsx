import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoCard = ({ icon, title, number }) => {
  return (
    <Card className="profile-info-card">
      <div className="profile-info-card-wrapper">
        <div className={"info-icon-wrapper mt-3 " + title}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className="info-text my-3">
          <h5 className="mb-0">
            {title} : {number}
          </h5>
        </div>
      </div>
    </Card>
  );
};

export default InfoCard
