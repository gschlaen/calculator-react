import "./screen.css";

const Screen = ({ calculation, result }) => {
  return (
    <div className="screen">
        <div className="calculation">
        {[...calculation].join("")}
        </div>

        <div className="result">
        {result}
        </div>
    </div>
  );
};

export default Screen;