import React from "react";
import { usersTable } from "../../../data/user";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PropTypes from "prop-types";

const SkeleteonLoaderTable = () => {
  return (
    <SkeletonTheme
      baseColor="#ebab34"
      highlightColor="#f2cb07"
      // borderRadius="0.5rem"
    >
      <table
        className="table"
        style={{ borderSpacing: "0px 20px", borderCollapse: "separate" }}
      >
        <tbody>
          {usersTable.map((u) => (
            <TableRow key={u.id} user={u} loading={true} />
          ))}
        </tbody>
      </table>
    </SkeletonTheme>
  );
};

export default SkeleteonLoaderTable;

const TableRow = ({ loading, user }) => {
  const status = user.active ? "Active" : "Inactive";
  return (
    <tr>
      <td>{loading ? <Skeleton width={250} height={20} /> : user.id}</td>
      <td>{loading ? <Skeleton width={200} height={20} /> : user.name}</td>
      <td>{loading ? <Skeleton width={200} height={20} /> : user.role}</td>
      <td>{loading ? <Skeleton width={200} height={20} /> : status}</td>
    </tr>
  );
};

TableRow.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.string,
};
