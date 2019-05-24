let imageId = 2711
const imageURL = `https://randopic.herokuapp.com/images/2711`
const likeURL = `https://randopic.herokuapp.com/likes`
const commentsURL = `https://randopic.herokuapp.com/comments/`

const imageEl = document.querySelector('#image')
const likesEl = document.querySelector('#likes')
const likeBtn = document.querySelector('#like_button')
const commentForm = document.querySelector('#comment_form')
const commentsEl = document.querySelector('#comments')

// Get image from API
function getImage() {
  return fetch(imageURL)
  .then(resp => resp.json())
  // .then(console.log)
}

// Render image
function renderImage(image) {
  imageEl.src = image.url
  likesEl.innerText = image.like_count
  renderComments(image)

// Listen to click and increment likes on frontend
  likeBtn.addEventListener('click', () => {
    likeCount = Number(likesEl.innerText)
    likeCount++
    likesEl.innerText = likeCount

    incrementLikesOnBackend(image)
  })

// Listen to comment submit and add comment to frontend
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    newComment = commentForm.comment.value

    commentEl = document.createElement('li')
    commentEl.innerText = `${newComment}`
    commentsEl.append(commentEl)
    commentForm.comment.value = ''

    addCommentOnBackend(image, newComment)
  })
}

// Render one comment
function renderOneComment(comment) {
  commentEl = document.createElement('li')
  commentEl.innerText = `${comment.content}`
  commentsEl.append(commentEl)
}

// Render multiple comments
function renderComments(image) {
  image.comments.forEach(comment => renderOneComment(comment))
}

// Persist new like to backend
function incrementLikesOnBackend(image) {
    return fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: (image.id)
      })
    })
    .then(resp => resp.json())
}

// Persist new comment backened
function addCommentOnBackend(image, content) {
  return fetch(commentsURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: image.id,
      content: content
    })
  })
  .then(resp => resp.json())
}

// On page load, get image and render
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  getImage()
  .then(image => renderImage(image))
})