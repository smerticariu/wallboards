import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStatus } from '../../..//store/reducers/wallboards.reducer';
import { DEFAULTS } from '../../../common/defaults/defaults';
import { handleWallboardActiveModalAC } from '../../../store/actions/modal.action';
import { setWallboardIdForDeleteAC, setWallboardsByCategoryAC } from '../../../store/actions/wallboards.action';
import { fetchAllWallboardsThunk, copyWallboardThunk } from '../../../store/thunk/wallboards.thunk'; // import syncWallboardsWithConfig when needed - do not delete

const LandingTable = () => {
  const dispatch = useDispatch();
  const { fetchStatus, wallboards } = useSelector((state) => state.wallboards.present.allWallboards);
  const [filteredWbs, setFilteredWbs] = useState([]);

  const [filterByNameAlphabet, setFilterByNameAlphabet] = useState('');
  const [filterByAuthorAlphabet, setFilterByAuthorAlphabet] = useState('');
  const [filterByDate, setFilterByDate] = useState('descendent');

  const { userInfo } = useSelector((state) => state.login);
  const { category, searchedWallboards } = useSelector((state) => state.landing);

  const [dataType, setDataType] = useState('Wallboard');
  useEffect(() => {
    // dispatch(syncWallboardsWithConfig()); // import and use it when needed - do not delete
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
        case 'All Wallboards':
          let wbsByDate = [];
          setDataType('Wallboard');
          if(wallboards.length) {
            const allWallboards = wallboards.filter(wb => wb.id.includes('-w-'));
            wbsByDate = allWallboards.sort((a, b) => a.lastView.toString().localeCompare(b.lastView.toString())).reverse();
          } else return [];
          return wbsByDate;
        case 'Created By Me':
          let wbsByUser = []; 
          if(wallboards.length) {
            const allWallboards = wallboards.filter(wb => wb.id.includes('-w-'));
            wbsByUser = allWallboards.filter((wb) => wb.natterboxUserId === userInfo.natterboxUserId);
          } else return [];
          return wbsByUser;
        case 'All Wallboard Groups':
          setDataType('Group')
          const allGroups = wallboards.filter(wb => wb.id.includes('-g-'));
          return allGroups;
        default:
          return wallboards;
      }
    };

    const filteredWbsByCategory = filterWbsByCategory(category);

    const wallboardsByInput = filteredWbsByCategory.filter(
      (wb) =>
        wb?.name?.toLowerCase().includes(searchedWallboards.toLowerCase()) ||
        wb?.createdBy?.toLowerCase().includes(searchedWallboards.toLowerCase())
    );

    setFilteredWbs(wallboardsByInput);
    dispatch(setWallboardsByCategoryAC(wallboardsByInput));
    // eslint-disable-next-line
  }, [category, searchedWallboards, wallboards.length]);

  const handleDelete = (id) => {
    dispatch(setWallboardIdForDeleteAC(id));
    dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.DELETE_WALLBOARD));
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
                  {dataType} Name & Description
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
                const path = dataType === 'Wallboard' ? 'wallboard' : 'group';
                return (
                  <tr key={index}>
                    <td className="c-landing-table__wb-name">
                      <p>
                        <a target="_blank" href={`#/${path}/${wb.id}`} rel="noreferrer">
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
                      <a target="_blank" rel="noreferrer" href={`#/${path}/${wb.id}/edit`} className="c-landing-table__edit-btn">
                        {' '}
                      </a>
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
        <div className="empty-message">{DEFAULTS.MODAL.MESSAGES.NO_RESULTS}</div>
      )}
    </div>
  );
};

export default LandingTable;
