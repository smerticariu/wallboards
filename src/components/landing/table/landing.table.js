import axios from "axios";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as actionTypes from "../../../store/actionTypes";

const LandingTable = ({ userInfo }) => {
  const [allWbs, setAllWbs] = useState([]);
  const [filteredWbs, setFilteredWbs] = useState([]);

  const category = useSelector((state) => state.landing.category);

  const filter = useSelector((state) => state.landing.filterWallboards);
  console.log("[LandingTable] - selected category in table", category, filter);

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
    const allWbs = [
      {
        name: "Customer Support Wallboard",
        folder: "RO Staff Data",
        by: "Sergiu on RO",
        createdBy: "Sergiu Merticariu",
        createdOn: "2021/03/01",
        natterboxUserId: "5601879",
      },
      {
        name: "Second wallboard",
        folder: "UK Staff Data",
        by: "Natterbox on UK",
        createdBy: "James Radford",
        createdOn: "2021/01/01",
        natterboxUserId: "1",
      },
      {
        name: "Third Wallboard",
        folder: "US Staff Data",
        by: "Natterbox on US",
        createdBy: "Stefan",
        createdOn: "2021/05/19",
        natterboxUserId: "2",
      },
      {
        name: "Customer Support Wallboard",
        folder: "UK Staff Data",
        by: "Natterbox on UK",
        createdBy: "James Radford",
        createdOn: "2021/03/19",
        natterboxUserId: "1",
      },
      {
        name: "Customer Support Wallboard",
        folder: "UK Staff Data",
        by: "Natterbox on UK",
        createdBy: "James Radford",
        createdOn: "2021/03/19",
        natterboxUserId: "1",
      },
      {
        name: "Customer Support Wallboard",
        folder: "UK Staff Data",
        by: "Natterbox on UK",
        createdBy: "James Radford",
        createdOn: "2021/03/19",
        natterboxUserId: "1",
      },
      {
        name: "Customer Support Wallboard",
        folder: "UK Staff Data",
        by: "Natterbox on UK",
        createdBy: "James Radford",
        createdOn: "2021/03/19",
        natterboxUserId: "1",
      },
      {
        name: "Customer Support Wallboard",
        folder: "UK Staff Data",
        by: "Natterbox on UK",
        createdBy: "James Radford",
        createdOn: "2021/03/19",
        natterboxUserId: "1",
      },
      {
        name: "Customer Support Wallboard",
        folder: "UK Staff Data",
        by: "Natterbox on UK",
        createdBy: "James Radford",
        createdOn: "2021/03/19",
        natterboxUserId: "1",
      },
      {
        name: "Customer Support Wallboard",
        folder: "UK Staff Data",
        by: "Natterbox on UK",
        createdBy: "James Radford",
        createdOn: "2021/03/19",
        natterboxUserId: "1",
      },
      {
        name: "Customer Support Wallboard",
        folder: "UK Staff Data",
        by: "Natterbox on UK",
        createdBy: "James Radford",
        createdOn: "2021/03/19",
        natterboxUserId: "1",
      },
      {
        name: "Customer Support Wallboard",
        folder: "UK Staff Data",
        by: "Natterbox on UK",
        createdBy: "James Radford",
        createdOn: "2021/03/19",
        natterboxUserId: "1",
      },
      {
        name: "Customer Support Wallboard",
        folder: "UK Staff Data",
        by: "Natterbox on UK",
        createdBy: "James Radford",
        createdOn: "2021/03/19",
        natterboxUserId: "1",
      },
    ];

    setAllWbs([...allWbs]);

    const filterWbsByCategory = (category) => {
      switch (category) {
        case "Most Recent":
          const wbsByDate = allWbs
            .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn))
            .slice(0, 10);
          return wbsByDate;
        case "Created By Me":
          const wbsByUser = allWbs.filter(
            (wb) => wb.natterboxUserId === userInfo.natterboxUserId
          );
          return wbsByUser;
        default:
          return allWbs;
      }
    };

    const filteredWbsByCategory = filterWbsByCategory(category);

    const wallboards = filteredWbsByCategory.filter(
      (wb) =>
        wb.name.toLowerCase().includes(filter.toLowerCase()) ||
        wb.createdBy.toLowerCase().includes(filter.toLowerCase())
    );

    setFilteredWbs(wallboards);
  }, [category, filter]);

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
                    <p>{wb.name}</p>
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
