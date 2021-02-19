import data from './db.json'
const randomColor = require('randomcolor')
const cityseeker = require('city-seeker')

export const getData = () => {
    const spatials = data.features.slice(0,100).map(item => {
        const spatial = {}

        spatial.id = item.id
        spatial.name = cityseeker.any().city.name
        spatial.color = randomColor({ luminosity: 'light' })
        spatial.coordinates = item.geometry.coordinates[0].map(item=>[item[1], item[0]])
        spatial.creationDate = Date.now()
        spatial.comment = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, animi?'
        spatial.isHovered = false
        return spatial
    })
        return spatials
}