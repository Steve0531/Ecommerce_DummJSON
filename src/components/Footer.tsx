const Footer = () => {
    return (
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "#222",
          color: "#fff",
          padding: "10px",
          textAlign: "center",
        }}
      >
        <p>© {new Date().getFullYear()} Ecommerce Dashboard Developed by Stephen Miranda. All Rights Reserved.</p>
      </footer>
    );
  };
  
  export default Footer;
  