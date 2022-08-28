import React from "react";

interface Props {
  title: string;
  description: string;
}

const Heading = (props: Props) => {
  return (
    <div className="text-center mb-4">
      <h4>{props.title}</h4>
      <p className="text-muted mb-4">{props.description}</p>
    </div>
  );
};

export default React.memo(Heading);
