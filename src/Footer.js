const Footer = ({ length }) => {
  let date = new Date();
  return (
    <footer>
      {length === 1 ? (
        <p>{length} item </p>
      ) : length === 0 ? (
        <p>Any item</p>
      ) : (
        <p>{length} items</p>
      )}
    </footer>
  );
};

export default Footer;
