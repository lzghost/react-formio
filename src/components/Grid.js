import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormioUtils from 'formiojs/utils';
import _get from 'lodash/get';
import {Pagination} from 'react-bootstrap';

export default class extends Component {
  static propTypes = {
    submissions: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    columnWidths: PropTypes.object.isRequired,
    onSort: PropTypes.func,
    onClick: PropTypes.func,
    onPage: PropTypes.func,
    firstItem: PropTypes.number,
    lastItem: PropTypes.number,
    total: PropTypes.number,
    pages: PropTypes.number,
    activePage: PropTypes.number,
    Cell: PropTypes.func
  };

  static defaultProps = {
    onSort: () => {},
    onClick: () => {},
    onPage: () => {},
    firstItem: 1,
    lastItem: 1,
    total: 1,
    pages: 1,
    activePage: 1,
    Cell: props => {
      const {row, column} = props;
      return (
        <span>{_get(row, column.key, '')}</span>
      );
    }
  };

  render = () => {
    const {submissions, columns, columnWidths, sortOrder, onSort, onClick, Cell} = this.props;
    const {firstItem, lastItem, total, activePage, onPage, pages} = this.props;
    return (
      <div>
        { submissions.length ?
          <ul className='list-group list-group-striped'>
            <li className='list-group-item list-group-header hidden-xs hidden-md'>
              <div className='row'>
                { columns.map((column, index) => {
                  let sortClass = '';
                  if (sortOrder === column.key) {
                    sortClass = 'glyphicon glyphicon-triangle-top';
                  }
                  else if (sortOrder === ('-' + column.key)) {
                    sortClass = 'glyphicon glyphicon-triangle-bottom';
                  }
                  return (
                    <div key={index} className={'col col-md-' + columnWidths[index]}>
                      <a onClick={() => onSort(column.key)}><strong>{ column.title } <span className={sortClass}/></strong></a>
                    </div>
                  );
                })}
              </div>
            </li>
            { submissions.map((submission, index) => {
              return (
                <li className='list-group-item' key={submission._id}>
                  <div className='row'>
                    { columns.map((column, index) => {
                      return (
                        <div key={index} className={'col col-md-' + columnWidths[index]} onClick={() => onClick(submission)}>
                          <h4 className='hidden-md hidden-lg'>{column.title}</h4>
                          <Cell row={submission} column={column} />
                        </div>
                      );
                    })}
                  </div>
                </li>
              );
            })}
            <li className="list-group-item">
              <Pagination
                className="pagination-sm"
                prev="Previous"
                next="Next"
                items={pages}
                activePage={activePage}
                maxButtons={5}
                onSelect={onPage}
              />
              <span className="pull-right item-counter"><span className="page-num">{ firstItem } - { lastItem }</span> / { total } total</span>
            </li>
          </ul> :
          <div>No data found</div>
        }
      </div>
    );
  }
}
