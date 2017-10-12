import withUserNames from '../helpers/withUserNames'
import { NUMBER_OF_ITEMS_PER_PAGE } from '../constants'

function getReplies(comments, commentIndex) {
  const result = []
  const commentsCount = comments.length
  const comment = comments[commentIndex]
  let replyIndex = commentIndex + 1

  while (
    replyIndex < commentsCount &&
    comments[replyIndex].level !== comment.level
  ) {
    result.push(comments[replyIndex])
    replyIndex++
  }

  return result
}

export default {
  stories: async (read, { page, type }) => {
    const root = await read('stories')

    const filteredStories = type
      ? root.filter(story => story.type === type)
      : root

    const stories = filteredStories
      .slice(
        filteredStories.length - (+page * NUMBER_OF_ITEMS_PER_PAGE + 1),
        filteredStories.length - (+page - 1) * NUMBER_OF_ITEMS_PER_PAGE
      )
      .reverse()

    return withUserNames(stories, read)
  },
  story: async (read, { id }) => {
    const stories = await read('stories')
    const story = stories.find(s => s.id === id)

    if (!story) {
      return null
    }

    return (await withUserNames([story], read))[0]
  },
  comment: async (read, { id }) => {
    const root = await read('comments')
    const commentIndex = root.findIndex(c => c.id === id)

    if (commentIndex === -1) {
      return null
    }

    const comment = root[commentIndex]
    const [resultComment] = await withUserNames([comment], read)
    const replies = getReplies(root, commentIndex)

    return {
      ...resultComment,
      replies: await withUserNames(replies, read)
    }
  },
  comments: async (read, { page }) => {
    const root = await read('comments')
    const comments = root.slice(
      +page * NUMBER_OF_ITEMS_PER_PAGE - NUMBER_OF_ITEMS_PER_PAGE,
      +page * NUMBER_OF_ITEMS_PER_PAGE + 1
    )
    return withUserNames(comments, read)
  },
  user: async (read, { id, name }) => {
    const root = await read('users')

    return id
      ? root.find(user => user.id === id)
      : root.find(user => user.name === name)
  }
}