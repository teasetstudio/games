import React, { Suspense } from "react";

export default function withSuspence(Component) {
  return (props) => {
    return (
      <Suspense fallback={<div>Загрузка...</div>}>
        <Component {...props} />
      </Suspense>
    );
  };
}
