module.exports = function (eleventyConfig) {
  const Image = require('@11ty/eleventy-img')
  const { DateTime } = require('luxon')
  eleventyConfig.addPassthroughCopy('src/assets/css/style.css')
  eleventyConfig.addPassthroughCopy({ 'src/robot.txt': 'robots.txt' })
  eleventyConfig.addPassthroughCopy('src/assets/images')
  eleventyConfig.addFilter('postDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
  })
  eleventyConfig.addCollection('page', function (collections) {
    return collections.getFilteredByTag('page').sort(function (a, b) {
      return a.data.order - b.data.order
    })
  })

  // ADD THIS
  eleventyConfig.addShortcode(
    'headers',
    (title, subtitle) =>
      `<h1>${title}</h1>
        <p>${subtitle}</p>`
  )

  return {
    dir: {
      input: 'src',
      data: '_data',
      includes: '_includes',
      layouts: '_layouts'
    }
  }
}
