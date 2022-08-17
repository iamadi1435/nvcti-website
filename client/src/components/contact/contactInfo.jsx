import React, { useState, useEffect } from "react";
import Loader from "../common/loader";
import Tabletop from "tabletop";
import { Tabs, Tab, Table } from "react-bootstrap";

const ContactInfo = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [labInchargeData, setLabInchargeData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let mounted = true;
    const url = "1uu6XO_vQOjLaXHKcSb9VQl73GjYrLjWktaUKcb4tCjA";
    Tabletop.init({
      key: url,
      simpleSheet: true,
    })
      .then((data) => {
        if (mounted) {
          const data1 = data.filter((o) => o.TEAM === "FIC");
          const data2 = data.filter((o) => o.TEAM === "Lab Incharges");
          const data3 = data.filter((o) => o.TEAM === "SIC");
          setFacultyData(data1);
          setLabInchargeData(data2);
          setStudentData(data3);
          setLoading(false);
        }
      })
      .catch((err) => console.warn(err));
    return () => {
      mounted = false;
      setLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTable = (data) => {
    return (
      <Table bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Email</th>
            <th>Contact Number</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, ind) => (
            <tr key={ind}>
              <td>{item.NAME}</td>
              <td>{item.DESIGNATION}</td>
              <td>{item.EMAIL === "" ? "-" : item.EMAIL}</td>
              <td>{item["CONTACT NUMBER"] === "" ? "-" : item["CONTACT NUMBER"]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <>
      {loading ? (
        <div style={{ margin: "100px 0" }} className="justify-align-center">
          <Loader variant="dark" message="Hold on a little 😃, we're getting the contact details!" extraStyle={{ fontSize: "20px" }} />
        </div>
      ) : (
        <div className="container mb-5 pb-4" id="contact-info" style={{ width: "75vw" }}>
          <h2 className="my-5 pl-3 pt-4 pb-0 row">SAY SOMETHING</h2>
          <Tabs defaultActiveKey="faculty" id="contact-tab">
            <Tab eventKey="faculty" title="Faculty" style={{ overflow: "auto" }}>
              {renderTable(facultyData)}
            </Tab>
            <Tab eventKey="lab-incharge" title="Lab Incharges" style={{ overflow: "auto" }}>
              {renderTable(labInchargeData)}
            </Tab>
            <Tab eventKey="student" title="Student" style={{ overflow: "auto" }}>
              {renderTable(studentData)}
            </Tab>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default ContactInfo;
