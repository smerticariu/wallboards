import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WALLBOARD_MODAL_NAMES } from 'src/components/modal/new-wallboard/modal.new-wallboard.defaults';
import { handleWallboardActiveModalAC } from 'src/store/actions/modal.action';
import { setWallboardIdForDeleteAC, setWallboardsByCategoryAC } from 'src/store/actions/wallboards.action';
import { FetchStatus } from '../../..//store/reducers/wallboards.reducer';
import { fetchAllWallboardsThunk, copyWallboardThunk, syncWallboardsWithConfig } from '../../../store/thunk/wallboards.thunk';
import config from 'src/config/auth';

const LandingTable = () => {
  const dispatch = useDispatch();
  const { fetchStatus, wallboards } = useSelector((state) => state.wallboards.present.allWallboards);
  const [filteredWbs, setFilteredWbs] = useState([]);

  const [filterByNameAlphabet, setFilterByNameAlphabet] = useState('');
  const [filterByAuthorAlphabet, setFilterByAuthorAlphabet] = useState('');
  const [filterByDate, setFilterByDate] = useState('descendent');

  const { userInfo } = useSelector((state) => state.login);
  const { category, searchedWallboards } = useSelector((state) => state.landing);

  useEffect(() => {
    // dispatch(syncWallboardsWithConfig()); // do not delete yet
    dispatch(fetchAllWallboardsThunk());
    // eslint-disable-next-line
  }, []);

  const handleSortWallboards = (filterName) => {
    switch (filterName) {
      case 'name':
        if (!filterByNameAlphabet.length || filterByNameAlphabet === 'descendent') {
          setFilterByNameAlphabet('ascendent');
          const wallboardsByName = filteredWbs.sort((a, b) => a.name.localeCompare(b.name));
          setFilteredWbs(wallboardsByName);
        } else if (filterByNameAlphabet === 'ascendent') {
          setFilterByNameAlphabet('descendent');
          const wallboardsByName = filteredWbs.sort((a, b) => a.name.localeCompare(b.name)).reverse();
          setFilteredWbs(wallboardsByName);
        }
        break;

      case 'author':
        if (!filterByAuthorAlphabet.length || filterByAuthorAlphabet === 'descendent') {
          setFilterByAuthorAlphabet('ascendent');
          const wallboardsByAuthor = filteredWbs.sort((a, b) => a.createdBy.localeCompare(b.createdBy));
          setFilteredWbs(wallboardsByAuthor);
        } else if (filterByAuthorAlphabet === 'ascendent') {
          setFilterByAuthorAlphabet('descendent');
          const wallboardsByAuthor = filteredWbs.sort((a, b) => a.createdBy.localeCompare(b.createdBy)).reverse();
          setFilteredWbs(wallboardsByAuthor);
        }
        console.log(filteredWbs, filterName);
        break;

      case 'date':
        if (filterByDate === 'descendent') {
          setFilterByDate('ascendent');
          const wallboardsByDate = filteredWbs.sort((a, b) => a.createdOn.toString().localeCompare(b.createdOn.toString()));
          setFilteredWbs(wallboardsByDate);
        } else {
          setFilterByDate('descendent');
          const wallboardsByDate = filteredWbs.sort((a, b) => a.createdOn.toString().localeCompare(b.createdOn.toString())).reverse();
          setFilteredWbs(wallboardsByDate);
        }
        break;

      default:
        return;
    }
  };

  useEffect(() => {
    const filterWbsByCategory = (category) => {
      switch (category) {
        case 'Wallboards':
          const wbsByDate = wallboards.sort((a, b) => a.createdOn.toString().localeCompare(b.createdOn.toString())).reverse();
          return wbsByDate;
        case 'Created By Me':
          const wbsByUser = wallboards.filter((wb) => wb.natterboxUserId === userInfo.natterboxUserId);
          return wbsByUser;
        default:
          return wallboards;
      }
    };

    const filteredWbsByCategory = filterWbsByCategory(category);

    const wallboardsByInput = filteredWbsByCategory.filter((wb) => {
      if (
        wb?.name?.toLowerCase().includes(searchedWallboards.toLowerCase()) ||
        wb?.createdBy?.toLowerCase().includes(searchedWallboards.toLowerCase())
      )
        return wb;
    });

    setFilteredWbs(wallboardsByInput);
    dispatch(setWallboardsByCategoryAC(wallboardsByInput));
    // eslint-disable-next-line
  }, [category, searchedWallboards, wallboards.length]);

  const handleDelete = (id) => {
    dispatch(setWallboardIdForDeleteAC(id));
    dispatch(handleWallboardActiveModalAC(WALLBOARD_MODAL_NAMES.DELETE_WALLBOARD));
  };

  const handleCopy = (wb) => {
    dispatch(copyWallboardThunk({ wb }));
  };

  const handleConvertDate = (date) => {
    let dateToConvert = new Date(date);
    dateToConvert.setDate(dateToConvert.getDate());
    const dateString =
      ('0' + dateToConvert.getDate()).slice(-2) +
      '/' +
      ('0' + (dateToConvert.getMonth() + 1)).slice(-2) +
      '/' +
      dateToConvert.getFullYear();
    return dateString;
  };

  return (
    <div className="c-landing-table">
      {fetchStatus !== FetchStatus.SUCCESS ? (
        <div className="fetch-message">Fetching wallboards in progress</div>
      ) : filteredWbs.length ? (
        <table>
          <thead>
            <tr>
              <td>
                <span className="c-landing-table__filter" onClick={() => handleSortWallboards('name')}>
                  Wallboard Name & Description
                </span>
              </td>
              <td>
                <span className="c-landing-table__filter" onClick={() => handleSortWallboards('author')}>
                  Created By
                </span>
              </td>
              <td>
                <span className="c-landing-table__filter" onClick={() => handleSortWallboards('date')}>
                  Created On
                </span>
              </td>
            </tr>
          </thead>
          <tbody>
            {filteredWbs.length > 0 &&
              filteredWbs.map((wb, index) => {
                const wallboardUrl = `${config.redirectUri}/#/wallboard/${wb.id}`;
                return (
                  <tr key={index}>
                    <td className="c-landing-table__wb-name">
                      <p>
                        <a target="_blank" href={`/#/wallboard/${wb.id}`} rel="noreferrer">
                          {wb.name}
                        </a>
                      </p>
                      <span>{wb.description}</span>
                    </td>
                    <td className="c-landing-table__wb-created-by">
                      <p>{wb.createdBy}</p>
                    </td>
                    <td className="c-landing-table__wb-created-on">
                      <p>{handleConvertDate(wb.createdOn)}</p>
                    </td>
                    <td className="c-landing-table__wb-actions">
                      <a target="_blank" rel="noreferrer" href={`/#/wallboard/${wb.id}/edit`} className="c-landing-table__edit-btn" />
                      <button
                        onClick={() => {
                          handleCopy(wb);
                        }}
                        className="c-landing-table__copy-btn"
                      ></button>
                      <button
                        onClick={() => {
                          handleDelete(wb.id);
                        }}
                        className="c-landing-table__delete-btn"
                      ></button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <div className="empty-message">No results</div>
      )}
    </div>
  );
};

export default LandingTable;
