export const ListOfAllComments = (props) => {
  console.log(props.listOfAllComments);
  return (
    <>
      {props.listOfAllComments?.length > 0 ? (
        props.listOfAllComments.map((comment, index) => {
          return (
            <div
              key={index}
              style={{ display: "flex", margin: "16px 0px", width: "100%" }}
            >
              <div
                className="comment-value"
                style={{ position: "relative", boxShadow: "0px 0px 4px gray" }}
              >
                <span>{index + 1}</span>
              </div>
              <div
                className="comment-box"
                style={{
                  position: "relative",
                  margin: "16px 0px 16px 0px",
                  borderTopLeftRadius: "0px",
                  top: 10,
                }}
              >
                {comment.map((e, i) => {
                  return (
                    <div key={i} className="list-of-comments">
                      <div style={{ width: "70%" }}>
                        {i + 1 + ". "}
                        {e.comment}
                      </div>
                      <div style={{ fontSize: "10px", color: "GrayText" }}>
                        <div>{e.date.split(",")[1]}</div>
                        <div>{e.date.split(",")[0]}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ color: "gray" }}>No Comments Available</div>
        </div>
      )}
    </>
  );
};
