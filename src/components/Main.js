export { Main, Box };
function Main({ children }) {
  return <div className="main">{children}</div>;
}
function Box({ children }) {
  return <div className="box">{children}</div>;
}
