export default function EventLoader() {
  return (
    <>
      <div className="eventcard">
        <div className="eventTimer">
          <span className="eventTimer_title"></span>
          <div className="eventTimeContainer">
            <div className="eventTime">
              <span className="eventTime__subtitle"></span>
            </div>
            <div className="eventTime">
              <span className="eventTime__subtitle"></span>
            </div>
            <div className="eventTime">
              <span className="eventTime__subtitle"></span>
            </div>
            <div className="eventTime">
              <span className="eventTime__subtitle"></span>
            </div>
          </div>
        </div>
        <div className="eventContent">
          <div className="eventContent__duration">
            <span></span>
          </div>
          <div className="eventDescription">
            <div className="eventDescription__title"></div>
            <div className="eventDescription__subtitle">
              <span></span>
            </div>
          </div>
          <div className="eventDescription__footer">
            <button className="eventDescription__footer-btn">
              <div className="eventDescription__footer-count"></div>
            </button>

            <button className="eventDescription__link">
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
