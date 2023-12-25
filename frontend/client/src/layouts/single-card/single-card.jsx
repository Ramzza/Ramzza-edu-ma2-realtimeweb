import React from 'react';
import PropTypes from 'prop-types';
import ScrollView from 'devextreme-react/scroll-view';
import './single-card.scss';

// eslint-disable-next-line react/prop-types
export default function SingleCard({ title, description, children }) {
  return (
    <ScrollView height="100%" width="100%" className="with-footer single-card">
      <div className="dx-card content">
        <div className="header">
          <div className="title">{title}</div>
          <div className="description">{description}</div>
        </div>
        {children}
      </div>
    </ScrollView>
  );
}

SingleCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};
SingleCard.defaultProps = { description: '' };
