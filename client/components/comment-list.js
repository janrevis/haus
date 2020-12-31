import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { positionElement, formatComment } from '../helpers';

class CommentList extends React.Component {

  constructor(props) {
    super(props);
    this.commentBox = React.createRef();
    this.state = {
      comments: [],
      message: '',
      showCommentBox: false,
      comment: ''
    }
  }

  async componentDidMount() {
      try {
        const resp = await axios.get("/api/comment");
        this.setState({ comments: resp.data });
      } catch (err) {
        if (err.response && err.response.status === 403) {
          this.props.history.push('/signin.html');
        } else {
          this.setState( { message: 'An unexpected error has occurred' });
        }
      }
  }

  componentDidUpdate() {
    positionElement(this.commentBox.current)
  }

  handleAddComment() {
    this.setState({ showCommentBox: true })
  }

  handleCancelComment() {
    this.setState({ showCommentBox: false })
  }

  async handleSubmitComment() {
    const resp = await axios.post('/api/comment', {
      comment: this.state.comment
    })
    this.setState({
      comments: [ resp.data ].concat(this.state.comments),
      comment: '',
      showCommentBox: false
    })
  }

  updateComment(event) {
    this.setState({ comment: event.target.value });
  }

  render() {
    const comments = this.state.comments.map(c => {
      let lines = c.comment.split('\n');
      lines = lines.map((l, idx) => {
        return <span key={idx}>{l}<br /></span>;
      });
      const submitted = new Date(c.createdAt);
      const hours = submitted.getHours().toString().padStart(2, "0");
      const minutes = submitted.getMinutes().toString().padStart(2, "0")
      return (
        <li key={c.id}>
          <div className="submission-date">
            Submitted {`${submitted.toDateString()} ${hours}:${minutes}`}
          </div>
          <div className="comment">
            {lines}
          </div>
        </li>
      )
    })
    const display = this.state.showCommentBox ? '' : 'none';
    return (
      <div className="comment-container">
        <div><button className="submit-button" onClick={() => this.handleAddComment()}>Comment</button></div>
        <ul>{comments}</ul>
        <div ref={this.commentBox} className="modal" style={{ display }}>
          <h1>Submit a comment</h1>
          <textarea
            value={this.state.comment}
            onChange={(event) => this.updateComment(event)}
          />
          <div>
            <button className="submit-button" onClick={() => this.handleSubmitComment()}>Submit</button>
            <button className="submit-button" onClick={() => this.handleCancelComment()}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(CommentList);
