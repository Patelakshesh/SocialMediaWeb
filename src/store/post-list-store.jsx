import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});
const reducer = (currentPostList, action) => {
  let newPostList = currentPostList;
  if(action.type === "DELETE_POST"){
    newPostList = currentPostList.filter((post) => post.id !== action.payload.postId)
  }else if(action.type === "ADD_POST"){
    newPostList = [action.payload, ...currentPostList]
  }
  return newPostList;
};
const PostListProvider = ({ children }) => {
  
  const [postList, dispatchPostList] = useReducer(reducer, DEFAULT_POST_LIST);
  const addPost = (userId, postTitle,postBody,reactions,tags) => {
   dispatchPostList({
    type: 'ADD_POST',
    payload: {
       id: Date.now(),
    title: postTitle,
    body: postBody,
    reactions: reactions,
    userId: userId,
    tags:tags,
    }
   })
  };



  const deletePost = (postId) => {
  dispatchPostList({
    type: "DELETE_POST",
    payload: {postId},
  })
  };



  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};
const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going To mehsana",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    reactions: 2,
    userId: "user-9",
    tags: ["vaction", "mehsana"],
  },
  {
    id: "2",
    title: "Pass ho gaye bhai",
    body: "Lorem ipsum dolor sit amet,  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
    reactions: 15,
    userId: "user-8",
    tags: ["graduation", "unbelievable"],
  },
];
export default PostListProvider;
