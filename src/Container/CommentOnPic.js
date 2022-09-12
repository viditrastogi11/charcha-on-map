import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import { useEffect, useState } from "react";
import Backdrop from "../Components/BackDrop";
import { Button } from "../Components/Button";
import "./CommentOnPic.css";
import { ListOfAllComments } from "../Components/ListOfAllComments";
import SlideDrawer from "../Components/SlideDrawer";
const CommentOnPic = (props) => {
  const { image } = props;
  const { editor, onReady } = useFabricJSEditor();
  const [comment, setComment] = useState(false);
  const [commentBoxData, setCommentBoxData] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [showAllcommentList, setShowAllCommentList] = useState(false);

  const showCommentModal = ({
    comment = "",
    date = "",
    top = 0,
    left = 0,
    index = null,
  }) => {
    const value = {
      comment: comment,
      date: date,
      top: top,
      left: left,
      index: index,
    };

    setCommentBoxData(value);
  };

  const _onReady = (canvas) => {
    fabric.Image.fromURL(
      image,
      (img) => {
        img.scale(0.4);
        canvas.add(img);
        img.cornerColor = "red";
        img.transparentCorners = false;
        canvas.hoverCursor = "default";
        canvas.setActiveObject(img);
        canvas.renderAll();
        onReady(canvas);
      },
      { left: 200, top: 100 }
    );
  };

  const rotate90Deg = () => {
    const angle = editor.canvas.item(0).angle;
    if (angle < 90) {
      editor.canvas.item(0).angle = 90;
      editor.canvas.item(0).left = 600;
      editor.canvas.item(0).top = 10;
    } else if (angle < 180) {
      editor.canvas.item(0).angle = 180;
      editor.canvas.item(0).left = 800;
      editor.canvas.item(0).top = 500;
    } else if (angle < 270) {
      editor.canvas.item(0).angle = 270;
      editor.canvas.item(0).left = 200;
      editor.canvas.item(0).top = 600;
    } else {
      editor.canvas.item(0).angle = 0;
      editor.canvas.item(0).left = 200;
      editor.canvas.item(0).top = 100;
    }
    setComment(false);
    editor.canvas.renderAll();
  };

  const saveCommentOnLocal = () => {
    if (commentBoxData.comment.trim().length > 0) {
      const data = {
        ...commentBoxData,
        date: new Date().toLocaleString("en-IN", {
          day: "numeric", // numeric, 2-digit
          year: "numeric", // numeric, 2-digit
          month: "short", // numeric, 2-digit, long, short, narrow
          hour: "numeric", // numeric, 2-digit
          minute: "numeric", // numeric, 2-digit
        }),
      };
      if (commentBoxData.index === null) {
        commentList.push([data]);
      } else {
        commentList[commentBoxData.index].push(data);
      }
      setCommentList([...commentList]);
      setCommentBoxData({
        ...commentBoxData,
        comment: "",
        index: commentBoxData.index ?? commentList.length - 1,
      });
    }
  };

  useEffect(() => {
    if (editor) {
      editor.canvas.hoverCursor = comment ? "pointer" : "move";
      editor.canvas.item(0).selectable = !comment;
      editor.canvas.discardActiveObject();
      if (comment) {
        editor.canvas.on("mouse:down", (option) => {
          showCommentModal({ top: option.pointer.y, left: option.pointer.x });
        });
      } else {
        editor.canvas.off("mouse:down");
      }
      editor.canvas.renderAll();
    }
  }, [comment]);

  return (
    <div>
      <div className="fabric-container">
        <FabricJSCanvas className="fabric-canvas" onReady={_onReady} />
        {comment && commentBoxData && (
          <>
            <div
              className="comment-value"
              style={{
                top: commentBoxData.top - 40,
                left: commentBoxData.left - 30,
              }}
            >
              <span>{commentList.length + 1}</span>
            </div>

            <div
              className="comment-box"
              style={{
                top: commentBoxData.top,
                left: commentBoxData.left,
              }}
            >
              {commentBoxData.index !== null && (
                <div>
                  {commentList[commentBoxData.index].map((e, i) => {
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
              )}

              <textarea
                spellCheck="false"
                placeholder="Add a comment"
                className="comment-box-input"
                type={"text"}
                onChange={(e) => {
                  showCommentModal({
                    ...commentBoxData,
                    comment: e.target.value,
                  });
                }}
                value={commentBoxData.comment}
              ></textarea>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                }}
              >
                <Button onClick={saveCommentOnLocal}>Add Comment</Button>
                <Button
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.84)",
                    color: "#FF4742",
                    marginLeft: "20px",
                  }}
                  onClick={() => {
                    setCommentBoxData(null);
                  }}
                >
                  Close
                </Button>
              </div>
            </div>
          </>
        )}
        {comment &&
          commentList.map((e, i) => {
            return (
              <div
                className="comment-value"
                style={{
                  top: e[0].top - 40,
                  left: e[0].left - 30,
                }}
                onClick={() =>
                  showCommentModal({
                    top: e[0].top,
                    left: e[0].left,
                    index: i,
                  })
                }
              >
                <span>{i + 1}</span>
              </div>
            );
          })}
      </div>

      <div className="action-button-row">
        <Button onClick={rotate90Deg}>Rotate</Button>
        <div style={{ width: "50px" }}> </div>
        <Button
          style={
            comment
              ? {
                  backgroundColor: "rgba(255, 255, 255, 0.84)",
                  color: "#FF4742",
                }
              : {}
          }
          onClick={() => {
            setComment(!comment);
          }}
        >
          Comment
        </Button>
        <div style={{ width: "50px" }}> </div>
        <Button
          onClick={() => {
            setShowAllCommentList(!showAllcommentList);
          }}
        >
          Show All Comments
        </Button>
        <div style={{ width: "50px" }}> </div>
        <Button
          onClick={() => {
            setCommentList([]);
          }}
        >
          Clear All Comments
        </Button>
      </div>

      <div>
        <SlideDrawer show={showAllcommentList}>
          <ListOfAllComments
            listOfAllComments={commentList}
          ></ListOfAllComments>
        </SlideDrawer>
        {showAllcommentList && (
          <Backdrop close={() => setShowAllCommentList(false)}></Backdrop>
        )}
      </div>
    </div>
  );
};
export default CommentOnPic;
