const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    var likes = blogs.reduce(function(sum, blog) {
        return sum + blog.likes
    }, 0)
    return likes
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return blogs[0]
    } else {
        var favorite = blogs.reduce(function(max, blog) {
            if (max.likes > blog.likes) {
                return max
            } else {
                return blog
            }
        }, blogs[0])
    }
    return favorite
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }

