import App from './containers/App'

import Login from './components/Login'
import UserById from './containers/UserById'

import NewestByPage from './containers/NewestByPage'
import ShowByPage from './containers/ShowByPage'
import AskByPage from './containers/AskByPage'
import Submit from './containers/Submit'
import StoryDetails from './containers/StoryDetails'

import CommentsByPage from './containers/CommentsByPage'
import CommentById from './containers/CommentById'

import Error from './components/Error'
import PageNotFound from './components/PageNotFound'

const routes = [
  {
    path: '/',
    component: App,
    routes: [
      {
        path: '/login',
        component: Login
      },
      {
        path: '/user/:userId',
        component: UserById
      },
      {
        path: '/newest/:page?',
        component: NewestByPage
      },
      {
        path: '/show/:page?',
        component: ShowByPage
      },
      {
        path: '/ask/:page?',
        component: AskByPage
      },
      {
        path: '/submit',
        component: Submit
      },
      {
        path: '/storyDetails/:storyId/comments/:commentId',
        component: CommentById
      },
      {
        path: '/storyDetails/:storyId',
        component: StoryDetails
      },
      {
        path: '/comments/:page?',
        component: CommentsByPage
      },
      {
        path: '/',
        redirectTo: '/newest',
        exact: true
      },
      {
        path: '/error',
        component: Error
      },
      {
        component: PageNotFound
      }
    ]
  }
]

export default routes
