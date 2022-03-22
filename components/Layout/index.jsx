import Header from './Header';
import Navigation from './Navigation';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container">
        <Navigation />
        <main className="main">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
