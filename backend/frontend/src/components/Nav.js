import React from "react";

//Nav bar component
const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          {/* homepage search link */}
          <a className="link" href="/">
            Home
          </a>
        </li>
        <li>
          {/* my favourites page link */}
          <a className="link" href="/favourites">
            My Favourites
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
