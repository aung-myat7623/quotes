import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="center flex-col my-10">
      <p className="text-2xl my-5 font-bold">Not Found page</p>
      <Link to="/quotes" className="btn bg-green-500">Home page</Link>
    </section>
    )
}