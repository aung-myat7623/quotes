import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-2 bg-green-400">
      <div>
        <h1 className="font-bold">Quotes</h1>
      </div>
      <div>
        <ul className="center">
          <li className="p-2">
            <NavLink to="/quotes" activeclassname={"active"}>Quotes</NavLink>
          </li>
          <li className="p-2">
            <NavLink to="/new-quote" activeclassname={"active"}>New Quote</NavLink>
          </li>
        </ul>
      </div>
    </header>
    )
}