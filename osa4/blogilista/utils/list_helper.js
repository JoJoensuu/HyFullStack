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

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return {
            author: blogs[0].author,
            blogs: 1
        }
    } else {
        const most = []

        blogs.forEach((blogger)=> {
            if (most.some((val) => {
                return val["author"] === blogger["author"]
            })) {
                most.forEach((x) => {
                    if (x["author"] === blogger["author"]) {
                        x["blogs"] ++
                    }
                })
            } else {
                const a = {}
                a["author"] = blogger["author"]
                a["blogs"] = 1
                most.push(a)
            }
        })
        top = most[0]
        most.forEach((blogger) => {
            if (blogger["blogs"] > top["blogs"]) {
                top = blogger
            }
        })
        return top
    }
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }

