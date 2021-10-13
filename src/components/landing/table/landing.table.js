import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setWallboardsByCategoryAC } from 'src/store/actions/wallboards.action';
import { FetchStatus } from 'src/store/reducers/wallboards.reducer';
import { fetchAllWallboardsThunk, deleteWallboardThunk, copyWallboardThunk,syncWallboardsWithConfig } from 'src/store/thunk/wallboards.thunk';

const LandingTable = () => {
  const dispatch = useDispatch();
  const { fetchStatus, wallboards } = useSelector((state) => state.wallboards.allWallboards);
  const [filteredWbs, setFilteredWbs] = useState([]);
  const { userInfo, token } = useSelector((state) => state.login);
  const category = useSelector((state) => state.landing.category);
  const filter = useSelector((state) => state.landing.filterWallboards);
  useEffect(() => {
    dispatch(syncWallboardsWithConfig());
    dispatch(fetchAllWallboardsThunk());
    // eslint-disable-next-line
  }, [wallboards.length]);

  useEffect(() => {
    const filterWbsByCategory = (category) => {
      switch (category) {
        case 'Most Recent':
          const wbsByDate = wallboards.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn)).slice(0, 10);
          return wbsByDate;
        case 'Created By Me':
          const wbsByUser = wallboards.filter((wb) => wb.natterboxUserId === userInfo.natterboxUserId);
          return wbsByUser;
        default:
          return wallboards;
      }
    };

    const filteredWbsByCategory = filterWbsByCategory(category);

    const wallboardsByInput = filteredWbsByCategory.filter(
      (wb) => {if(wb?.name?.toLowerCase().includes(filter.toLowerCase()) || wb?.createdBy?.toLowerCase().includes(filter.toLowerCase())) return wb}
    );
    

    setFilteredWbs(wallboardsByInput);
    dispatch(setWallboardsByCategoryAC(wallboardsByInput));
    // eslint-disable-next-line
  }, [category, filter, wallboards.length]);

  const handleDelete = (id) => {
    dispatch(deleteWallboardThunk({ wbId: id }));
  };

  const handleCopy = (wb) => {
    dispatch(copyWallboardThunk({ wb }));
  };

  const handleConvertDate = date => {
    let dateToConvert = new Date(date);
    dateToConvert.setDate(dateToConvert.getDate());
    const dateString = ('0' + dateToConvert.getDate()).slice(-2) + '/' + ('0' + (dateToConvert.getMonth()+1)).slice(-2) + '/' + dateToConvert.getFullYear();
    return dateString;
  }

  if (fetchStatus !== FetchStatus.SUCCESS) return <div>Fetch all wallboards in progress</div>;
  return (
    <div className="c-landing-table">
      <table>
        <thead>
          <tr>
            <td>Wallboard Name & Description</td>
            <td>Folder</td>
            <td>Created By</td>
            <td>Created On</td>
          </tr>
        </thead>
        <tbody>
          {filteredWbs.length > 0 &&
            filteredWbs.map((wb, index) => {
              return (
                <tr key={index}>
                  <td className="c-landing-table__wb-name">
                    <p>
                      <a target="_blank" rel="noreferrer" href={`http://localhost:3000/wallboard/${wb.id}`}>
                        {wb.name}
                      </a>
                    </p>
                    <span>{wb.description}</span>
                  </td>
                  <td className="c-landing-table__wb-folder">
                    <p>{wb.folder}</p>
                  </td>
                  <td className="c-landing-table__wb-created-by">
                    <p>{wb.createdBy}</p>
                  </td>
                  <td className="c-landing-table__wb-created-on">
                    <p>{handleConvertDate(wb.createdOn)}</p>
                  </td>
                  <td className="c-landing-table__wb-actions">
                    <Link target="_blank" to={`/wallboard/${wb.id}/edit`} className="c-landing-table__edit-btn" />
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
    </div>
  );
};

export default LandingTable;
