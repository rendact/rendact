import './Home.css';
import React from 'react'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import Header from '../includes/Header'
import Footer from '../includes/Footer'

// This is for example. Later separate data hooks from theme..
const postQuery = gql `
  query GetPosts{
    viewer {
      allPosts {
        edges {
          node {
            title,
            content
          }
        }
      }
    }
  }
`;

class Posts extends React.Component {

	render() {
		if (this.props.data.viewer) {
			return (
				<div>
					<ul>
						{this.props.data.viewer.allPosts.edges.map(function(item) {
							return <li key={item.node.title}>
								<h2>{item.node.title}</h2>
								<p>{item.node.content}</p>
							</li>
						})}
					</ul>
				</div>
			)
		} else
			return <div></div>
	}

}

const PostsWithData = graphql(postQuery)(Posts);

const Home = () => {
	return (
		<div className="layout-home">
			<Header/>
			<div className="container">
				<div className="mt-1">
					<h1>Default theme. Home Layout.</h1>
				</div>
				<PostsWithData/>
			</div>
			<Footer/>
		</div>
	)
}

export default Home
