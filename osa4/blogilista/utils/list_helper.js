const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    var likes = blogs.reduce(function(sum, blog) {
        return sum + blog.likes
    }, 0)
    return likes
}
  
  module.exports = {
    dummy,
    totalLikes
  }

