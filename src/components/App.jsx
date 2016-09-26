import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import normalize from 'normalize.css/normalize.css';
import { fetchPostsIfNeeded } from '../actions/posts';
import Posts from './Posts';
import styles from './app.css';

class App extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    isFetching: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPostsIfNeeded());
  }

  render() {
    const { items, isFetching } = this.props;
    return (
      <div className={classnames({ [styles.app]: true, [styles.loading]: isFetching })}>
        <h1>My Awesome Blog</h1>
        <Posts posts={items} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    isFetching,
    items
  } = (state.posts || {
    isFetching: true,
    items: []
  });

  return {
    items,
    isFetching
  };
};

export default connect(mapStateToProps)(App);
