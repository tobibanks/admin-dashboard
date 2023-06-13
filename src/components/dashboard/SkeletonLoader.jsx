import React from "react";
import { users } from "../../../data/user";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PropTypes from "prop-types";

const SkeletonLoader = () => {
  return (
    <SkeletonTheme
      baseColor="#ebab34"
      highlightColor="#f2cb07"
      // borderRadius="0.5rem"
    >
      <table className="table">
        <tbody>
          {users.map((u) => (
            <TableRow key={u.id} user={u} loading={true} />
          ))}
        </tbody>
      </table>
    </SkeletonTheme>
  );
};

export default SkeletonLoader;

const TableRow = ({ loading, user }) => {
  const status = user.active ? "Active" : "Inactive";
  return (
    <tr>
      <td>{loading ? <Skeleton width={250} /> : user.id}</td>
      <td>{loading ? <Skeleton width={200} /> : user.name}</td>
      <td>{loading ? <Skeleton width={200} /> : user.role}</td>
      <td>{loading ? <Skeleton width={200} /> : status}</td>
    </tr>
  );
};

TableRow.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.string,
};
