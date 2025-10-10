import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { Spinner, Table } from "react-bootstrap";
import { getAllReportsAPI } from "../server/allAPI";
import ReportActionModal from "../components/ReportActionModal";
const AllReports = () => {
  const [allReports, setAllReports] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(allReports);

  useEffect(() => {
    getAllReports();
  }, []);
  const getAllReports = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    let reqHeader = {};
    if (token) {
      reqHeader = {
        authorization: `Bearer ${token}`,
      };
      try {
        const res = await getAllReportsAPI(reqHeader);
        // console.log(res)
        setAllReports(res.data.reports);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error to get all reports : ", error);
      }
    }
  };
  return (
    <div>
      <AdminHeader />
      <div className="container">
        <h1 className="fw-bold my-4">All Reports</h1>
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : allReports.length > 0 ? (
          <Table
            className="container"
            style={{ overflow: "hidden" }}
            striped
            bordered
            hover
            size="sm"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>type</th>
                <th>postedBy</th>
                <th>Target</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allReports.map((report, ind) => (
                <tr key={ind}>
                  {/* <td>{report.type=="post" && report.reportedPost.status=="removed"?"---":ind + 1}</td> */}
                  <td>
                    {report.status !== "pending" ||
                    report.type == "user" ||
                    (report.type == "post" &&
                      report.reportedPost.status !== "removed")
                      ? ind + 1
                      : "---"}
                  </td>
                  <td>
                    {report.status !== "pending" ||
                    report.type == "user" ||
                    (report.type == "post" &&
                      report.reportedPost.status !== "removed")
                      ? report.type
                      : "---"}
                  </td>
                  <td>
                    {report.status !== "pending" ||
                    report.type == "user" ||
                    (report.type == "post" &&
                      report.reportedPost.status !== "removed")
                      ? report?.reportedBy?.username
                      : "---"}
                  </td>
                  <td>

                    {report.status !== "pending" ||
                    report.type == "user" ||
                    (report.type == "post" &&
                      report.reportedPost.status !== "removed") ||
                    report.reportedPost === null ? (
                      report.type == "post" ? (
                        report?.reportedPost?.description
                      ) : (
                        report?.reportedUser?.email
                      )
                    ) : (
                      <span className="fw-bold">Already removed</span>
                    )}

                    
                  </td>
                  <td>
                    {report.status !== "pending" ||
                    report.type == "user" ||
                    (report.type == "post" &&
                      report.reportedPost.status !== "removed")
                      ? report.reason
                      : "---"}
                  </td>
                  <td>
                    {report.status !== "pending" ||
                    report.type == "user" ||
                    (report.type == "post" &&
                      report.reportedPost.status !== "removed") ? (
                      <span className="fw-bold">{report.status}</span>
                    ) : (
                      "---"
                    )}
                  </td>
                  <td>
                    {report.status !== "pending" ||
                    report.type == "user" ||
                    (report.type == "post" &&
                      report.reportedPost.status !== "removed") ? (
                      report.status == "pending" ? (
                        <ReportActionModal
                          getAllReports={getAllReports}
                          report={report}
                        />
                      ) : (
                        "Action Taken"
                      )
                    ) : (
                      "Action Taken"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <div>
            <p>no reports available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReports;
