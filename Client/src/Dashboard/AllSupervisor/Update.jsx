import { useLoaderData } from "react-router-dom";

const Update = () => {
  const chocolate = useLoaderData();

  const { name, phone, nid, presentAddress, permanentAddress, _id } = chocolate;

  return (
    <div>
      <p>{name}</p>
    </div>
  );
};

export default Update;
