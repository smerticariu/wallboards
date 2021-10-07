import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWallboardsByCategoryAC } from 'src/store/actions/wallboards.action';
import { FetchStatus } from 'src/store/reducers/wallboards.reducer';
import { fetchAllWallboardsThunk } from 'src/store/thunk/wallboards.thunk';

const LandingTable = ({ userInfo }) => {
  const dispatch = useDispatch();
  const { fetchStatus, wallboards } = useSelector((state) => state.wallboards.allWallboards);
  const [filteredWbs, setFilteredWbs] = useState([]);

  const category = useSelector((state) => state.landing.category);

  const filter = useSelector((state) => state.landing.filterWallboards);
  useEffect(() => {
    dispatch(fetchAllWallboardsThunk());
  }, []);
  useEffect(() => {
    // const getWb = async () => {
    //   const options = {
    //     method: 'get',
    //     url: `https://sapien-proxy.redmatter-qa01.pub/v1/organisation/${userInfo.natterboxOrgId}/blob`,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: 'Bearer ' + token,
    //       'Access-Control-Allow-Origin': '*',
    //       Accept: '*/*'
    //     }
    //   }

    //   const wb = await axios(options).then(res => {console.log('ssss', res)});
    //   setWbs(wb);
    //   console.log(wb)
    // }

    // getWb();

    // setAllWbs([...allWbs]);

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
      (wb) => wb.name.toLowerCase().includes(filter.toLowerCase()) || wb.createdBy.toLowerCase().includes(filter.toLowerCase())
    );

    setFilteredWbs(wallboardsByInput);
    dispatch(setWallboardsByCategoryAC(wallboardsByInput));
    // eslint-disable-next-line
  }, [category, filter, wallboards]);
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
                      <a target="_blank" href={`http://localhost:3000/wallboard/${wb.id}`}>
                        {wb.name}
                      </a>
                    </p>
                    <span>{wb.by}</span>
                  </td>
                  <td className="c-landing-table__wb-folder">
                    <p>{wb.folder}</p>
                  </td>
                  <td className="c-landing-table__wb-created-by">
                    <p>{wb.createdBy}</p>
                  </td>
                  <td className="c-landing-table__wb-created-on">
                    <p>{wb.createdOn}</p>
                  </td>
                  <td className="c-landing-table__wb-actions">
                    <button className="c-landing-table__edit-btn"></button>
                    <button className="c-landing-table__copy-btn"></button>
                    <button className="c-landing-table__delete-btn"></button>
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
