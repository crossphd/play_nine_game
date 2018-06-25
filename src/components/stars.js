import React from 'react'
import FA from 'react-fontawesome';
import _ from 'lodash'

const Stars = (props) => {

  return(
    <div className="col-5">
      {_.range(props.numberOfStars).map(i =>
        <FA key={i} className="fa fa-star" />
      )}
    </div>
  );
}

export default Stars;
