import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { users } from "../../../data/user";

const SkeleteonBoard = () => {
  return (
    <SkeletonTheme
      baseColor="#ebab34"
      highlightColor="#f2cb07"
      borderRadius="0.8rem"
    >
      <div style={{ marginTop: "30px" }}>
        {users.map((u) => (
          <ContainerRow key={u.id} user={u} loading={true} />
        ))}
      </div>
    </SkeletonTheme>
  );
};

export default SkeleteonBoard;

const ContainerRow = ({ loading, user }) => {
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "3rem",
        justifyContent: "space-between",
      }}
    >
      <div>{loading ? <Skeleton width={300} height={200} /> : user.id}</div>
      <div>{loading ? <Skeleton width={300} height={200} /> : user.name}</div>
      <td>{loading ? <Skeleton width={300} height={200} /> : user.role}</td>
    </div>
  );
};
