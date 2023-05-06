const header = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};

header.defaultProps = {
  title: 'New List',
};

export default header;
