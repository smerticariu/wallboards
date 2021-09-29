import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const LandingTable = () => {
  const [wb, setWb] = useState([]);
  const { token, userInfo } = useSelector(state => state.login);
  // const test = useSelector(state => state.login);
  // console.log( userInfo)
  

  useEffect(() => {
    const getWb = async () => {
      const options = {
        method: 'get',
        url: `https://sapien-proxy.redmatter-qa01.pub/v1/organisation/${userInfo.natterboxOrgId}/blob`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          'Access-Control-Allow-Origin': '*',
          Accept: '*/*'
        }
      }

      const wb = await axios(options).then(res => {console.log('ssss', res)});
      setWb(wb);
      console.log(wb)
    }

    getWb();
  }, [wb])

  const wbs = [{
    name: 'Customer Support Wallboard',
    folder: 'UK Staff Data',
    by: 'Natterbox on UK',
    createdBy: 'James Radford',
    createdOn: '19/03/2021'
  },{
    name: 'Customer Support Wallboard',
    folder: 'UK Staff Data',
    by: 'Natterbox on UK',
    createdBy: 'James Radford',
    createdOn: '19/03/2021'
  },{
    name: 'Customer Support Wallboard',
    folder: 'UK Staff Data',
    by: 'Natterbox on UK',
    createdBy: 'James Radford',
    createdOn: '19/03/2021'
  },{
    name: 'Customer Support Wallboard',
    folder: 'UK Staff Data',
    by: 'Natterbox on UK',
    createdBy: 'James Radford',
    createdOn: '19/03/2021'
  },{
    name: 'Customer Support Wallboard',
    folder: 'UK Staff Data',
    by: 'Natterbox on UK',
    createdBy: 'James Radford',
    createdOn: '19/03/2021'
  },{
    name: 'Customer Support Wallboard',
    folder: 'UK Staff Data',
    by: 'Natterbox on UK',
    createdBy: 'James Radford',
    createdOn: '19/03/2021'
  },{
    name: 'Customer Support Wallboard',
    folder: 'UK Staff Data',
    by: 'Natterbox on UK',
    createdBy: 'James Radford',
    createdOn: '19/03/2021'
  },{
    name: 'Customer Support Wallboard',
    folder: 'UK Staff Data',
    by: 'Natterbox on UK',
    createdBy: 'James Radford',
    createdOn: '19/03/2021'
  },{
    name: 'Customer Support Wallboard',
    folder: 'UK Staff Data',
    by: 'Natterbox on UK',
    createdBy: 'James Radford',
    createdOn: '19/03/2021'
  },{
    name: 'Customer Support Wallboard',
    folder: 'UK Staff Data',
    by: 'Natterbox on UK',
    createdBy: 'James Radford',
    createdOn: '19/03/2021'
  },{
    name: 'Customer Support Wallboard',
    folder: 'UK Staff Data',
    by: 'Natterbox on UK',
    createdBy: 'James Radford',
    createdOn: '19/03/2021'
  },{
    name: 'Customer Support Wallboard',
    folder: 'UK Staff Data',
    by: 'Natterbox on UK',
    createdBy: 'James Radford',
    createdOn: '19/03/2021'
  },{
    name: 'Customer Support Wallboard',
    folder: 'UK Staff Data',
    by: 'Natterbox on UK',
    createdBy: 'James Radford',
    createdOn: '19/03/2021'
  },]


  return(
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
          {wbs.map((wb, index) => {
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
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LandingTable;