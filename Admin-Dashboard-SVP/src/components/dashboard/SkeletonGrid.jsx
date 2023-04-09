import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { users } from "../../../data/user";

const SkeleteonGrid = () => {
  return (
    <SkeletonTheme
      baseColor="#ebab34"
      highlightColor="#f2cb07"
      // borderRadius="0.5rem"
    >
      <div>
        {users.map((u) => (
          <ContainerRow key={u.id} user={u} loading={true} />
        ))}
      </div>
    </SkeletonTheme>
  );
};

export default SkeleteonGrid;

const ContainerRow = ({ loading, user }) => {
  const status = user.active ? "Active" : "Inactive";
  return (
    <div
      style={{
        display: "flex",
        flexDirectional: "column",
        marginBottom: "3rem",
      }}
    >
      <div>{loading ? <Skeleton width={300} height={300} /> : user.id}</div>
    </div>
  );
};
