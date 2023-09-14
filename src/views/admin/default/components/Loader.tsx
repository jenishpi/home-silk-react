import './../../../../index.css'; // Import the CSS file

const Loader = (props:{loading:boolean}) => {
  return (
    <div className={`loader-container ${props.loading ? 'active' : ''}`}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;