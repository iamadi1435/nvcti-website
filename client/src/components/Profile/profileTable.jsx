import React, { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import Pagination from "../common/pagination";
import { Fade } from "react-reveal";
import Loader from "../common/loader";

const ProfileItem = ({ item }) => {
  const manipulateDate = (date) => {
    let str = new Date(date).toDateString();
    return str.substr(4);
  };
  return (
    <tr>
      <td>{item.titleOfProject}</td>
      <td>{manipulateDate(item.created_at)}</td>
      <td>{item.remarks !== null ? item.remarks : 'None'}</td>
    </tr>
  )
};

const ProfileTable = ({ title, allApplications, loading, extraClassName }) => {
  const [applications, setApplications] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [currentApplications, setCurrentApplications] = useState([])
  const [itemsPerPage] = useState(5)

  const indexofLastApplication = currentPage * itemsPerPage
  const indexOfFirstApplication = indexofLastApplication - itemsPerPage

  useEffect(() => {
    getData(function () {
      if (typeof applications !== 'undefined') {
        setCurrentApplications(
          applications.slice(indexOfFirstApplication, indexofLastApplication)
        )
      }
    })
    // eslint-disable-next-line
  }, [
    currentPage,
    applications,
    allApplications,
    indexOfFirstApplication,
    indexofLastApplication
  ])

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const getData = (callback) => {
    setApplications(allApplications)
    callback()
  }

  return (
    <Card className="profile-table mb-3">
      <Fade>
        <Card.Title className={'align-center ' + extraClassName}>
          {title}
        </Card.Title>
      </Fade>
      {loading ? (
        <div
          style={{ marginTop: '40px', marginBottom: '20px' }}
          className="justify-align-center">
          <Loader
            variant="dark"
            message="Hold on a little 😃, we're getting the information!"
            extraStyle={{ fontSize: '20px' }}
          />
        </div>
      ) : currentApplications.length === 0 ? (
        <div
          style={{ marginTop: '40px', marginBottom: '20px' }}
          className="justify-align-center">
          <p>0 {title}</p>
        </div>
      ) : (
        <>
          <Fade>
            <Table borderless hover>
              <colgroup>
                <col span="1" style={{ width: '48%' }} />
                <col span="1" style={{ width: '30%' }} />
                <col span="1" style={{ width: '32%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Proposed Idea</th>
                  <th>Date</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {currentApplications.map((item, ind) => {
                  return <ProfileItem key={ind + item} item={item} />
                })}
              </tbody>
            </Table>
          </Fade>
          <Fade>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={applications.length}
              paginate={paginate}
            />
          </Fade>
        </>
      )}
    </Card>
  )
}

export default ProfileTable;
