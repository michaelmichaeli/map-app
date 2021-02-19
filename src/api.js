import data from './db.json'
const randomColor = require('randomcolor')
const cityseeker = require('city-seeker')

export const getData = () => {
    const spatials = data.features.map(item => {
        const spatial = {}

        spatial.id = item.id
        spatial.name = cityseeker.any().city.name
        spatial.color = randomColor({luminosity: 'light'})
        spatial.coordinates = item.geometry.coordinates
        spatial.creationDate = Date.now()
        spatial.comment = ''
        return spatial
    })
    return spatials
}