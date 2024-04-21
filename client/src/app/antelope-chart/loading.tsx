import { BounceLoader } from "react-spinners";

export default function LoadingPage() {
return (
    <div className="flex justify-center items-center h-screen">
        <BounceLoader size={50} color={"#123abc"} loading={true} />
    </div>
);
}
