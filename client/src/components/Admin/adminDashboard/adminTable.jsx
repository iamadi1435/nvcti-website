import React, { useState } from 'react'
import { Card, Table } from 'react-bootstrap'
import Pagination from '../../common/pagination'
import { Fade } from 'react-reveal'
import Loader from '../../common/loader'

const TableItem = ({ item, title }) => {
  const manipulateDate = (date) => {
    let str = new Date(date).toDateString()
    return str.substr(4)
  }
  const handleClick = () => {
    const appId = item.id
    const id = item.iitismId || item.externalId
    const type = item.user
    const idea = item.titleOfProject
    localStorage.setItem('currentIdea', idea)
    window.location.pathname = `/idea_details/${title}/${id}/${type}/${appId}`
  }

  return (
    <>
      <tr>
        <td>{item.titleOfProject}</td>
        <td>{manipulateDate(item.created_at)}</td>
        <td>
          <button
            className="styleme"
            style={{ padding: '5px 9px', textTransform: 'capitalize' }}
            onClick={handleClick}>
            Details
          </button>
        </td>
      </tr>
    </>
  )
}

const AdminTable = ({
  title,
  ismApplications,
  externalApplications,
  loading,
  extraClassName
}) => {
  const applications = [...ismApplications, ...externalApplications]
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const indexofLastApplication = currentPage * itemsPerPage
  const indexOfFirstApplication = indexofLastApplication - itemsPerPage

  const currentApplications = applications.slice(
    indexOfFirstApplication,
    indexofLastApplication
  )

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <Card className="profile-table admin mb-3">
      <Fade>
        <Card.Header className={extraClassName}>
          <Card.Title className="align-center">{title}</Card.Title>
          <span style={{ color: 'white' }}>
            Total: {ismApplications.length + externalApplications.length}
          </span>
        </Card.Header>
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
          <p>No {title} yet</p>
        </div>
      ) : (
        <>
          <Fade>
            <Table borderless hover>
              <colgroup>
                <col span="1" style={{ width: '60%' }} />
                <col span="1" style={{ width: '20%' }} />
                <col span="1" style={{ width: '20%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Proposed Idea</th>
                  <th>Date</th>
                  <th>More</th>
                </tr>
              </thead>
              <tbody>
                {currentApplications.map((item, ind) => {
                  return (
                    <TableItem key={ind + item} item={item} title={title} />
                  )
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

export default AdminTable
